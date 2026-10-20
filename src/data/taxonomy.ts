import { Product } from '../types';
import { PRODUCTS } from './products';

/**
 * Taxonomy: Category > Subcategory (see products.ts), plus cross-cutting facets.
 * Facet values are derived from the product data, so new products appear automatically.
 */

export const PARTS_CATEGORY = 'Parts & Accessories';
export const isPartsCategory = (c: string) => c === PARTS_CATEGORY;

export const BIKE_PRICE_BANDS = [
  { label: 'Under $2,000', min: 0, max: 1999 },
  { label: '$2,000 - $3,999', min: 2000, max: 3999 },
  { label: '$4,000 - $5,999', min: 4000, max: 5999 },
  { label: '$6,000 - $9,999', min: 6000, max: 9999 },
  { label: '$10,000+', min: 10000, max: Infinity },
] as const;

export const PARTS_PRICE_BANDS = [
  { label: 'Under $50', min: 0, max: 49.99 },
  { label: '$50 - $99', min: 50, max: 99.99 },
  { label: '$100 - $249', min: 100, max: 249.99 },
  { label: '$250+', min: 250, max: Infinity },
] as const;

const ALL_BANDS = [...BIKE_PRICE_BANDS, ...PARTS_PRICE_BANDS];

export interface FacetSelection {
  brand: string;
  motor: string;
  frame: string;
  tyres: string;
  suspension: string;
  use: string;
  price: string;
  lightweight: boolean;
  inStock: boolean;
  sale: boolean;
}

export const EMPTY_FACETS: FacetSelection = {
  brand: 'All', motor: 'All', frame: 'All', tyres: 'All', suspension: 'All', use: 'All', price: 'All',
  lightweight: false, inStock: false, sale: false,
};

/** URL query keys for each facet. */
const SELECT_KEYS: [keyof FacetSelection, string][] = [
  ['brand', 'brand'], ['motor', 'motor'], ['frame', 'frame'], ['tyres', 'tyres'], ['suspension', 'susp'], ['use', 'use'], ['price', 'price'],
];
const FLAG_KEYS: [keyof FacetSelection, string][] = [['lightweight', 'light'], ['inStock', 'instock'], ['sale', 'sale']];

export const facetsFromParams = (sp: URLSearchParams): FacetSelection => {
  const f: any = { ...EMPTY_FACETS };
  for (const [k, q] of SELECT_KEYS) f[k] = sp.get(q) || 'All';
  for (const [k, q] of FLAG_KEYS) f[k] = sp.get(q) === '1';
  return f;
};

export const facetsToParams = (f: FacetSelection, into: Record<string, string> = {}) => {
  for (const [k, q] of SELECT_KEYS) if (f[k] !== 'All') into[q] = f[k] as string;
  for (const [k, q] of FLAG_KEYS) if (f[k]) into[q] = '1';
  return into;
};

export const activeFacetCount = (f: FacetSelection) =>
  SELECT_KEYS.filter(([k]) => f[k] !== 'All').length + FLAG_KEYS.filter(([k]) => f[k]).length;

// ---- derived option lists (with counts) ----
const count = (values: (string | undefined)[]) => {
  const m = new Map<string, number>();
  values.forEach(v => v && m.set(v, (m.get(v) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([value, n]) => ({ value, label: `${value} (${n})` }));
};

const bikes = PRODUCTS.filter(p => p.attributes);
export const BRAND_OPTIONS = count(PRODUCTS.map(p => p.brand));
export const MOTOR_OPTIONS = count(bikes.map(p => p.details?.['Motor System']));
export const FRAME_OPTIONS = count(bikes.map(p => p.attributes?.frame));
export const TYRE_OPTIONS = count(bikes.map(p => p.attributes?.tyres).filter(Boolean) as string[]).map(o => ({ ...o, label: o.label.replace(/^Fat/, 'Fat tyres') }));
export const SUSPENSION_OPTIONS = count(bikes.map(p => p.attributes?.suspension));
export const USE_OPTIONS = count(bikes.flatMap(p => p.attributes?.uses ?? []));

export const matchesFacets = (p: Product, f: FacetSelection): boolean => {
  const a = p.attributes;
  if (f.brand !== 'All' && p.brand !== f.brand) return false;
  if (f.motor !== 'All' && p.details?.['Motor System'] !== f.motor) return false;
  if (f.frame !== 'All' && a?.frame !== f.frame) return false;
  if (f.tyres !== 'All' && a?.tyres !== f.tyres) return false;
  if (f.suspension !== 'All' && a?.suspension !== f.suspension) return false;
  if (f.use !== 'All' && !a?.uses?.includes(f.use)) return false;
  if (f.price !== 'All') {
    const band = ALL_BANDS.find(b => b.label === f.price);
    if (!band || p.price < band.min || p.price > band.max) return false;
  }
  if (f.lightweight && !a?.lightweight) return false;
  if (f.inStock && !p.inStock) return false;
  if (f.sale && !p.originalPrice) return false;
  return true;
};

/** Old category names (from before the taxonomy change) so existing links keep working. */
const LEGACY: Record<string, { category: string; subcat?: string; facets?: Partial<FacetSelection> }> = {
  'Electric Commuter Bikes': { category: 'Commuter & City Bikes' },
  'Step-Through Electric Bikes': { category: 'Commuter & City Bikes', facets: { frame: 'Step-Through' } },
  'Folding Electric Bikes': { category: 'Folding & Compact Bikes' },
  'Road & Gravel Electric Bikes': { category: 'Road & Gravel Bikes' },
  'Cruiser & Fat Tyre Bikes': { category: 'Commuter & City Bikes', subcat: 'Cruiser & Comfort' },
  'Electric Trikes': { category: 'Trikes & Mobility' },
  'Electric Scooters': { category: 'Scooters & Motorbikes', subcat: 'Electric Scooters' },
  'Electric Motorbikes': { category: 'Scooters & Motorbikes', subcat: 'Electric Motorbikes' },
  'Kids Electric Bikes': { category: 'Kids & Youth' },
  'Accessories, Parts & Gear': { category: PARTS_CATEGORY },
  'Second Hand & Refurbished': { category: 'All' },
};
const LEGACY_SUBCAT: Record<string, string> = { 'Dual Suspension': 'Full-Suspension' };

export const resolveLegacy = (category: string, subcat: string, facets: FacetSelection) => {
  const l = LEGACY[category];
  if (!l) return { category, subcat: LEGACY_SUBCAT[subcat] ?? subcat, facets };
  return { category: l.category, subcat: subcat !== 'All' ? subcat : l.subcat ?? 'All', facets: { ...facets, ...l.facets } };
};
