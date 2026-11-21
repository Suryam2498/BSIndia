// Static site generator for BSIndia Bank. Usage: node build.js  → writes ./dist
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page, buildNav, SITE } from './src/layout.js';
import { PRODUCTS } from './src/products.js';
import { allPages } from './src/pages.js';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });

const nav = buildNav(PRODUCTS);
const pages = allPages();
for (const p of pages) {
  const html = page({ ...p, products: PRODUCTS, nav });
  const file = p.file ? join(dist, p.file) : join(dist, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const urls = pages.filter((p) => !p.noindex && !p.file).map((p) => p.path);
const today = new Date().toISOString().slice(0, 10);
await writeFile(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.url}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /thank-you/\nDisallow: /login/\nDisallow: /dashboard/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log(`Built ${pages.length} pages → dist/`);
