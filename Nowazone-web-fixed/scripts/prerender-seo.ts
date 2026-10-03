import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { metaByPath } from '../src/seo/metaByPath.ts';
import { jsonLdByPath } from '../src/seo/jsonLd.ts';

const SITE = 'https://www.nowazone.com';
const OG_IMAGE = `${SITE}/assets/favicon.png`;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

function escAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function injectHead(
  template: string,
  route: string,
  meta: { title: string; description: string; robots?: string },
  jsonLd?: Record<string, unknown>
): string {
  const canonical = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const robots = meta.robots || 'index, follow';
  const title = escAttr(meta.title);
  const description = escAttr(meta.description);

  let html = template
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="robots" content="${robots}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta property="og:image" content="${OG_IMAGE}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`
    )
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');

  // Ensure robots / twitter:title exist if template was missing them
  if (!/name="robots"/i.test(html)) {
    html = html.replace(
      '</title>',
      `</title>\n    <meta name="robots" content="${robots}" />`
    );
  }
  if (!/name="twitter:title"/i.test(html)) {
    html = html.replace(
      '</head>',
      `    <meta name="twitter:title" content="${title}" />\n    <meta name="twitter:description" content="${description}" />\n    <meta name="twitter:image" content="${OG_IMAGE}" />\n  </head>`
    );
  }

  if (jsonLd) {
    const payload = JSON.stringify(jsonLd).replace(/</g, '\\u003c');
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${payload}</script>\n  </head>`
    );
  }

  return html;
}

function main() {
  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('prerender-seo: dist/index.html missing — run vite build first');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf8');
  let count = 0;

  for (const [route, meta] of Object.entries(metaByPath)) {
    const html = injectHead(template, route, meta, jsonLdByPath[route]);
    if (route === '/') {
      fs.writeFileSync(templatePath, html);
    } else {
      const dir = path.join(distDir, ...route.slice(1).split('/'));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), html);
    }
    count += 1;
  }

  console.log(`prerender-seo: wrote ${count} HTML shells`);
}

main();
