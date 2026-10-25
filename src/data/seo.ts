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
  subcategory?: string;
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
  {
    slug: 'trek-electric-bikes',
    metaTitle: 'Trek Electric Bikes Australia | Rail, Marlin+, Allant+',
    metaDescription: 'Buy Trek electric bikes in Australia, including Rail e-MTBs, Marlin+, Dual Sport+ and Allant+ commuters. Free delivery and a 2-year warranty.',
    h1: 'Trek Electric Bikes in Australia',
    intro: ['Shop Trek electric bikes for mountain, trail and city riding. Every bike ships free across Australia with a 2-year warranty.'],
    facets: { brand: 'Trek' },
    excludeCategories: ['Parts & Accessories'],
  },
  {
    slug: 'smartmotion-electric-bikes',
    metaTitle: 'SmartMotion E-Bikes Australia | SmartMotion Electric Bikes',
    metaDescription: 'Buy SmartMotion electric bikes in Australia, including the Hypersonic Neo, Catalyst, Pacer GT and X-City Neo. Free delivery nationwide.',
    h1: 'SmartMotion Electric Bikes in Australia',
    intro: ['Shop SmartMotion e-bikes for city, trail and step-through riding. Every bike ships free across Australia with a 2-year warranty.'],
    facets: { brand: 'SmartMotion' },
  },
  {
    slug: 'ebike-batteries-chargers',
    metaTitle: 'E-Bike Batteries & Chargers Australia | Ebike Battery',
    metaDescription: 'Buy ebike batteries, range extenders and chargers in Australia. Match voltage and fit to your bike. Free delivery on eligible orders.',
    h1: 'E-Bike Batteries & Chargers in Australia',
    intro: ['Replacement ebike batteries, range extenders and chargers. Check compatibility with your bike before ordering, or ask our team.'],
    category: 'Parts & Accessories',
    subcategory: 'Batteries & Chargers',
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

