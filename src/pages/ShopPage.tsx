import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  BRANDS, MOTOR_SYSTEMS, PRICE_BANDS, EMPTY_FACETS, matchesFacets, FacetSelection,
} from '../data/taxonomy';

const PAGE_SIZE = 12;

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial from URL query params
  const categoryParam = searchParams.get('category') || 'All';
  const subcategoryParam = searchParams.get('subcat') || 'All';
  const searchParam = searchParams.get('q') || '';
  const sortParam = (searchParams.get('sort') as 'featured' | 'price-asc' | 'price-desc') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(
    categoryParam as ProductCategory | 'All'
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>(sortParam);

  const facetsFromUrl = (): FacetSelection => ({
    brand: searchParams.get('brand') || 'All',
    motor: searchParams.get('motor') || 'All',
    price: searchParams.get('price') || 'All',
    inStock: searchParams.get('instock') === '1',
  });
  const [facets, setFacets] = useState<FacetSelection>(facetsFromUrl);

  // Sync state if URL changes
  useEffect(() => {
    setSelectedCategory((searchParams.get('category') as ProductCategory) || 'All');
    setSelectedSubcategory(searchParams.get('subcat') || 'All');
    setSearchQuery(searchParams.get('q') || '');
    setSortBy((searchParams.get('sort') as any) || 'featured');
    setFacets(facetsFromUrl());
  }, [searchParams]);

  const updateUrl = (cat: string, subcat: string, query: string, sort: string, f: FacetSelection = facets) => {
    const params: Record<string, string> = {};
    if (cat !== 'All') params.category = cat;
    if (subcat !== 'All') params.subcat = subcat;
    if (query.trim()) params.q = query.trim();
    if (sort !== 'featured') params.sort = sort;
    if (f.brand !== 'All') params.brand = f.brand;
    if (f.motor !== 'All') params.motor = f.motor;
    if (f.price !== 'All') params.price = f.price;
    if (f.inStock) params.instock = '1';
    setSearchParams(params);
  };

  const handleFacetChange = (patch: Partial<FacetSelection>) => {
    const next = { ...facets, ...patch };
    setFacets(next);
    updateUrl(selectedCategory, selectedSubcategory, searchQuery, sortBy, next);
  };

  // Page lives in the URL (?page=N). updateUrl() rebuilds the params without it,
  // so changing any filter, search or sort naturally returns to page 1.
  const requestedPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  const handlePageChange = (next: number) => {
    const params = new URLSearchParams(searchParams);
    if (next <= 1) params.delete('page');
    else params.set('page', String(next));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeFacetCount = Object.entries(facets).filter(([k, v]) => (k === 'inStock' ? v : v !== 'All')).length;

  const handleCategorySelect = (cat: ProductCategory | 'All') => {
    setSelectedCategory(cat);
    setSelectedSubcategory('All');
    updateUrl(cat, 'All', searchQuery, sortBy);
  };

  const handleSubcategorySelect = (subcat: string) => {
    setSelectedSubcategory(subcat);
    updateUrl(selectedCategory, subcat, searchQuery, sortBy);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    updateUrl(selectedCategory, selectedSubcategory, query, sortBy);
  };

  const handleSortChange = (sort: 'featured' | 'price-asc' | 'price-desc') => {
    setSortBy(sort);
    updateUrl(selectedCategory, selectedSubcategory, searchQuery, sort);
  };

  const activeCategoryMeta = useMemo(() => {
    if (selectedCategory === 'All') return null;
    return CATEGORIES_WITH_SUBCATEGORIES.find(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedSubcategory !== 'All' && item.subcategory !== selectedSubcategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSubcat = item.subcategory.toLowerCase().includes(query);
        const matchesMotor = (item.specs?.motor ?? '').toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSubcat && !matchesMotor) {
          return false;
        }
      }
      return matchesFacets(item, facets);
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, facets]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageProducts = filteredProducts.slice(pageStart, pageStart + PAGE_SIZE);

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
              E-Bikes for Sale in Australia
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              100% Free nationwide shipping on all electric bicycles. Save an additional 10% instantly on all orders with Crypto, Australian Bank Transfer, or Osko.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search e-bikes, motors, specs..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Level 1: Category Filter Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => handleCategorySelect('All')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>

          {CATEGORIES_WITH_SUBCATEGORIES.map((cat) => (
            <button
              key={cat.category}
              onClick={() => handleCategorySelect(cat.category)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.category
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Level 2: Subcategory Navigation */}
        {activeCategoryMeta && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-medium text-slate-400 shrink-0">Subcategory:</span>
            {activeCategoryMeta.subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => handleSubcategorySelect(subcat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSubcategory === subcat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>
        )}

        {/* Facets: cross-cutting filters (use, motor, price, condition, road-legal) */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          {([
            ['brand', 'Brand', BRANDS],
            ['motor', 'Motor', MOTOR_SYSTEMS],
            ['price', 'Price', PRICE_BANDS.map(b => b.label)],
          ] as const).map(([key, label, options]) => (
            <label key={key} className="flex items-center gap-1.5 text-xs text-slate-500">
              {label}
              <select
                value={facets[key]}
                onChange={(e) => handleFacetChange({ [key]: e.target.value })}
                className="bg-white border border-slate-200 rounded-md py-1 px-2 text-xs text-slate-700 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value="All">All</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
          ))}
          <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={facets.inStock}
              onChange={(e) => handleFacetChange({ inStock: e.target.checked })}
              className="accent-emerald-600"
            />
            In stock only
          </label>
          {activeFacetCount > 0 && (
            <button
              onClick={() => handleFacetChange(EMPTY_FACETS)}
              className="text-xs font-medium text-emerald-700 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Sort & Count Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredProducts.length === 0 ? 0 : pageStart + 1}-{Math.min(pageStart + PAGE_SIZE, filteredProducts.length)}</span> of <span className="font-bold text-slate-800">{filteredProducts.length}</span> products
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as any)}
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
      {filteredProducts.length > 0 ? (
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
          <p className="text-sm font-semibold text-slate-700">No electric bicycles match your criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search or selecting a different category.</p>
          <button
            onClick={() => { setFacets(EMPTY_FACETS); setSelectedCategory('All'); setSelectedSubcategory('All'); setSearchQuery(''); setSearchParams({}); }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
