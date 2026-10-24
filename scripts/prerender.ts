/**
 * Post-build step: writes a static HTML file per route with the right title, description, canonical,
 * robots, JSON-LD and a small content snapshot (h1, intro text, internal links), plus sitemap.xml.
 * The React app still mounts over it. Run after `vite build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { allIndexableRoutes, getRouteMeta, SITE_URL } from '../src/data/seo';

const DIST = path.resolve('dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function render(route: string) {
  const m = getRouteMeta(route);
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
  if (m.description) {
    html = setMeta(html, 'name', 'description', m.description);
    html = setMeta(html, 'property', 'og:description', m.description);
    html = setMeta(html, 'name', 'twitter:description', m.description);
  }
  html = setMeta(html, 'property', 'og:title', m.title);
  html = setMeta(html, 'name', 'twitter:title', m.title);
  html = setMeta(html, 'property', 'og:url', m.canonical);
  html = setMeta(html, 'name', 'robots', m.noindex ? 'noindex, nofollow' : 'index, follow');
  const extra = [`<link rel="canonical" href="${esc(m.canonical)}" />`];
  for (const ld of m.jsonLd ?? []) extra.push(`<script type="application/ld+json" data-route-ld="1">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);

  if (m.h1) {
    const body = [
      `<h1>${esc(m.h1)}</h1>`,
      ...(m.text ?? []).map((t) => `<p>${esc(t)}</p>`),
      m.links?.length ? `<ul>${m.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>` : '',
    ].join('');
    html = html.replace('<div id="root"></div>', `<div id="root"><main>${body}</main></div>`);
  }
  return html;
}

const routes = [...new Set(allIndexableRoutes())];
for (const route of routes) {
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, render(route));
}

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`prerendered ${routes.length} routes + sitemap.xml`);
