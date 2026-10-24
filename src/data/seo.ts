import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from './products';
import { BLOG_POSTS } from './blogs';
import type { FacetSelection } from './taxonomy';

/**
 * Single source for SEO: clean category / collection URLs and per-route metadata.
 * Used by the browser (RouteSeo) and by scripts/prerender.ts, so the HTML crawlers get matches the app.
 */

export const SITE_URL = 'https://ebikesale.com.au';
export const SITE_NAME = 'E Bikes for Sale';

export interface SeoCopy {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
}

export const CATEGORY_SEO: Record<string, SeoCopy> = {
  'Electric Mountain Bikes': {
    slug: 'electric-mountain-bikes',
    metaTitle: 'Electric Mountain Bikes for Sale Australia | eMTB',
    metaDescription: 'Buy electric mountain bikes in Australia. Hardtail and full-suspension eMTBs from Trek, Focus, Orbea and more. Free delivery and a 2-year warranty.',
    h1: 'Electric Mountain Bikes for Sale in Australia',
    intro: [
      'Our electric mountain bikes cover everything from entry-level hardtails to full-suspension trail and enduro machines. Mid-drive and hub motor options are listed with battery size, suspension travel and frame details, so you can compare e mountain bikes side by side.',
      'Every eMTB ships Australia-wide with free delivery and a 2-year warranty. Use the filters to narrow by brand, motor, suspension or price.',
    ],
  },
  'Commuter & City Bikes': {
    slug: 'electric-commuter-bikes',
    metaTitle: 'Electric Commuter Bikes Australia | City E-Bikes',
    metaDescription: 'Shop electric commuter and city bikes in Australia. Pedal-assist e-bikes with step-through and diamond frames, racks and lights. Free delivery.',
    h1: 'Electric Commuter & City Bikes in Australia',
    intro: [
      'A good electric commuter bike turns a sweaty ride into an easy one. These pedal-assist e-bikes come with mudguards, racks, lights and comfortable upright geometry for daily trips to work, the shops or the station.',
      'Choose a step-through frame for easy mounting or a diamond frame for a sportier feel. Pedal assist models are limited to 250W and 25 km/h assistance for road use under Australian rules.',
    ],
  },
  'Road & Gravel Bikes': {
    slug: 'electric-road-bikes',
    metaTitle: 'Electric Road & Gravel Bikes Australia',
    metaDescription: 'Lightweight electric road and gravel bikes for Australian riders. Drop-bar e-bikes with long range and free delivery nationwide.',
    h1: 'Electric Road & Gravel Bikes in Australia',
    intro: [
      'Electric road and gravel bikes keep the light, fast feel of a performance bike and add a quiet motor for hills and headwinds. Drop bars, efficient tyres and compact batteries make them a fit for long weekend rides and fast commutes.',
    ],
  },
  'Folding & Compact Bikes': {
    slug: 'folding-electric-bikes',
    metaTitle: 'Folding Electric Bikes Australia | Foldable E-Bikes',
    metaDescription: 'Buy folding electric bikes in Australia. Compact foldable e-bikes for apartments, trains and caravans, with free delivery and a 2-year warranty.',
    h1: 'Folding Electric Bikes in Australia',
    intro: [
      'A folding electric bike fits in a car boot, a caravan or a small apartment, and takes the stress out of mixed-mode commuting. Our foldable e-bikes list their folded size, weight and battery range so you know exactly what you are getting.',
    ],
  },
  'Cargo & Family Bikes': {
    slug: 'electric-cargo-bikes',
    metaTitle: 'Electric Cargo Bikes Australia | Family E-Bikes',
    metaDescription: 'Electric cargo bikes and family e-bikes in Australia. Carry kids, shopping and gear with powerful assist. Free delivery nationwide.',
    h1: 'Electric Cargo & Family Bikes in Australia',
    intro: [
      'Electric cargo bikes replace the second car for school runs, shopping and tradie-style hauling. Longtail and front-loader designs carry kids, groceries and gear, and the motor does the heavy lifting up the hills.',
    ],
  },
  'Trikes & Mobility': {
    slug: 'electric-trikes',
    metaTitle: 'Electric Trikes for Adults Australia | 3 Wheel E-Bikes',
    metaDescription: 'Electric trikes and three-wheel e-bikes for adults in Australia. Stable, comfortable and easy to ride, with free delivery nationwide.',
    h1: 'Electric Trikes & Mobility Bikes in Australia',
    intro: [
      'Electric trikes are stable at a standstill and easy to mount, which makes them a popular choice for older riders, riders with balance concerns and anyone carrying a load. Browse three wheel electric bikes and mobility options with clear specs and prices.',
    ],
  },
  'Kids & Youth': {
    slug: 'kids-electric-bikes',
    metaTitle: 'Kids Electric Bikes Australia | Youth E-Bikes',
    metaDescription: 'Kids and youth electric and balance bikes in Australia. Safe, lightweight options with free delivery nationwide.',
    h1: 'Kids & Youth Electric Bikes in Australia',
    intro: ['Lightweight electric and balance bikes sized for younger riders. Check the age and height guidance on each listing.'],
  },
  'Scooters & Motorbikes': {
    slug: 'electric-scooters-motorbikes',
    metaTitle: 'Electric Scooters & Motorbikes Australia',
    metaDescription: 'Electric scooters and electric motorbikes for sale in Australia. Compare range, power and price with free delivery nationwide.',
    h1: 'Electric Scooters & Motorbikes in Australia',
    intro: [
      'Electric scooters and motorbikes for commuting and off-road riding. Rules for power and where you can ride differ by state, so check the details on each listing and your local transport authority before you ride.',
    ],
  },
  'Parts & Accessories': {
    slug: 'ebike-parts-accessories',
    metaTitle: 'E-Bike Batteries, Helmets & Parts Australia',
    metaDescription: 'E-bike batteries, helmets, locks and accessories in Australia. Genuine parts and gear with free delivery on eligible orders.',
    h1: 'E-Bike Batteries, Helmets, Parts & Accessories',
    intro: [
      'Everything to keep your e-bike running: replacement batteries, chargers, helmets, locks and everyday accessories. Match parts to your bike using the brand and subcategory filters.',
    ],
  },
};

export interface Collection extends SeoCopy {
  /** Fixed filters for this landing page. */
  category?: string;
  facets?: Partial<FacetSelection>;
  sort?: 'price-asc';
  excludeCategories?: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'cheap-electric-bikes',
    metaTitle: 'Cheap Electric Bikes Australia | Affordable E-Bikes',
    metaDescription: 'Shop affordable electric bikes under $2,000 in Australia. Low cost e-bikes with free delivery, a 2-year warranty and 10% off with bank transfer or crypto.',
    h1: 'Cheap & Affordable Electric Bikes in Australia',
    intro: [
      'Looking for a low cost e-bike that is still safe, reliable and legal to ride? This collection lists our most affordable electric bikes, all priced under $2,000. Every bike on the page ships with free Australia-wide delivery and a 2-year warranty.',
      'Cheap does not have to mean basic. You will find pedal-assist commuters, folding e-bikes and step-through models from brands such as NCM and XDS. Pay by bank transfer, Osko or crypto and take an extra 10% off at checkout.',
    ],
    facets: { price: 'Under $2,000' },
    excludeCategories: ['Parts & Accessories', 'Scooters & Motorbikes'],
    sort: 'price-asc',
  },
  {
    slug: 'fat-tyre-electric-bikes',
    metaTitle: 'Fat Tyre Electric Bikes Australia | Fat Tire E-Bikes',
    metaDescription: 'Buy fat tyre electric bikes in Australia, including Fatboy and more. Wide-tyre e-bikes for sand, gravel and city riding. Free delivery.',
    h1: 'Fat Tyre Electric Bikes in Australia',
    intro: [
      'Fat tyre electric bikes roll over sand, gravel and rough paths with the grip and comfort of wide, low-pressure tyres. They also make great relaxed city cruisers.',
      'Browse fat tire e-bikes with the motor, battery and frame details you need to compare. All orders ship free across Australia.',
    ],
    facets: { tyres: 'Fat' },
  },
  {
    slug: 'step-through-electric-bikes',
    metaTitle: 'Step Through Electric Bikes Australia | Step-Thru E-Bikes',
    metaDescription: 'Step through electric bikes in Australia. Low-entry e-bikes that are easy to mount, for commuting and relaxed riding. Free delivery nationwide.',
    h1: 'Step Through Electric Bikes in Australia',
    intro: [
      'A step through frame has no high top bar, so you can get on and off without swinging a leg over the saddle. That makes a step through ebike a comfortable pick for commuting, shopping and riders of any age or height.',
      'Every model lists its battery, motor and frame size. Pedal-assist step-through e-bikes ship free Australia-wide with a 2-year warranty.',
    ],
    category: 'Commuter & City Bikes',
    facets: { frame: 'Step-Through' },
  },
];

export const categorySlug = (category: string) => CATEGORY_SEO[category]?.slug;
export const categoryPath = (category: string) => {
  const s = categorySlug(category);
  return s ? `/shop/${s}` : `/shop?category=${encodeURIComponent(category)}`;
};
export const categoryFromSlug = (slug?: string) =>
  Object.entries(CATEGORY_SEO).find(([, v]) => v.slug === slug)?.[0];
export const collectionFromSlug = (slug?: string) => COLLECTIONS.find((c) => c.slug === slug);

// ---- route metadata ----

export interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  jsonLd?: object[];
  /** Absolute image URL for og:image and the LCP preload. */
  image?: string;
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

export function getRouteMeta(pathname: string): RouteMeta {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const canonical = abs(path);

  if (NOINDEX_PREFIXES.some((p) => path === p || path.startsWith(p + '/'))) {
    return { title: `${SITE_NAME}`, description: '', canonical, noindex: true };
  }

  if (STATIC[path]) {
    const meta: RouteMeta = { ...STATIC[path], canonical };
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
      return {
        title: copy.metaTitle,
        description: copy.metaDescription,
        canonical,
        h1: copy.h1,
        text: copy.intro,
        links: (cat ? items : []).slice(0, 24).map((p) => ({ href: `/product/${p.id}`, label: p.name })),
        jsonLd: [breadcrumb([['Home', '/'], ['Shop', '/shop'], [copy.h1, path]])],
      };
    }
  }

  const prod = path.match(/^\/product\/([^/]+)$/);
  if (prod) {
    const p = PRODUCTS.find((x) => x.id === prod[1]);
    if (p) {
      const desc = clean(p.tagline ? `${p.tagline}. ${p.description}` : p.description);
      const firstImage = (p.images?.length ? p.images[0] : p.imageUrl) || '';
      let title = `${p.name} | Buy in Australia`;
      if (title.length < 36) title = `${p.name} | Buy in Australia | ${SITE_NAME}`;
      return {
        title: clip(title, 60),
        description: clip(`${p.name}: ${desc} Free delivery Australia-wide.`, 158),
        image: firstImage ? imageUrlFor(firstImage) : undefined,
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
              priceCurrency: 'USD',
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
    return {
      title: clip(`${post.title} | E Bikes for Sale`, 60),
      description: clip(clean(post.excerpt), 158),
      canonical,
      h1: post.title,
      text: post.content,
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, author: { '@type': 'Person', name: post.author }, description: post.excerpt, mainEntityOfPage: canonical, publisher: { '@type': 'Organization', name: SITE_NAME } }],
    };
  }

  return { title: `${SITE_NAME} | Electric Bikes Australia`, description: STATIC['/'].description, canonical };
}

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
