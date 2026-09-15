import express from 'express';
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

function proxyToApi(req, res) {
  const target = new URL(API_PROXY_TARGET);
  const transport = target.protocol === 'https:' ? https : http;
  const headers = { ...req.headers, host: target.host };
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
