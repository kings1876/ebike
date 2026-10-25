import { Product, ProductVariant } from '../types';

export const hasVariants = (p: Product): boolean => !!p.variants && p.variants.length > 1 && !!p.options?.length;

/** Selection that opens on the first purchasable variant (or the first one if all are sold out). */
export const defaultSelection = (p: Product): string[] => {
  if (!p.variants?.length) return [];
  return (p.variants.find(v => v.available) ?? p.variants[0]).options;
};

export const findVariant = (p: Product, selection: string[]): ProductVariant | undefined =>
  p.variants?.find(v => v.options.every((o, i) => o === selection[i]));

/** Is there an in-stock variant with `value` at option `index`, given the other chosen options? */
export const optionInStock = (p: Product, selection: string[], index: number, value: string): boolean =>
  !!p.variants?.some(
    v => v.available && v.options[index] === value && v.options.every((o, i) => i === index || o === selection[i])
  );

/** Lowest in-stock price (or lowest overall if sold out) and whether prices differ. */
export const priceFrom = (p: Product): { price: number; varies: boolean } => {
  if (!p.variants?.length) return { price: p.price, varies: false };
  const prices = p.variants.map(v => v.price).filter(n => n > 0);
  if (!prices.length) return { price: p.price, varies: false };
  return { price: p.price, varies: Math.min(...prices) !== Math.max(...prices) };
};
