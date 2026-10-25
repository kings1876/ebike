import type { Product } from '../types';
import type { ProductDetail } from './products-detail';
import { detailUrl } from './data-version';

/** Heavy product fields (description, features, photos, variants) live in their own chunk. */
export const loadDetails = (): Promise<Record<string, ProductDetail>> => import('./products-detail').then((m) => m.DETAILS);

/** Details for one product, as a one-entry map so mergeDetail works the same way. */
export const loadProductDetail = async (id: string): Promise<Record<string, ProductDetail>> => {
  const r = await fetch(detailUrl(id));
  if (!r.ok) throw new Error('detail not found');
  return { [id]: (await r.json()) as ProductDetail };
};

/** Light record + its detail = the full product. Without a detail the light record is returned as is. */
export const mergeDetail = (p: Product, details?: Record<string, ProductDetail>): Product => {
  const d = details?.[p.id];
  return d ? { ...p, ...d } : p;
};
