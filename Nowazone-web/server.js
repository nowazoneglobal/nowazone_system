import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const assetsPath = path.join(__dirname, 'assets');

// Serve static assets from dist/assets and fallback to assets/
app.use('/assets', express.static(path.join(distPath, 'assets'), { maxAge: '1d' }));
app.use('/assets', express.static(assetsPath, { maxAge: '1d' }));

// Serve all other compiled static assets from dist
app.use(express.static(distPath, { maxAge: '1d' }));

// Prevent asset 404s from returning index.html
app.all('/assets/*', (req, res) => {
  res.status(404).send('Asset not found');
});

// Handle SPA routing: return index.html for all navigation requests
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Nowazone-web server running on port ${PORT}`);
});
