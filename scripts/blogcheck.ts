// Content QA for blog posts: word counts, links resolve, title/description lengths, one-off facts.
import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS } from '../src/data/blogs';
import { PRODUCTS } from '../src/data/products';
import { plainBlock, getRouteMeta } from '../src/data/seo-meta';
import { COLLECTIONS, CATEGORY_SEO } from '../src/data/seo';
import { DETAILS } from '../src/data/products-detail';
const ids = new Set(PRODUCTS.map((p: any) => p.id));
const slugs = new Set([...COLLECTIONS.map((c) => c.slug), ...Object.values(CATEGORY_SEO).map((c) => c.slug)]);
const posts = new Set(BLOG_POSTS.map((b) => b.slug));
const STATIC = new Set(['/shop', '/contact', '/faq', '/about', '/shipping', '/refund', '/privacy', '/terms', '/reviews', '/blog', '/cart', '/checkout']);
let bad = 0;
for (const b of BLOG_POSTS) {
  const words = b.content.map(plainBlock).join(' ').split(/\s+/).length;
  const m = getRouteMeta('/blog/' + b.slug, DETAILS);
  const links = [...b.content.join(' ').matchAll(/\]\((\/[^)]*)\)/g)].map((x) => x[1]);
  const broken = links.filter((l) => {
    if (l.startsWith('/images/')) return false;
    if (l.startsWith('/product/')) return !ids.has(l.split('/')[2]);
    if (l.startsWith('/shop/')) return !slugs.has(l.split('/')[2]);
    if (l.startsWith('/blog/')) return !posts.has(l.split('/')[2]);
    return !STATIC.has(l);
  });
  const h2 = b.content.filter((c) => c.startsWith('## ')).length;
  const issues: string[] = [];
  if (words < 1300) issues.push('under 1300 words');
  if (broken.length) issues.push('broken links: ' + broken.join(' '));
  if (m.title.length > 60) issues.push('title ' + m.title.length);
  if (m.description.length < 110 || m.description.length > 160) issues.push('desc ' + m.description.length);
  if (h2 < 7) issues.push('few h2: ' + h2);
  if (links.length < 8) issues.push('few links: ' + links.length);
  if (/\bsecond hand|refurbished\b/i.test(b.content.join(' '))) issues.push('mentions second hand');
  // Images are compulsory: a hero plus inline photos (checked for new posts), each a real, optimised .webp under 200 KB with descriptive alt text.
  const imgs = b.content.flatMap((c) => { const m = c.match(/^!\[([^\]]*)\]\((\/[^)]+)\)$/); return m ? [{ alt: m[1], src: m[2] }] : []; });
  if (b.heroProductId && !PRODUCTS.some((p: any) => p.id === b.heroProductId)) issues.push('hero product missing');
  if (imgs.length) {
    if (imgs.length < 3) issues.push('few inline images: ' + imgs.length);
    for (const im of imgs) {
      const f = path.join('public', im.src);
      if (!/\.webp$/.test(im.src) || !fs.existsSync(f)) issues.push('bad image ' + im.src);
      else if (fs.statSync(f).size > 200 * 1024) issues.push('image over 200KB ' + im.src);
      if (im.alt.split(/\s+/).length < 3) issues.push('weak alt ' + im.src);
    }
    if (!b.heroProductId) issues.push('no hero image');
    if (new Set(imgs.map((i) => i.src)).size !== imgs.length) issues.push('duplicate inline image');
  } else if (b.slug.match(/^(kalkhoff-electric|best-electric-bikes-under-5000|bosch-electric)/)) issues.push('no inline images');
  if (issues.length) bad++;
  console.log(b.slug.padEnd(42), String(words).padStart(5), 'h2', String(h2).padStart(2), 'links', String(links.length).padStart(2), 'title', m.title.length, 'desc', m.description.length, issues.length ? '  !! ' + issues.join('; ') : '  ok');
}
console.log(BLOG_POSTS.length + ' posts, ' + bad + ' with issues');

// Static titles used by shop/home guide links must match real posts.
import { TITLES } from '../src/data/guide-links';
for (const [slug, title] of Object.entries(TITLES)) {
  const p = BLOG_POSTS.find((b) => b.slug === slug);
  if (!p || p.title !== title) { console.log(`guide-links title mismatch: ${slug}`); bad++; }
}
