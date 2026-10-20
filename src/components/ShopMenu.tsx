import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';

const shopUrl = (category: string, subcat?: string) =>
  `/shop?category=${encodeURIComponent(category)}${subcat ? `&subcat=${encodeURIComponent(subcat)}` : ''}`;

/** Category > subcategory links for the menu. Auto-generated "All <category>" subcategories are skipped. */
const useMenuCategories = () =>
  useMemo(
    () =>
      CATEGORIES_WITH_SUBCATEGORIES.map((c) => ({
        category: c.category,
        count: PRODUCTS.filter((p) => p.category === c.category).length,
        subcategories: c.subcategories.filter((s) => s !== 'All' && !s.startsWith('All ')).filter((_, __, arr) => arr.length > 1),
      })),
    []
  );

/** Bike brands with the most products, for the "Shop by brand" menu column. */
const TOP_BRANDS = (() => {
  const m = new Map<string, number>();
  PRODUCTS.filter((p) => p.attributes).forEach((p) => m.set(p.brand ?? 'Other', (m.get(p.brand ?? 'Other') ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12);
})();
const SALE_COUNT = PRODUCTS.filter((p) => p.originalPrice).length;

/** Desktop: "Shop" with a hover / focus / click dropdown of every product category. */
export const ShopMenuDesktop: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const categories = useMenuCategories();

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Close after navigating, on Escape, and on outside click
  useEffect(() => setOpen(false), [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center gap-1">
        <Link
          to="/shop"
          className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
            isActive
              ? 'text-emerald-700 border-emerald-600 font-semibold'
              : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-300'
          }`}
        >
          Shop
        </Link>
        <button
          type="button"
          aria-label="Toggle shop categories"
          aria-expanded={open}
          aria-haspopup="true"
          onClick={openNow}
          className="p-0.5 text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
          <div className="w-[min(56rem,92vw)] bg-white rounded-2xl border border-slate-200 shadow-xl p-6">
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5 max-h-[70vh] overflow-y-auto">
              {categories.map((c) => (
                <div key={c.category}>
                  <Link
                    to={shopUrl(c.category)}
                    className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    {c.category}
                    <span className="ml-1.5 text-[11px] font-medium text-slate-400">{c.count}</span>
                  </Link>
                  <ul className="mt-1.5 space-y-1">
                    {c.subcategories.slice(0, 10).map((s) => (
                      <li key={s}>
                        <Link
                          to={shopUrl(c.category, s)}
                          className="text-xs text-slate-600 hover:text-emerald-700 transition-colors"
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-3 lg:col-span-1">
                <div className="text-sm font-bold text-slate-900">Shop by brand</div>
                <ul className="mt-1.5 grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1">
                  {TOP_BRANDS.map(([brand, n]) => (
                    <li key={brand}>
                      <Link to={'/shop?brand=' + encodeURIComponent(brand)} className="text-xs text-slate-600 hover:text-emerald-700 transition-colors">
                        {brand} <span className="text-slate-400">{n}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-col gap-1">
                  <Link to="/shop?sale=1" className="text-xs font-semibold text-rose-600 hover:underline">Sale &amp; clearance ({SALE_COUNT})</Link>
                  <Link to="/shop?instock=1" className="text-xs font-semibold text-emerald-700 hover:underline">In stock now</Link>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{PRODUCTS.length} products across {categories.length} categories</span>
              <Link to="/shop" className="font-semibold text-emerald-700 hover:underline">
                View all products
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Mobile: "Shop" row that expands into the category list. */
export const ShopMenuMobile: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const [open, setOpen] = useState(false);
  const categories = useMenuCategories();

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
      >
        <span>Shop</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-3 pl-3 border-l border-slate-200 mt-1 mb-2 space-y-0.5 max-h-[55vh] overflow-y-auto">
          <Link to="/shop" onClick={onNavigate} className="block px-3 py-1.5 text-sm font-semibold text-emerald-700">
            All products ({PRODUCTS.length})
          </Link>
          <Link to="/shop?sale=1" onClick={onNavigate} className="block px-3 py-1.5 text-sm font-semibold text-rose-600">
            Sale &amp; clearance ({SALE_COUNT})
          </Link>
          {categories.map((c) => (
            <Link
              key={c.category}
              to={shopUrl(c.category)}
              onClick={onNavigate}
              className="flex items-center justify-between px-3 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100"
            >
              <span>{c.category}</span>
              <span className="text-xs text-slate-400">{c.count}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
