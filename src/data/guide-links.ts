/** Blog titles by slug (static so the home and shop bundles do not pull in blog content). Checked against BLOG_POSTS by scripts/blogcheck.ts. */
export const TITLES: Record<string, string> = {
  'best-electric-bikes-under-3000-australia': "Best Value E-Bikes Under $3,000 in Australia",
  'cheap-electric-bikes-australia-guide': "Cheap Electric Bikes in Australia: What You Get Under $2,000",
  'best-electric-bikes-for-beginners-australia': "Best Electric Bikes for Beginners in Australia",
  'fat-tyre-electric-bikes-guide': "Fat Tyre Electric Bikes in Australia: The Complete Guide",
  'best-electric-bike-australia-2026': "Best Electric Bike in Australia 2026: Picks by Rider Type",
  'step-through-electric-bike-guide': "Best Step-Through Electric Bikes in Australia: Guide",
  'electric-bikes-for-seniors-australia': "Electric Bikes for Seniors in Australia",
  'best-electric-commuter-bikes-australia': "Best Electric Commuter Bikes in Australia",
  'electric-mountain-bike-buying-guide': "Best Electric Mountain Bikes in Australia: Buyer's Guide",
  'best-electric-bikes-for-hills-australia': "Best Electric Bikes for Hills in Australia",
  'best-e-bike-brands-australia': "Most Reliable E-Bike Brands in Australia 2026",
  'commuting-by-ebike-guide': "Commuting by E-Bike: How to Start, Plan and Save",
  'folding-electric-bike-buying-guide': "Best Folding Electric Bikes in Australia (Buyer's Guide)",
  'electric-cargo-bike-family-guide': "Electric Cargo Bikes Australia: Best Picks and Family Guide",
  'australian-ebike-laws-guide-2026': "Australian E-Bike Laws 2026: Power, Age and What's Legal",
  'electric-trike-for-adults-guide': "Electric Trikes for Adults: Is a 3-Wheel E-Bike for You?",
  'electric-road-bikes-for-sale-australia': "Electric Road Bikes for Sale in Australia",
  'ebike-battery-guide-volts-amps-watt-hours': "E-Bike Battery Guide: Volts, Amp Hours and Watt Hours",
  'battery-care-tips-australian-climate': "E-Bike Battery Care for the Australian Climate",
  'trek-electric-bikes-for-sale-australia': "Trek Electric Bikes for Sale in Australia",
  'essential-ebike-accessories': "Essential E-Bike Accessories: Helmets, Locks and Lights",
  'ebike-maintenance-checklist': "E-Bike Maintenance Checklist: Weekly, Monthly, Yearly",
  'kalkhoff-electric-bikes-for-sale-australia': "Kalkhoff Electric Bikes for Sale in Australia",
  'best-electric-bikes-under-5000-australia': "Best Electric Bikes Under $5,000 in Australia",
  'bosch-electric-bikes-for-sale-australia': "Bosch E-Bikes for Sale in Australia: Motor Guide",
};

/** Buying guides linked from shop pages and the homepage, keyed by shop URL slug. Slugs must exist in BLOG_POSTS (checked by the build). */
const BY_SHOP: Record<string, string[]> = {
  'cheap-electric-bikes': ['best-electric-bikes-under-5000-australia', 'best-electric-bikes-under-3000-australia', 'cheap-electric-bikes-australia-guide', 'best-electric-bikes-for-beginners-australia'],
  'fat-tyre-electric-bikes': ['fat-tyre-electric-bikes-guide', 'best-electric-bike-australia-2026'],
  'step-through-electric-bikes': ['step-through-electric-bike-guide', 'electric-bikes-for-seniors-australia', 'best-electric-commuter-bikes-australia'],
  'electric-mountain-bikes': ['electric-mountain-bike-buying-guide', 'bosch-electric-bikes-for-sale-australia', 'best-electric-bikes-for-hills-australia', 'best-e-bike-brands-australia'],
  'electric-commuter-bikes': ['best-electric-commuter-bikes-australia', 'kalkhoff-electric-bikes-for-sale-australia', 'commuting-by-ebike-guide', 'step-through-electric-bike-guide'],
  'folding-electric-bikes': ['folding-electric-bike-buying-guide', 'commuting-by-ebike-guide'],
  'electric-cargo-bikes': ['electric-cargo-bike-family-guide', 'australian-ebike-laws-guide-2026'],
  'electric-trikes': ['electric-trike-for-adults-guide', 'electric-bikes-for-seniors-australia'],
  'electric-road-bikes': ['electric-road-bikes-for-sale-australia', 'best-e-bike-brands-australia'],
  'ebike-batteries-chargers': ['ebike-battery-guide-volts-amps-watt-hours', 'battery-care-tips-australian-climate'],
  'trek-electric-bikes': ['trek-electric-bikes-for-sale-australia', 'best-e-bike-brands-australia'],
  'smartmotion-electric-bikes': ['best-electric-bikes-under-5000-australia', 'best-e-bike-brands-australia', 'best-electric-bike-australia-2026'],
  'ebike-parts-accessories': ['essential-ebike-accessories', 'ebike-maintenance-checklist'],
};

export const HOME_GUIDES = [
  'best-electric-bike-australia-2026',
  'best-e-bike-brands-australia',
  'best-electric-bikes-under-3000-australia',
  'best-electric-commuter-bikes-australia',
  'electric-cargo-bike-family-guide',
  'electric-mountain-bike-buying-guide',
  'folding-electric-bike-buying-guide',
  'australian-ebike-laws-guide-2026',
];

export interface GuideLink { href: string; label: string }

const toLinks = (slugs: string[]): GuideLink[] => slugs.map((s) => ({ href: `/blog/${s}`, label: TITLES[s] }));

export const guidesForShop = (slug?: string): GuideLink[] => (slug && BY_SHOP[slug] ? toLinks(BY_SHOP[slug]) : toLinks(HOME_GUIDES.slice(0, 5)));
export const homeGuides = (): GuideLink[] => toLinks(HOME_GUIDES);
