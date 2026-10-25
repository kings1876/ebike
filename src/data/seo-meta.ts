import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from './products';
import { BLOG_POSTS } from './blogs';
import { defaultSelection, findVariant } from './variants';
import { EXTRA } from './seo-content';
import { mergeDetail } from './catalogue';
import { FAQ_ITEMS } from './faq';
import { detailUrl } from './data-version';
import type { ProductDetail } from './products-detail';
import { SITE_URL, SITE_NAME, CATEGORY_SEO, COLLECTIONS, categoryPath, categoryFromSlug, collectionFromSlug } from './seo';

/** Per-route metadata (title, description, canonical, JSON-LD, prerender snapshot). Loaded on demand in the browser. */
export { SITE_URL, SITE_NAME };


export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  jsonLd?: object[];
  /** Absolute image URL for og:image and the LCP preload. */
  image?: string;
  /** Exact URL the page loads for its main image, so it can be preloaded. */
  preload?: string;
  /** Per-product details file to fetch early on product pages. */
  dataPreload?: string;
  /** Plain content for the prerendered HTML snapshot. */
  h1?: string;
  text?: string[];
  links?: { href: string; label: string }[];
}

const abs = (path: string) => `${SITE_URL}${path}`;
const clip = (s: string, n: number) => (s.length <= n ? s : s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…');
const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

const STATIC: Record<string, Omit<RouteMeta, 'canonical'>> = {
  '/': {
    title: 'E Bikes for Sale Australia | Buy Electric Bikes Online',
    description: 'Buy electric bikes online in Australia. Electric mountain, commuter, folding and cargo e-bikes from top brands. Free delivery, 2-year warranty, 10% off with bank transfer or crypto.',
    h1: 'E Bikes for Sale in Australia',
  },
  '/shop': {
    title: 'Shop Electric Bikes Australia | E Bikes for Sale',
    description: 'Browse the full range of electric bikes, trikes, scooters and e-bike parts in Australia. Filter by brand, motor, frame and price. Free delivery nationwide.',
    h1: 'E-Bikes for Sale in Australia',
  },
  '/about': { title: 'About Us | E Bikes for Sale Australia', description: 'Learn about E Bikes for Sale, an Australian online electric bike retailer with free nationwide delivery and a 2-year warranty.', h1: 'About E Bikes for Sale' },
  '/contact': { title: 'Contact Us | E Bikes for Sale Australia', description: 'Contact the E Bikes for Sale team about sizing, orders, delivery or warranty. Email sales@ebikesale.com.au.', h1: 'Contact Our Australian Team' },
  '/faq': { title: 'E-Bike FAQ | Delivery, Payment, Laws & Warranty', description: 'Answers to common questions about buying an electric bike in Australia: delivery, payment, e-bike laws, specs and warranty.', h1: 'Frequently Asked Questions' },
  '/reviews': { title: 'Customer Reviews | E Bikes for Sale Australia', description: 'Read verified customer reviews of E Bikes for Sale and our electric bikes, including delivery, service and bike quality feedback from Australian riders.', h1: 'Customer Reviews' },
  '/blog': { title: 'E-Bike Buying Guides & News | E Bikes for Sale', description: 'Electric bike buying guides, Australian e-bike law explainers and tips from the E Bikes for Sale team.', h1: 'E-Bike Buying Guides' },
  '/shipping': { title: 'Shipping Policy | E Bikes for Sale', description: 'Free tracked delivery across Australia on electric bikes. Read our shipping policy.', h1: 'Shipping Policy' },
  '/refund': { title: 'Refund & Returns Policy | E Bikes for Sale', description: 'Read the E Bikes for Sale refund and returns policy, including how to request a return authorisation for an electric bike or accessory.', h1: 'Refund Policy' },
  '/privacy': { title: 'Privacy Policy | E Bikes for Sale', description: 'How E Bikes for Sale collects, uses and protects your personal information when you order an electric bike or contact our Australian team.', h1: 'Privacy Policy' },
  '/terms': { title: 'Terms & Conditions | E Bikes for Sale', description: 'Terms and conditions for purchasing electric bikes, parts and accessories from E Bikes for Sale, including payment, delivery and warranty terms.', h1: 'Terms & Conditions' },
};

const NOINDEX_PREFIXES = ['/cart', '/checkout', '/admin', '/order'];

export function getRouteMeta(pathname: string, details?: Record<string, ProductDetail>): RouteMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const canonical = abs(path);

  if (NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(p + '/'))) {
    return { title: `${SITE_NAME}`, description: '', canonical, noindex: true };
  }

  if (STATIC[path]) {
    const meta: RouteMeta = { ...STATIC[path], canonical };
    if (path === '/faq') {
      meta.jsonLd = [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }];
    }
    if (path === '/') {
      meta.links = CATEGORIES_WITH_SUBCATEGORIES.map((c) => ({ href: categoryPath(c.category), label: CATEGORY_SEO[c.category]?.h1 ?? c.category }));
    }
    return meta;
  }

  const shop = path.match(/^\/shop\/([^/]+)$/);
  if (shop) {
    const cat = categoryFromSlug(shop[1]);
    const copy = cat ? CATEGORY_SEO[cat] : collectionFromSlug(shop[1]);
    if (copy) {
      const col = collectionFromSlug(shop[1]);
      const items = PRODUCTS.filter((p) => (cat ? p.category === cat : col?.category ? p.category === col.category : true));
      const extra = EXTRA[shop[1]];
      const text = [...copy.intro, ...(extra?.sections.flatMap((x) => [x.h2, ...x.body]) ?? []), ...(extra?.faq.flatMap((f) => [f.q, f.a]) ?? [])];
      return {
        title: copy.metaTitle,
        description: copy.metaDescription,
        canonical,
        h1: copy.h1,
        text,
        links: (cat ? items : []).slice(0, 24).map((p) => ({ href: `/product/${p.id}`, label: p.name })),
        jsonLd: [
          breadcrumb([['Home', '/'], ['Shop', '/shop'], [copy.h1, path]]),
          ...(extra?.faq.length
            ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: extra.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }]
            : []),
        ],
      };
    }
  }

  const prod = path.match(/^\/product\/([^/]+)$/);
  if (prod) {
    const light = PRODUCTS.find((x) => x.id === prod[1]);
    const p = light && mergeDetail(light, details);
    if (p) {
      const desc = clean(p.tagline ? `${p.tagline}. ${p.description}` : p.description);
      const firstImage = (p.images?.length ? p.images[0] : p.imageUrl) || '';
      let title = `${p.name} | Buy in Australia`;
      if (title.length < 36) title = `${p.name} | Buy in Australia | ${SITE_NAME}`;
      return {
        title: clip(title, 60),
        description: clip(`${p.name}: ${desc} Free delivery Australia-wide.`, 158),
        image: firstImage ? imageUrlFor(firstImage) : undefined,
        // The product page opens on the first purchasable variant, whose photo can differ from images[0].
        preload: (() => {
          const v = p.variants?.length ? findVariant(p, defaultSelection(p)) : undefined;
          const src = v?.image ?? p.imageUrl ?? firstImage;
          return src ? imageUrlFor(src).replace(/width=\d+/, 'width=700') : undefined;
        })(),
        dataPreload: detailUrl(p.id),
        canonical,
        h1: p.name,
        text: [clean(p.description)],
        links: [{ href: categoryPath(p.category), label: CATEGORY_SEO[p.category]?.h1 ?? p.category }],
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: p.name,
            description: clip(clean(p.description), 500),
            sku: p.id,
            brand: p.brand ? { '@type': 'Brand', name: p.brand } : undefined,
            category: p.category,
            image: (p.images?.length ? p.images : p.imageUrl ? [p.imageUrl] : []).slice(0, 5).map(imageUrlFor),
            url: canonical,
            offers: {
              '@type': 'Offer',
              price: p.price,
              priceCurrency: 'AUD',
              availability: p.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
              url: canonical,
            },
          },
          breadcrumb([['Home', '/'], ['Shop', '/shop'], [p.category, categoryPath(p.category)], [p.name, path]]),
        ],
      };
    }
  }

  const post = path.match(/^\/blog\/([^/]+)$/) && BLOG_POSTS.find((b) => b.slug === path.split('/')[2]);
  if (post) {
    const hero = post.heroProductId ? PRODUCTS.find((p) => p.id === post.heroProductId) : undefined;
    const heroSrc = hero ? (hero.images?.length ? hero.images[0] : hero.imageUrl) : undefined;
    const iso = (d?: string) => (d && !Number.isNaN(Date.parse(d)) ? new Date(d + ' 12:00 UTC').toISOString().slice(0, 10) : undefined);
    return {
      title: post.title.length <= 41 ? `${post.title} | E Bikes for Sale` : clip(post.title, 60),
      description: clip(clean(post.excerpt), 158),
      canonical,
      image: heroSrc ? imageUrlFor(heroSrc) : undefined,
      preload: heroSrc ? imageUrlFor(heroSrc).replace(/width=\d+/, 'width=720') : undefined,
      h1: post.title,
      text: post.content.map(plainBlock),
      links: [{ href: '/shop', label: 'Shop electric bikes' }],
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          datePublished: iso(post.date),
          dateModified: iso(post.updated ?? post.date),
          image: heroSrc ? [imageUrlFor(heroSrc)] : undefined,
          author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: canonical,
        },
        breadcrumb([['Home', '/'], ['Blog', '/blog'], [post.title, path]]),
      ],
    };
  }

  return { title: `${SITE_NAME} | Electric Bikes Australia`, description: STATIC['/'].description, canonical };
}

/** Strip block and link markup from a blog block, for the plain-text HTML snapshot. */
export const plainBlock = (b: string) => b.replace(/^##\s+/, '').replace(/^-\s+/, '').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

export const imageUrlFor = (src: string) => {
  const url = src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
  return url.replace(/width=\d+/, 'width=900');
};

function breadcrumb(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(href) })),
  };
}

/** Every indexable route, for the sitemap and prerender. */
export function allIndexableRoutes(): string[] {
  return [
    ...Object.keys(STATIC),
    ...Object.values(CATEGORY_SEO).map((c) => `/shop/${c.slug}`),
    ...COLLECTIONS.map((c) => `/shop/${c.slug}`),
    ...PRODUCTS.map((p) => `/product/${p.id}`),
    ...BLOG_POSTS.map((b) => `/blog/${b.slug}`),
  ];
}
