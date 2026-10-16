import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface ShopCatalogProps {
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (cat: ProductCategory | 'All') => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ShopCatalog: React.FC<ShopCatalogProps> = ({
  selectedCategory,
  onCategoryChange,
  onQuickView,
  onAddToCart
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Find subcategories for the selected category
  const activeCategoryMeta = useMemo(() => {
    if (selectedCategory === 'All') return null;
    return CATEGORIES_WITH_SUBCATEGORIES.find(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const handleCategorySelect = (cat: ProductCategory | 'All') => {
    onCategoryChange(cat);
    setSelectedSubcategory('All');
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'All' && item.subcategory !== selectedSubcategory) {
        return false;
      }
      // Search query
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
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured order in array
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy]);

  return (
    <section id="shop-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Section Title & Subheading */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
              Direct Australian Warehouse Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Explore E-Bikes for Sale
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Quality electric bicycles with free nationwide delivery across Australia. Save an extra 10% on your entire order with Crypto, Australian Bank Transfer, or Osko.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search e-bikes, motors, specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Level 1: Category Filter Buttons (Functional Segmented Control) */}
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

        {/* Level 2: Subcategory Navigation (Category -> Subcategory Hierarchy) */}
        {activeCategoryMeta && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-xs font-medium text-slate-400 shrink-0">Subcategory:</span>
            {activeCategoryMeta.subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(subcat)}
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

        {/* Sort & Results Bar */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> products in stock
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm font-semibold text-slate-700">No electric bicycles match your criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search or selecting a different category.</p>
          <button
            onClick={() => {
              handleCategorySelect('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </section>
  );
};
