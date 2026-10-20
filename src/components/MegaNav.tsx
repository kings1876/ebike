import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { Product } from '../types';

const shopUrl = (category: string, subcat?: string) =>
  `/shop?category=${encodeURIComponent(category)}${subcat ? `&subcat=${encodeURIComponent(subcat)}` : ''}`;
const brandUrl = (brand: string, category?: string) =>
  `/shop?${category ? `category=${encodeURIComponent(category)}&` : ''}brand=${encodeURIComponent(brand)}`;

/** Short labels so every category fits on one row of the nav bar. */
const SHORT_LABEL: Record<string, string> = {
  'Electric Mountain Bikes': 'Mountain',
  'Commuter & City Bikes': 'Commuter & City',
  'Road & Gravel Bikes': 'Road & Gravel',
  'Folding & Compact Bikes': 'Folding',
  'Cargo & Family Bikes': 'Cargo & Family',
  'Trikes & Mobility': 'Trikes',
  'Kids & Youth': 'Kids',
  'Scooters & Motorbikes': 'Scooters & Motos',
  'Parts & Accessories': 'Parts & Accessories',
};

/** Extra quick filters shown under a category (facet links). */
const QUICK_FILTERS: Record<string, { label: string; query: string }[]> = {
  'Commuter & City Bikes': [
    { label: 'Step-through frames', query: 'frame=Step-Through' },
    { label: 'Lightweight', query: 'light=1' },
    { label: 'Bosch motor', query: 'motor=Bosch' },
  ],
  'Electric Mountain Bikes': [
    { label: 'Fat tyres', query: 'tyres=Fat' },
    { label: 'Bosch motor', query: 'motor=Bosch' },
    { label: 'Shimano motor', query: 'motor=Shimano' },
  ],
  'Folding & Compact Bikes': [{ label: 'Fat tyres', query: 'tyres=Fat' }, { label: 'Lightweight', query: 'light=1' }],
  'Cargo & Family Bikes': [{ label: 'Bosch motor', query: 'motor=Bosch' }, { label: 'Step-through frames', query: 'frame=Step-Through' }],
};

interface MenuCategory {
  category: string;
  label: string;
  description: string;
  count: number;
  subcategories: { name: string; count: number }[];
  brands: [string, number][];
  featured: Product[];
}

const useMenuData = () =>
  useMemo<MenuCategory[]>(
    () =>
      CATEGORIES_WITH_SUBCATEGORIES.map((c) => {
        const items = PRODUCTS.filter((p) => p.category === c.category);
        const brandMap = new Map<string, number>();
        items.forEach((p) => brandMap.set(p.brand ?? 'Other', (brandMap.get(p.brand ?? 'Other') ?? 0) + 1));
        const subs = c.subcategories.filter((s) => s !== 'All' && !s.startsWith('All '));
        return {
          category: c.category,
          label: SHORT_LABEL[c.category] ?? c.category,
          description: c.description,
          count: items.length,
          subcategories: subs.length > 1 ? subs.map((name) => ({ name, count: items.filter((p) => p.subcategory === name).length })) : [],
          brands: [...brandMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6),
          // in-stock, discounted first, so the menu showcases real offers
          featured: items
            .filter((p) => p.inStock && p.imageUrl)
            .sort((a, b) => Number(!!b.originalPrice) - Number(!!a.originalPrice) || b.price - a.price)
            .slice(0, 2),
        };
      }),
    []
  );

const ALL_BRANDS = (() => {
  const m = new Map<string, number>();
  PRODUCTS.forEach((p) => m.set(p.brand ?? 'Other', (m.get(p.brand ?? 'Other') ?? 0) + 1));
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
})();
const SALE_COUNT = PRODUCTS.filter((p) => p.originalPrice).length;

const money = (n: number) => '$' + n.toLocaleString('en-AU', { maximumFractionDigits: 0 });

/** Desktop category bar with hover / focus / click mega-menus. */
export const MegaNav: React.FC = () => {
  const data = useMenuData();
  const [open, setOpen] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const show = (key: string) => {
    clearTimeout(timer.current);
    setOpen(key);
  };
  const hideSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 140);
  };

  useEffect(() => setOpen(null), [location.pathname, location.search]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const trigger = (key: string, label: React.ReactNode, to: string) => (
    <div key={key} className="relative" onMouseEnter={() => show(key)} onMouseLeave={hideSoon}>
      <Link
        to={to}
        onFocus={() => show(key)}
        aria-haspopup="true"
        aria-expanded={open === key}
        className={`flex items-center gap-1 whitespace-nowrap py-3.5 text-[13px] font-medium transition-colors ${
          open === key ? 'text-white' : 'text-slate-300 hover:text-white'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open === key ? 'rotate-180 text-emerald-400' : 'text-slate-500'}`} />
      </Link>
      {open === key && <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-emerald-500" />}
    </div>
  );

  return (
    <div ref={rootRef} className="relative" onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(null)}>
      <nav aria-label="Product categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-x-5 xl:gap-x-6">
          {data.map((c) => trigger(c.category, c.label, shopUrl(c.category)))}
          {trigger('__brands', 'Brands', '/shop')}
        </div>
        <Link
          to="/shop?sale=1"
          className="hidden lg:flex items-center gap-1.5 shrink-0 rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-rose-300 hover:bg-rose-500/20 transition-colors"
        >
          <Flame className="w-3.5 h-3.5" />
          Sale ({SALE_COUNT})
        </Link>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50" onMouseEnter={() => clearTimeout(timer.current)} onMouseLeave={hideSoon}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-b-2xl border border-t-0 border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/40 p-6 max-h-[75vh] overflow-y-auto">
              {open === '__brands' ? (
                <div>
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div className="text-sm font-bold text-white">Shop by brand</div>
                      <div className="text-xs text-slate-400 mt-0.5">{ALL_BRANDS.length} brands in stock and on order</div>
                    </div>
                    <Link to="/shop" className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      View all products <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-1.5">
                    {ALL_BRANDS.map(([brand, n]) => (
                      <li key={brand}>
                        <Link to={brandUrl(brand)} className="text-[13px] text-slate-300 hover:text-emerald-400 transition-colors">
                          {brand} <span className="text-slate-500 text-xs">{n}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                data
                  .filter((c) => c.category === open)
                  .map((c) => (
                    <div key={c.category} className="grid grid-cols-12 gap-8">
                      {/* Subcategories + quick filters */}
                      <div className="col-span-4">
                        <Link to={shopUrl(c.category)} className="group inline-flex items-center gap-2 text-base font-bold text-white hover:text-emerald-400 transition-colors">
                          {c.category}
                          <span className="text-xs font-medium text-slate-500">{c.count}</span>
                        </Link>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400 max-w-xs">{c.description}</p>
                        {c.subcategories.length > 0 && (
                          <ul className="mt-4 space-y-1.5">
                            {c.subcategories.map((s) => (
                              <li key={s.name}>
                                <Link to={shopUrl(c.category, s.name)} className="flex items-center justify-between max-w-xs text-[13px] text-slate-300 hover:text-emerald-400 transition-colors">
                                  <span>{s.name}</span>
                                  <span className="text-xs text-slate-500">{s.count}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        <Link to={shopUrl(c.category)} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                          Shop all {c.label.toLowerCase()} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Brands + filters */}
                      <div className="col-span-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Popular brands</div>
                        <ul className="mt-2 space-y-1.5">
                          {c.brands.map(([brand, n]) => (
                            <li key={brand}>
                              <Link to={brandUrl(brand, c.category)} className="text-[13px] text-slate-300 hover:text-emerald-400 transition-colors">
                                {brand} <span className="text-xs text-slate-500">{n}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {QUICK_FILTERS[c.category] && (
                          <>
                            <div className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Quick filters</div>
                            <ul className="mt-2 space-y-1.5">
                              {QUICK_FILTERS[c.category].map((f) => (
                                <li key={f.label}>
                                  <Link to={`/shop?category=${encodeURIComponent(c.category)}&${f.query}`} className="text-[13px] text-slate-300 hover:text-emerald-400 transition-colors">
                                    {f.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      {/* Featured products */}
                      <div className="col-span-5">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Featured in stock</div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          {c.featured.map((p) => (
                            <Link key={p.id} to={`/product/${p.id}`} className="group rounded-xl border border-slate-700/60 bg-slate-800/40 p-3 hover:border-emerald-500/60 transition-colors">
                              <div className="aspect-4/3 overflow-hidden rounded-lg bg-white">
                                <img src={p.imageUrl} alt={p.name} loading="eager" referrerPolicy="no-referrer" className="h-full w-full object-contain" />
                              </div>
                              <div className="mt-2 line-clamp-2 text-xs font-semibold text-slate-100 group-hover:text-emerald-300">{p.name}</div>
                              <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-sm font-bold text-white">{money(p.price)}</span>
                                {p.originalPrice && <span className="text-xs text-slate-500 line-through">{money(p.originalPrice)}</span>}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Mobile: accordion of categories and subcategories. */
export const MobileCategoryList: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const data = useMenuData();
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <div className="divide-y divide-slate-800">
      {data.map((c) => (
        <div key={c.category}>
          <button
            type="button"
            aria-expanded={openKey === c.category}
            onClick={() => setOpenKey(openKey === c.category ? null : c.category)}
            className="flex w-full items-center justify-between px-1 py-3 text-left text-sm font-semibold text-slate-100 cursor-pointer"
          >
            <span>
              {c.category} <span className="text-xs font-normal text-slate-500">{c.count}</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openKey === c.category ? 'rotate-180' : ''}`} />
          </button>
          {openKey === c.category && (
            <ul className="pb-3 pl-3 space-y-1.5">
              <li>
                <Link to={shopUrl(c.category)} onClick={onNavigate} className="text-sm font-semibold text-emerald-400">
                  Shop all {c.label.toLowerCase()}
                </Link>
              </li>
              {c.subcategories.map((s) => (
                <li key={s.name}>
                  <Link to={shopUrl(c.category, s.name)} onClick={onNavigate} className="flex justify-between text-sm text-slate-300">
                    <span>{s.name}</span>
                    <span className="text-xs text-slate-500">{s.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      <div>
        <button
          type="button"
          aria-expanded={openKey === '__brands'}
          onClick={() => setOpenKey(openKey === '__brands' ? null : '__brands')}
          className="flex w-full items-center justify-between px-1 py-3 text-left text-sm font-semibold text-slate-100 cursor-pointer"
        >
          <span>Brands</span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openKey === '__brands' ? 'rotate-180' : ''}`} />
        </button>
        {openKey === '__brands' && (
          <ul className="pb-3 pl-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
            {ALL_BRANDS.map(([brand, n]) => (
              <li key={brand}>
                <Link to={brandUrl(brand)} onClick={onNavigate} className="text-sm text-slate-300">
                  {brand} <span className="text-xs text-slate-500">{n}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export { SALE_COUNT };
