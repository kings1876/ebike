import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  BRAND_OPTIONS, MOTOR_OPTIONS, FRAME_OPTIONS, TYRE_OPTIONS, SUSPENSION_OPTIONS, USE_OPTIONS,
  BIKE_PRICE_BANDS, PARTS_PRICE_BANDS, EMPTY_FACETS, FacetSelection, matchesFacets,
  facetsFromParams, facetsToParams, activeFacetCount, resolveLegacy, isPartsCategory,
} from '../data/taxonomy';

const PAGE_SIZE = 12;

type Sort = 'featured' | 'price-asc' | 'price-desc';
type Option = { value: string; label: string };

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Everything lives in the URL; old category links are translated to the new taxonomy.
  const view = useMemo(() => {
    const legacy = resolveLegacy(searchParams.get('category') || 'All', searchParams.get('subcat') || 'All', facetsFromParams(searchParams));
    return {
      category: legacy.category,
      subcat: legacy.subcat,
      facets: legacy.facets,
      query: searchParams.get('q') || '',
      sort: (searchParams.get('sort') as Sort) || 'featured',
      page: Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1),
    };
  }, [searchParams]);

  const [searchText, setSearchText] = useState(view.query);
  useEffect(() => setSearchText(view.query), [view.query]);

  // Writing the view back to the URL drops ?page, so any change returns to page 1.
  const update = (patch: Partial<{ category: string; subcat: string; query: string; sort: Sort; facets: FacetSelection }>) => {
    const next = { ...view, ...patch };
    const params: Record<string, string> = {};
    if (next.category !== 'All') params.category = next.category;
    if (next.subcat !== 'All') params.subcat = next.subcat;
    if (next.query.trim()) params.q = next.query.trim();
    if (next.sort !== 'featured') params.sort = next.sort;
    facetsToParams(next.facets, params);
    setSearchParams(params);
  };

  const setFacet = (patch: Partial<FacetSelection>) => update({ facets: { ...view.facets, ...patch } });
  const selectCategory = (category: string) => update({ category, subcat: 'All' });

  const handlePageChange = (next: number) => {
    const params = new URLSearchParams(searchParams);
    if (next <= 1) params.delete('page');
    else params.set('page', String(next));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryMeta = view.category === 'All' ? null : CATEGORIES_WITH_SUBCATEGORIES.find(c => c.category === view.category);
  const partsView = isPartsCategory(view.category);

  const filtered = useMemo(() => {
    const q = view.query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (view.category !== 'All' && p.category !== view.category) return false;
      if (view.subcat !== 'All' && p.subcategory !== view.subcat) return false;
      if (q) {
        const hay = [p.name, p.brand, p.description, p.subcategory, p.category, p.details?.['Motor System']].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return matchesFacets(p, view.facets);
    }).sort((a, b) => {
      if (view.sort === 'price-asc') return a.price - b.price;
      if (view.sort === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [view]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(view.page, totalPages);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageProducts = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const priceOptions: Option[] = (partsView ? PARTS_PRICE_BANDS : BIKE_PRICE_BANDS).map(b => ({ value: b.label, label: b.label }));
  const selects: [keyof FacetSelection, string, Option[], boolean][] = [
    ['brand', 'Brand', BRAND_OPTIONS, true],
    ['motor', 'Motor', MOTOR_OPTIONS, !partsView],
    ['frame', 'Frame', FRAME_OPTIONS, !partsView],
    ['tyres', 'Tyres', TYRE_OPTIONS, !partsView],
    ['suspension', 'Suspension', SUSPENSION_OPTIONS, view.category === 'All' || view.category === 'Electric Mountain Bikes'],
    ['use', 'Best for', USE_OPTIONS, !partsView],
    ['price', 'Price', priceOptions, true],
  ];
  const activeCount = activeFacetCount(view.facets);

  const pill = (active: boolean, size: 'lg' | 'sm') =>
    `${size === 'lg' ? 'px-4 py-2 text-xs font-semibold rounded-lg' : 'px-3 py-1.5 text-xs font-medium rounded-md'} transition-colors cursor-pointer whitespace-nowrap ${
      active
        ? size === 'lg' ? 'bg-slate-900 text-white shadow-xs' : 'bg-emerald-600 text-white'
        : size === 'lg' ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Title & Search Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
              Electric Bikes Superstore Range
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              {categoryMeta ? categoryMeta.category : 'E-Bikes for Sale in Australia'}
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              {categoryMeta
                ? categoryMeta.description
                : '100% Free nationwide shipping on all electric bicycles. Save an additional 10% instantly on all orders with Crypto, Australian Bank Transfer, or Osko.'}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search bikes, brands, motors..."
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value); update({ query: e.target.value }); }}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Level 1: categories */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button onClick={() => selectCategory('All')} className={pill(view.category === 'All', 'lg')}>
            All Products ({PRODUCTS.length})
          </button>
          {CATEGORIES_WITH_SUBCATEGORIES.map((cat) => (
            <button key={cat.category} onClick={() => selectCategory(cat.category)} className={pill(view.category === cat.category, 'lg')}>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Level 2: subcategories */}
        {categoryMeta && categoryMeta.subcategories.length > 2 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-medium text-slate-400 shrink-0">Subcategory:</span>
            {categoryMeta.subcategories.map((subcat) => (
              <button key={subcat} onClick={() => update({ subcat })} className={pill(view.subcat === subcat, 'sm')}>
                {subcat}
              </button>
            ))}
          </div>
        )}

        {/* Facets: brand, motor, frame, tyres, suspension, use, price, stock and sale */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {selects.filter(([, , , show]) => show).map(([key, label, options]) => (
            <label key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
              {label}
              <select
                value={view.facets[key] as string}
                onChange={(e) => setFacet({ [key]: e.target.value })}
                className="bg-white border border-slate-200 rounded-md py-1 px-2 text-xs text-slate-700 max-w-[11rem] focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="All">All</option>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          ))}
          {([
            ['lightweight', 'Lightweight', !partsView],
            ['inStock', 'In stock only', true],
            ['sale', 'On sale', true],
          ] as const).filter(([, , show]) => show).map(([key, label]) => (
            <label key={key} className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={view.facets[key]}
                onChange={(e) => setFacet({ [key]: e.target.checked })}
                className="accent-emerald-600"
              />
              {label}
            </label>
          ))}
          {activeCount > 0 && (
            <button onClick={() => setFacet(EMPTY_FACETS)} className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer">
              Clear filters
            </button>
          )}
        </div>

        {/* Sort & Count Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filtered.length === 0 ? 0 : pageStart + 1}-{Math.min(pageStart + PAGE_SIZE, filtered.length)}</span> of <span className="font-bold text-slate-800">{filtered.length}</span> products
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Sort:</span>
            <select
              value={view.sort}
              onChange={(e) => update({ sort: e.target.value as Sort })}
              className="bg-white border border-slate-200 rounded-md py-1 px-2.5 text-xs text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              <option value="featured">Featured Collection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pageProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No products match your criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search or selecting a different category.</p>
          <button
            onClick={() => { setSearchText(''); setSearchParams({}); }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
