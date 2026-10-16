import { Product } from '../types';

/**
 * Faceted taxonomy layered on top of Category > Subcategory.
 * Category/subcategory stay the primary navigation (and the SEO URLs);
 * facets cut across them so shoppers can filter by what they care about.
 */

export const USE_CASES = [
  'Trail & Off-Road',
  'All-Terrain & Beach',
  'Daily Commuting',
  'Cargo & Utility',
  'Travel, Caravan & Apartment',
] as const;
export type UseCase = (typeof USE_CASES)[number];

export const POWER_BANDS = ['250W', '350-500W', '750W+'] as const;
export type PowerBand = (typeof POWER_BANDS)[number];

export const PRICE_BANDS = [
  { label: 'Under $1,000', min: 0, max: 999 },
  { label: '$1,000 - $1,499', min: 1000, max: 1499 },
  { label: '$1,500+', min: 1500, max: Infinity },
] as const;

export const CONDITIONS = ['New', 'Pre-Owned & Ex-Demo'] as const;

/** Hand-curated attributes per product id. Add an entry when adding a product. */
export const PRODUCT_ATTRIBUTES: Record<string, { useCases: UseCase[]; roadLegal: boolean }> = {
  'apex-trail-pro-750': { useCases: ['Trail & Off-Road'], roadLegal: true },
  'outback-pioneer-500': { useCases: ['Trail & Off-Road'], roadLegal: true },
  'summit-beast-fat-emtb': { useCases: ['All-Terrain & Beach', 'Trail & Off-Road'], roadLegal: false },
  'metro-glide-stepthrough': { useCases: ['Daily Commuting'], roadLegal: true },
  'cityline-express-urban': { useCases: ['Daily Commuting'], roadLegal: true },
  'courier-hauler-cargo': { useCases: ['Cargo & Utility', 'Daily Commuting'], roadLegal: true },
  'voltfold-compact-250': { useCases: ['Travel, Caravan & Apartment', 'Daily Commuting'], roadLegal: true },
  'nomad-fat-tyre-folder': { useCases: ['Travel, Caravan & Apartment', 'All-Terrain & Beach'], roadLegal: true },
  'certified-refurb-outback': { useCases: ['Trail & Off-Road'], roadLegal: false },
  'ex-demo-fleet-cityline': { useCases: ['Daily Commuting'], roadLegal: true },
};

export const getUseCases = (p: Product): UseCase[] => PRODUCT_ATTRIBUTES[p.id]?.useCases ?? [];
export const isRoadLegal = (p: Product): boolean => PRODUCT_ATTRIBUTES[p.id]?.roadLegal ?? false;
export const getCondition = (p: Product) =>
  p.category === 'Second Hand & Refurbished' ? CONDITIONS[1] : CONDITIONS[0];

export const getPowerBand = (p: Product): PowerBand | null => {
  if (!p.specs) return null;
  const watts = parseInt(p.specs.motor.match(/(\d+)\s*W/i)?.[1] ?? '0', 10);
  if (watts >= 750) return '750W+';
  if (watts > 250) return '350-500W';
  return '250W';
};

export const getPriceBand = (p: Product) =>
  PRICE_BANDS.find(b => p.price >= b.min && p.price <= b.max)!.label;

export interface FacetSelection {
  use: string;
  power: string;
  price: string;
  condition: string;
  legal: boolean;
}

export const EMPTY_FACETS: FacetSelection = { use: 'All', power: 'All', price: 'All', condition: 'All', legal: false };

export const matchesFacets = (p: Product, f: FacetSelection): boolean =>
  (f.use === 'All' || getUseCases(p).includes(f.use as UseCase)) &&
  (f.power === 'All' || getPowerBand(p) === f.power) &&
  (f.price === 'All' || getPriceBand(p) === f.price) &&
  (f.condition === 'All' || getCondition(p) === f.condition) &&
  (!f.legal || isRoadLegal(p));
