import React from 'react';
import { Product } from '../types';
import { optionInStock } from '../data/variants';

interface VariantPickerProps {
  product: Product;
  selection: string[];
  onChange: (selection: string[]) => void;
}

export const VariantPicker: React.FC<VariantPickerProps> = ({ product, selection, onChange }) => {
  if (!product.options?.length) return null;

  return (
    <div className="space-y-3">
      {product.options.map((option, index) => (
        <div key={option.name}>
          <div className="text-xs font-semibold text-slate-700 mb-1.5">
            {option.name}: <span className="font-bold text-slate-900">{selection[index]}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = selection[index] === value;
              const inStock = optionInStock(product, selection, index, value);
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    const next = [...selection];
                    next[index] = value;
                    // If that exact combination does not exist, fall back to the first variant that has this value
                    const exists = product.variants?.some(v => v.options.every((o, i) => o === next[i]));
                    onChange(
                      exists
                        ? next
                        : (product.variants?.find(v => v.available && v.options[index] === value) ??
                            product.variants?.find(v => v.options[index] === value))?.options ?? next
                    );
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : inStock
                        ? 'bg-white text-slate-700 border-slate-300 hover:border-slate-900'
                        : 'bg-slate-50 text-slate-400 border-slate-200 line-through hover:border-slate-400'
                  }`}
                  title={inStock ? undefined : 'Sold out in this combination'}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
