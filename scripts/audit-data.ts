import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS } from '../src/data/products';
import { BLOG_POSTS } from '../src/data/blogs';
import { getRouteMeta, allIndexableRoutes } from '../src/data/seo';

const out: string[] = [];
const log = (ok: boolean, name: string, d = '') => out.push((ok ? 'PASS ' : 'FAIL ') + name + (d ? ' :: ' + d : ''));
const P = PRODUCTS as any[];

// --- data integrity ---
log(new Set(P.map((p) => p.id)).size === P.length, 'unique product ids', String(P.length));
const noPrice = P.filter((p) => !(p.price > 0));
log(noPrice.length === 0, 'every product has a price', noPrice.map((p) => p.id).join(','));
const noImg = P.filter((p) => !(p.images?.length || p.imageUrl));
log(noImg.length === 0, 'every product has an image', noImg.map((p) => p.id).join(','));
const noDesc = P.filter((p) => !p.description || p.description.length < 40);
log(noDesc.length === 0, 'every product has a description', noDesc.map((p) => p.id).join(','));
const weirdSale = P.filter((p) => p.originalPrice && p.originalPrice <= p.price);
log(weirdSale.length === 0, 'sale prices lower than original', weirdSale.map((p) => p.id).join(','));
const badVar = P.filter((p) => p.variants?.some((v: any) => !(v.price > 0)));
log(badVar.length === 0, 'variant prices valid (sold-out variants carry 0 in the feed; the UI falls back to the base price)', badVar.map((p) => p.id).join(','));
const outOfStock = P.filter((p) => p.inStock === false).length;
log(true, 'out-of-stock products (info)', String(outOfStock));
const dupNames = Object.entries(P.reduce((m: any, p) => ((m[p.name.toLowerCase()] = (m[p.name.toLowerCase()] || 0) + 1), m), {})).filter(([, n]) => (n as number) > 1);
log(dupNames.length === 0, 'duplicate product names', dupNames.map(([k, n]) => `${k} x${n}`).join('; '));
const lowAlt = P.filter((p) => p.name.length < 3);
log(lowAlt.length === 0, 'product names usable as alt text');

// --- local images exist ---
const localImgs = new Set<string>();
for (const p of P) for (const i of [...(p.images || []), p.imageUrl, ...((p.variants || []).map((v: any) => v.image))]) if (i && !/^https?:/.test(i)) localImgs.add(i);
const missingLocal = [...localImgs].filter((i) => !fs.existsSync(path.join('public', i.replace(/^\//, ''))));
log(missingLocal.length === 0, 'local image files exist', `${localImgs.size} checked; missing ${missingLocal.slice(0, 5).join(',')}`);
const publicImages = fs.readdirSync('public/images/products');
const used = new Set([...localImgs].map((i) => path.basename(i)));
const orphan = publicImages.filter((f) => !used.has(f));
log(true, 'orphan image files (info)', `${orphan.length} of ${publicImages.length}`);
const totalMB = publicImages.reduce((a, f) => a + fs.statSync(path.join('public/images/products', f)).size, 0) / 1e6;
const big = publicImages.filter((f) => fs.statSync(path.join('public/images/products', f)).size > 250000);
log(big.length === 0, 'no local image over 250 KB', `${big.length} big, total ${totalMB.toFixed(1)} MB`);

// --- remote image URLs (Shopify CDN hotlinks) ---
const remote = new Set<string>();
for (const p of P) for (const i of [...(p.images || []), p.imageUrl, ...((p.variants || []).map((v: any) => v.image))]) if (i && /^https?:/.test(i)) remote.add(i);
const hosts = [...new Set([...remote].map((u) => new URL(u).host))];
log(true, 'remote image hosts (info)', hosts.join(', ') + ` | ${remote.size} urls`);
let bad: string[] = [];
const list = [...remote];
let idx = 0;
await Promise.all(Array.from({ length: 16 }, async () => {
  while (idx < list.length) {
    const u = list[idx++];
    try { const r = await fetch(u, { method: 'HEAD' }); if (!r.ok) bad.push(r.status + ' ' + u.slice(0, 100)); } catch (e: any) { bad.push('ERR ' + u.slice(0, 100)); }
  }
}));
log(bad.length === 0, 'remote product images respond 200', `${list.length - bad.length}/${list.length} ok; ${bad.slice(0, 4).join(' | ')}`);

// --- schema checks for all indexable routes ---
let schemaBad = 0, prodNoImg = 0, prodBadPrice = 0, titleDup = 0;
const titles = new Set<string>();
for (const r of allIndexableRoutes()) {
  const m = getRouteMeta(r);
  if (titles.has(m.title)) titleDup++; titles.add(m.title);
  for (const ld of m.jsonLd ?? []) {
    try { JSON.parse(JSON.stringify(ld)); } catch { schemaBad++; }
    const o: any = ld;
    if (o['@type'] === 'Product') { if (!o.image?.length) prodNoImg++; if (!(o.offers?.price > 0) || o.offers.priceCurrency !== 'AUD') prodBadPrice++; }
  }
}
log(schemaBad === 0, 'JSON-LD serialises');
log(prodNoImg === 0, 'Product schema has images', String(prodNoImg));
log(prodBadPrice === 0, 'Product offers price + AUD', String(prodBadPrice));
log(titleDup === 0, 'no duplicate meta titles', String(titleDup));

// --- hard-coded links in components resolve to routes ---
const routes = new Set(['/', '/shop', '/blog', '/about', '/contact', '/faq', '/reviews', '/cart', '/checkout', '/shipping', '/refund', '/privacy', '/terms']);
const files: string[] = [];
const walk = (d: string) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : /\.tsx$/.test(e.name) && files.push(path.join(d, e.name))));
walk('src');
const slugs = new Set(allIndexableRoutes());
const unresolved: string[] = [];
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  for (const m of s.matchAll(/(?:to|href)="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const p = m[1].replace(/\/$/, '') || '/';
    if (!routes.has(p) && !slugs.has(p) && !/^\/(admin|order|policies)/.test(p) && !/\.(svg|png|webp|txt|xml)$/.test(p)) unresolved.push(f.replace(/\\/g, '/') + ' -> ' + p);
  }
}
log(unresolved.length === 0, 'hard-coded internal links resolve', [...new Set(unresolved)].slice(0, 6).join(' | '));

// --- blog data ---
log(BLOG_POSTS.every((b) => b.author === 'E Bikes for Sale'), 'blog bylines use shop name');
log(new Set(BLOG_POSTS.map((b) => b.slug)).size === BLOG_POSTS.length, 'unique blog slugs', String(BLOG_POSTS.length));

console.log(out.join('\n'));
console.log('\n' + out.filter((l) => l.startsWith('PASS')).length + ' pass, ' + out.filter((l) => l.startsWith('FAIL')).length + ' fail');
