/**
 * Post-build step: writes a static HTML file per route with the right title, description, canonical,
 * robots, JSON-LD and the fully rendered page body (so crawlers without JavaScript see real content and links),
 * plus sitemap.xml. The React app still mounts over it. Run after `vite build` and `vite build --ssr`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { allIndexableRoutes, getRouteMeta, plainBlock, SITE_URL } from '../src/data/seo-meta';
import { DETAILS } from '../src/data/products-detail';
import { BLOG_POSTS } from '../src/data/blogs';
import { shareIcons, trimInteractionClasses } from './share-icons';

// House rule: every blog post must be at least 1,300 words. The build fails otherwise.
const MIN_BLOG_WORDS = 1300;
const short = BLOG_POSTS.map((b) => ({ slug: b.slug, words: b.content.map(plainBlock).join(' ').split(/\s+/).length })).filter((b) => b.words < MIN_BLOG_WORDS);
if (short.length) {
  console.error(`Blog posts under ${MIN_BLOG_WORDS} words: ` + short.map((b) => `${b.slug} (${b.words})`).join(', '));
  process.exit(1);
}

const DIST = path.resolve('dist');
// The real app, built for the server by `vite build --ssr`: every page is rendered exactly as the browser would show it.
const { render: renderApp } = (await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)) as { render: (url: string) => Promise<string> };
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function setMeta(html: string, attr: 'name' | 'property', key: string, value: string) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

async function render(route: string) {
  const m = getRouteMeta(route, DETAILS);
  const productId = route.match(/^\/product\/([^/]+)$/)?.[1];
  (globalThis as { __PRERENDER_DETAILS__?: unknown }).__PRERENDER_DETAILS__ = productId ? { [productId]: DETAILS[productId] } : undefined;
  const body = trimInteractionClasses(shareIcons(await renderApp(route))).replace(/ data-discover="true"/g, '');
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
  if (m.image) {
    html = setMeta(html, 'property', 'og:image', m.image);
    html = setMeta(html, 'name', 'twitter:image', m.image);
    extra.push(`<link rel="preload" as="image" href="${esc(m.preload ?? m.image)}" fetchpriority="high" />`);
  }
  if (m.dataPreload) extra.push(`<link rel="preload" as="fetch" href="${esc(m.dataPreload)}" crossorigin="anonymous" />`);
  for (const ld of m.jsonLd ?? []) extra.push(`<script type="application/ld+json" data-route-ld="1">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  html = html.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`);

  html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  return html;
}

const routes = [...new Set(allIndexableRoutes())];
for (const route of routes) {
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await render(route));
}

// 404 page: served with a real 404 status for unknown URLs; the app redirects visitors home.
fs.writeFileSync(
  path.join(DIST, '404.html'),
  template
    .replace(/<title>[^<]*<\/title>/, '<title>Page not found | E Bikes for Sale</title>')
    .replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>'),
);

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((r) => `  <url><loc>${SITE_URL}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`).join('\n');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

console.log(`prerendered ${routes.length} routes + sitemap.xml`);
