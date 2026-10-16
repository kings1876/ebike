import { Product } from '../types';
import { PRODUCTS } from './products';

/**
 * Faceted taxonomy layered on top of Category > Subcategory.
 * Category/subcategory stay the primary navigation (and the SEO URLs);
 * facets cut across them: brand, motor system, price band and availability.
 * All values are derived from the product data, so new products appear automatically.
 */

export const PRICE_BANDS = [
  { label: 'Under $2,000', min: 0, max: 1999 },
  { label: '$2,000 - $3,999', min: 2000, max: 3999 },
  { label: '$4,000 - $5,999', min: 4000, max: 5999 },
  { label: '$6,000+', min: 6000, max: Infinity },
] as const;

const unique = (values: (string | undefined)[]) =>
  [...new Set(values.filter((v): v is string => !!v))].sort((a, b) => a.localeCompare(b));

export const BRANDS = unique(PRODUCTS.map(p => p.brand));
export const MOTOR_SYSTEMS = unique(PRODUCTS.map(p => p.details?.['Motor System']));

export const getMotorSystem = (p: Product) => p.details?.['Motor System'];
export const getPriceBand = (p: Product) =>
  PRICE_BANDS.find(b => p.price >= b.min && p.price <= b.max)!.label;

export interface FacetSelection {
  brand: string;
  motor: string;
  price: string;
  inStock: boolean;
}

export const EMPTY_FACETS: FacetSelection = { brand: 'All', motor: 'All', price: 'All', inStock: false };

export const matchesFacets = (p: Product, f: FacetSelection): boolean =>
  (f.brand === 'All' || p.brand === f.brand) &&
  (f.motor === 'All' || getMotorSystem(p) === f.motor) &&
  (f.price === 'All' || getPriceBand(p) === f.price) &&
  (!f.inStock || p.inStock);
