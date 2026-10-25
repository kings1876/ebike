import type { Product } from '../types';
import type { ProductDetail } from './products-detail';

/** Heavy product fields (description, features, photos, variants) live in their own chunk. */
export const loadDetails = (): Promise<Record<string, ProductDetail>> => import('./products-detail').then((m) => m.DETAILS);

/** Light record + its detail = the full product. Without a detail the light record is returned as is. */
export const mergeDetail = (p: Product, details?: Record<string, ProductDetail>): Product => {
  const d = details?.[p.id];
  return d ? { ...p, ...d } : p;
};
