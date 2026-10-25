// Content QA for blog posts: word counts, links resolve, title/description lengths, one-off facts.
import { BLOG_POSTS } from '../src/data/blogs';
import { PRODUCTS } from '../src/data/products';
import { plainBlock, getRouteMeta, COLLECTIONS, CATEGORY_SEO } from '../src/data/seo';
const ids = new Set(PRODUCTS.map((p: any) => p.id));
const slugs = new Set([...COLLECTIONS.map((c) => c.slug), ...Object.values(CATEGORY_SEO).map((c) => c.slug)]);
const posts = new Set(BLOG_POSTS.map((b) => b.slug));
const STATIC = new Set(['/shop', '/contact', '/faq', '/about', '/shipping', '/refund', '/privacy', '/terms', '/reviews', '/blog', '/cart', '/checkout']);
let bad = 0;
for (const b of BLOG_POSTS) {
  const words = b.content.map(plainBlock).join(' ').split(/\s+/).length;
  const m = getRouteMeta('/blog/' + b.slug);
  const links = [...b.content.join(' ').matchAll(/\]\((\/[^)]*)\)/g)].map((x) => x[1]);
  const broken = links.filter((l) => {
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
  if (issues.length) bad++;
  console.log(b.slug.padEnd(42), String(words).padStart(5), 'h2', String(h2).padStart(2), 'links', String(links.length).padStart(2), 'title', m.title.length, 'desc', m.description.length, issues.length ? '  !! ' + issues.join('; ') : '  ok');
}
console.log(BLOG_POSTS.length + ' posts, ' + bad + ' with issues');
