import { categoryPath } from '../data/seo';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { loadDetails, mergeDetail } from '../data/catalogue';
import type { ProductDetail } from '../data/products-detail';
import { VariantPicker } from '../components/VariantPicker';
import { hasVariants, defaultSelection, findVariant } from '../data/variants';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { ReviewsSection } from '../components/ReviewsSection';
import { ArrowLeft, Check, ShieldCheck, Truck, Zap, ShoppingBag, ArrowRight } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'shipping'>('specs');

  // The light record renders immediately; description, features, photos and variants arrive from their own chunk.
  const [detail, setDetail] = useState<Record<string, ProductDetail> | null>(null);
  useEffect(() => { loadDetails().then(setDetail); }, []);
  const lightProduct = PRODUCTS.find((p) => p.id === productId);
  const baseProduct = lightProduct && mergeDetail(lightProduct, detail ?? undefined);
  const [selection, setSelection] = useState<string[]>(() => (baseProduct ? defaultSelection(baseProduct) : []));
  useEffect(() => {
    setSelection(baseProduct ? defaultSelection(baseProduct) : []);
    setQuantity(1);
  }, [productId]);
  // Once the variants have loaded, open on the first purchasable one.
  useEffect(() => {
    if (detail && lightProduct) setSelection(defaultSelection(mergeDetail(lightProduct, detail)));
  }, [detail, productId]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  useEffect(() => setActiveImage(null), [productId, selection.join('|')]);
  const variant = baseProduct ? findVariant(baseProduct, selection) : undefined;
  // Price, image and stock follow the selected variant
  const product = baseProduct && variant
    ? { ...baseProduct, price: variant.price > 0 ? variant.price : baseProduct.price, originalPrice: variant.compareAtPrice, imageUrl: variant.image ?? baseProduct.imageUrl, inStock: variant.available }
    : baseProduct;

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="text-sm text-slate-500 mt-2">The electric bike you are looking for is not in our active catalog.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shop</span>
        </Link>
      </div>
    );
  }

  const cryptoPrice = Math.round(product.price * 0.9);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(baseProduct!, quantity, variant);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-900">Shop</Link>
        <span>/</span>
        <Link to={categoryPath(product.category)} className="hover:text-slate-900">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-900 truncate font-semibold">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Stage & Trust Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
            <ProductImage
              eager
              width={700}
              key={activeImage ?? product.imageUrl}
              src={activeImage ?? product.imageUrl}
              alt={product.name}
              category={product.category}
              className="w-full h-full"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1 rounded tracking-wide uppercase">
                {product.badge}
              </div>
            )}
          </div>

          {/* Gallery thumbnails */}
          {baseProduct && baseProduct.images && baseProduct.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Product photos">
              {baseProduct.images.map((src, i) => {
                const active = (activeImage ?? product.imageUrl) === src;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label={'Show photo ' + (i + 1)}
                    aria-pressed={active}
                    className={`relative w-20 h-16 shrink-0 rounded-lg overflow-hidden border-2 bg-slate-100 cursor-pointer transition-colors ${active ? 'border-emerald-600' : 'border-slate-200 hover:border-slate-400'}`}
                  >
                    <img src={src.replace('width=900', 'width=240')} alt="" loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Quick Value Props Strip */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Free AU Freight</span>
              </div>
              <p className="text-[11px] text-slate-500">Tracked door-to-door delivery</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2-Year Warranty</span>
              </div>
              <p className="text-[11px] text-slate-500">Local Australian replacement parts</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>10% Crypto/Osko</span>
              </div>
              <p className="text-[11px] text-slate-500">Save ${(product.price - cryptoPrice).toLocaleString()} instantly</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col">
          
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span>{product.category}</span>
            <span>·</span>
            <span>{product.subcategory}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-6 leading-relaxed">
            {product.description || 'Loading product details…'}
          </p>

          {/* Price Box */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-slate-950 font-mono tabular-nums">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through font-mono tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">AUD (Inc. GST)</span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                <span>Pay with Crypto or Osko (10% off)</span>
              </div>
              <span className="font-mono font-bold text-sm text-emerald-950 tabular-nums">
                ${cryptoPrice.toLocaleString()} AUD
              </span>
            </div>
          </div>

          {/* Tabs for Specs / Features / Shipping */}
          <div className="flex border-b border-slate-200 mb-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'specs'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Full Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'features'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Key Features
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2.5 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'shipping'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Delivery & Assembly
            </button>
          </div>

          <div className="mb-6 max-h-52 overflow-y-auto text-xs text-slate-700">
            {activeTab === 'specs' && !product.specs && (
  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
    {Object.entries(product.details ?? {}).map(([label, value]) => (
      <div key={label} className="flex justify-between py-1 border-b border-slate-100">
        <span className="text-slate-500">{label}</span>
        <span className="font-semibold text-slate-900 text-right">{value}</span>
      </div>
    ))}
  </div>
)}
{activeTab === 'specs' && product.specs && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Motor</span>
                  <span className="font-semibold text-slate-900">{product.specs.motor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Battery</span>
                  <span className="font-semibold text-slate-900">{product.specs.battery}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Range</span>
                  <span className="font-semibold text-slate-900">{product.specs.range}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Top Speed</span>
                  <span className="font-semibold text-slate-900">{product.specs.topSpeed}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Brakes</span>
                  <span className="font-semibold text-slate-900">{product.specs.brakes}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Gearing</span>
                  <span className="font-semibold text-slate-900">{product.specs.gears}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Weight</span>
                  <span className="font-semibold text-slate-900">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Max Load</span>
                  <span className="font-semibold text-slate-900">{product.specs.maxLoad}</span>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <ul className="space-y-2">
                {product.keyFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-2 text-slate-600 leading-relaxed">
                <p><strong>Shipping:</strong> 100% Free Nationwide Freight across Australia.</p>
                <p><strong>Timeframe:</strong> Metro 2–4 days, Regional 3–6 business days.</p>
                <p><strong>Assembly:</strong> 90% pre-assembled in box. Easy 20-minute setup with included toolkit.</p>
              </div>
            )}
          </div>

          {/* Variant picker */}
          {baseProduct && hasVariants(baseProduct) && (
            <div className="pb-4">
              <VariantPicker product={baseProduct} selection={selection} onChange={setSelection} />
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-200 mt-auto">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-300 rounded-lg">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 font-mono font-bold text-slate-900 text-sm">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              <button
                disabled={!product.inStock}
                onClick={() => addToCart(baseProduct!, quantity, variant)}
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.inStock ? `Add to Cart · $${(product.price * quantity).toLocaleString()}` : 'Sold Out'}</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <span>Instant Checkout Form (Save 10% with Crypto/Osko)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-slate-500">
              Questions about this bike?{' '}
              <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="font-semibold text-emerald-700 hover:underline">
                Ask our team
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              More {product.category}
            </h2>
            <Link
              to={categoryPath(product.category)}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              View Category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

      {/* Customer Reviews for this bike and Australian experience */}
      <div className="mt-16 pt-12 border-t border-slate-200">
        <ReviewsSection limit={6} />
      </div>

    </div>
  );
};
