import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { loadDetails } from '../data/catalogue';
import type { ProductDetail } from '../data/products-detail';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  BRAND_OPTIONS, MOTOR_OPTIONS, FRAME_OPTIONS, TYRE_OPTIONS, SUSPENSION_OPTIONS, USE_OPTIONS,
  BIKE_PRICE_BANDS, PARTS_PRICE_BANDS, EMPTY_FACETS, FacetSelection, matchesFacets,
  facetsFromParams, facetsToParams, activeFacetCount, resolveLegacy, isPartsCategory,
} from '../data/taxonomy';

import { EXTRA } from '../data/seo-content';
import { CATEGORY_SEO, categoryFromSlug, collectionFromSlug, categoryPath, categorySlug } from '../data/seo';

const PAGE_SIZE = 12;

type Sort = 'featured' | 'price-asc' | 'price-desc';
type Option = { value: string; label: string };

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Clean URLs: /shop/<category-slug> or /shop/<collection-slug> (cheap, fat tyre, step-through...).
  const slugCategory = categoryFromSlug(slug);
  const collection = collectionFromSlug(slug);
  const base = slugCategory
    ? { category: slugCategory, facets: {} as Partial<FacetSelection> }
    : collection
      ? { category: collection.category ?? 'All', facets: (collection.facets ?? {}) as Partial<FacetSelection> }
      : null;
  const copy = slugCategory ? CATEGORY_SEO[slugCategory] : collection;
  const defaultSort: Sort = collection?.sort ?? 'featured';

  // Old /shop?category=... links redirect to the clean URL.
  useEffect(() => {
    if (slug) {
      if (!base) navigate('/shop', { replace: true });
      return;
    }
    const raw = searchParams.get('category');
    if (!raw || raw === 'All') return;
    const r = resolveLegacy(raw, searchParams.get('subcat') || 'All', facetsFromParams(searchParams));
    if (!categorySlug(r.category)) return;
    const params: Record<string, string> = {};
    if (r.subcat !== 'All') params.subcat = r.subcat;
    if (searchParams.get('q')) params.q = searchParams.get('q')!;
    if (searchParams.get('sort')) params.sort = searchParams.get('sort')!;
    facetsToParams(r.facets, params);
    navigate({ pathname: categoryPath(r.category), search: new URLSearchParams(params).toString() }, { replace: true });
  }, [slug, searchParams]);

  // Everything else lives in the URL query.
  const view = useMemo(() => {
    const legacy = resolveLegacy(base ? base.category : searchParams.get('category') || 'All', searchParams.get('subcat') || 'All', { ...facetsFromParams(searchParams), ...base?.facets });
    return {
      category: legacy.category,
      subcat: legacy.subcat,
      facets: legacy.facets,
      query: searchParams.get('q') || '',
      sort: (searchParams.get('sort') as Sort) || defaultSort,
      page: Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1),
    };
  }, [searchParams, slug]);

  // Product descriptions are only needed to search the shop, so they load when a search is typed.
  const [searchDetails, setSearchDetails] = useState<Record<string, ProductDetail> | null>(null);
  useEffect(() => { if (view.query && !searchDetails) loadDetails().then(setSearchDetails); }, [view.query]);

  const [searchText, setSearchText] = useState(view.query);
  useEffect(() => setSearchText(view.query), [view.query]);

  // Writing the view back to the URL drops ?page, so any change returns to page 1.
  const update = (patch: Partial<{ category: string; subcat: string; query: string; sort: Sort; facets: FacetSelection }>) => {
    const next = { ...view, ...patch };
    const categoryChanged = patch.category !== undefined && patch.category !== view.category;
    const lockedChanged = !!(base && patch.facets && Object.entries(base.facets).some(([k, v]) => (patch.facets as any)[k] !== v));
    const inSlug = !!base && !categoryChanged && !lockedChanged;
    const params: Record<string, string> = {};
    if (!inSlug && !categoryChanged && next.category !== 'All') params.category = next.category;
    if (next.subcat !== 'All') params.subcat = next.subcat;
    if (next.query.trim()) params.q = next.query.trim();
    if (next.sort !== (inSlug ? defaultSort : 'featured')) params.sort = next.sort;
    const facets = inSlug && base ? { ...next.facets, ...Object.fromEntries(Object.keys(base.facets).map((k) => [k, 'All'])) } : next.facets;
    facetsToParams(facets as FacetSelection, params);
    const search = new URLSearchParams(params).toString();
    if (categoryChanged) navigate({ pathname: next.category === 'All' ? '/shop' : categoryPath(next.category), search });
    else if (base && !inSlug) navigate({ pathname: '/shop', search });
    else setSearchParams(params);
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
      if (collection?.excludeCategories?.includes(p.category)) return false;
      if (collection?.subcategory && p.subcategory !== collection.subcategory) return false;
      if (view.subcat !== 'All' && p.subcategory !== view.subcat) return false;
      if (q) {
        const hay = [p.name, p.brand, searchDetails?.[p.id]?.description, p.subcategory, p.category, p.details?.['Motor System']].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return matchesFacets(p, view.facets);
    }).sort((a, b) => {
      if (view.sort === 'price-asc') return a.price - b.price;
      if (view.sort === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [view, collection, searchDetails]);

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
              E Bikes for Sale
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              {copy ? copy.h1 : categoryMeta ? categoryMeta.category : 'E-Bikes for Sale in Australia'}
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              {copy
                ? copy.intro[0]
                : categoryMeta
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
            <span className="text-xs font-medium text-slate-500 shrink-0">Subcategory:</span>
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
              aria-label="Sort products"
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
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pageProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
          <details className="mt-8 rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <summary className="cursor-pointer font-semibold text-slate-800">Browse all {filtered.length} products in this list</summary>
            <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <li key={p.id}><Link to={`/product/${p.id}`} className="text-slate-600 hover:text-emerald-700 hover:underline">{p.name}</Link></li>
              ))}
            </ul>
          </details>
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

      {copy && (
        <div className="mt-12 max-w-3xl space-y-8 text-sm text-slate-600">
          {copy.intro.length > 1 && <div className="space-y-3">{copy.intro.slice(1).map((t) => <p key={t}>{t}</p>)}</div>}
          {slug && EXTRA[slug]?.sections.map((sec) => (
            <section key={sec.h2}>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{sec.h2}</h2>
              <div className="space-y-3">{sec.body.map((t) => <p key={t}>{t}</p>)}</div>
            </section>
          ))}
          {slug && EXTRA[slug] && EXTRA[slug].faq.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Frequently asked questions</h2>
              <dl className="space-y-4">
                {EXTRA[slug].faq.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-slate-900">{f.q}</dt>
                    <dd className="mt-1">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
      )}

    </div>
  );
};
