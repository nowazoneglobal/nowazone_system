import express from 'express';
import compression from 'compression';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const assetsPath = path.join(__dirname, 'assets');
const API_PROXY_TARGET = (process.env.API_PROXY_TARGET || 'http://127.0.0.1:5000').replace(
  /\/$/,
  ''
);

// Enable gzip/deflate text compression for improved performance and SEO audit scores
app.use(compression());

// Security Headers Middleware to satisfy all TLS and HTTP security checks
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

function proxyToApi(req, res) {
  const target = new URL(API_PROXY_TARGET);
  const transport = target.protocol === 'https:' ? https : http;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const headers = {
    ...req.headers,
    host: target.host,
    'x-forwarded-host': req.headers.host || '',
    'x-forwarded-proto': req.protocol || (req.secure ? 'https' : 'http'),
    'x-forwarded-for': clientIp,
  };
  delete headers['content-length'];

  const proxyReq = transport.request(
    {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port || (target.protocol === 'https:' ? 443 : 80),
      path: req.originalUrl,
      method: req.method,
      headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on('error', (err) => {
    console.error('API proxy error:', err.message);
    if (!res.headersSent) {
      res.status(502).json({
        status: 'error',
        message: 'API unavailable. Is the backend running?',
      });
    }
  });

  req.pipe(proxyReq);
}

app.use('/assets', express.static(path.join(distPath, 'assets'), { maxAge: '1d' }));
app.use('/assets', express.static(assetsPath, { maxAge: '1d' }));

// Forward /api to the Nowazone API (needed when this process serves the SPA alone)
app.use('/api', proxyToApi);

app.use(express.static(distPath, { maxAge: '1d' }));

app.all('/assets/*', (req, res) => {
  res.status(404).send('Asset not found');
});

/** Prefer prerendered dist/<route>/index.html so crawlers see route-specific SEO without JS. */
app.get('*', (req, res) => {
  const pathname = (req.path || '/').replace(/\/+$/, '') || '/';

  if (pathname !== '/') {
    const prerendered = path.join(distPath, ...pathname.slice(1).split('/'), 'index.html');
    if (fs.existsSync(prerendered)) {
      return res.sendFile(prerendered);
    }
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Nowazone-web server running on port ${PORT}`);
  console.log(`API proxy → ${API_PROXY_TARGET}`);
});
