import React, { useState } from 'react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { X, Check, Shield, Truck, Zap, ShoppingBag } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'shipping'>('specs');

  if (!product) return null;

  const cryptoPrice = Math.round(product.price * 0.9);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden border border-slate-200">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{product.category}</span>
            <span>/</span>
            <span className="font-semibold text-slate-800">{product.subcategory}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Column: Visual & Guarantee */}
          <div className="space-y-4">
            <div className="aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ProductImage
                src={product.imageUrl}
                alt={product.name}
                category={product.category}
                className="w-full h-full"
              />
            </div>

            {/* Quick Guarantees Strip */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free Insured Freight Across Australia</span>
              </div>
              {product.warranty && (
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{product.warranty}</span>
              </div>
              )}
              <div className="flex items-center gap-2 text-slate-800 font-semibold">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10% Instant Cash Discount for Crypto / Osko</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Specs Tabs & Purchase Module */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h2>
            <p className="text-sm text-slate-600 mt-2 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-950 font-mono tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through font-mono tabular-nums">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-medium">AUD (Tax Inclusive / Inc. GST)</span>
              </div>
              
              <div className="mt-2 text-xs text-emerald-800 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Pay only ${cryptoPrice.toLocaleString()} via Crypto, Bank Transfer, or Osko (Save ${(product.price - cryptoPrice).toLocaleString()})</span>
              </div>
            </div>

            {/* Tab navigation */}
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

            {/* Tab Content */}
            <div className="flex-1 mb-6 overflow-y-auto max-h-48 text-xs text-slate-700">
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
                    <span className="font-semibold text-slate-900 text-right">{product.specs.motor}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Battery</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.battery}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Range</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.range}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Top Speed</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.topSpeed}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Brakes</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.brakes}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Gearing</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.gears}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Weight</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.weight}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Max Payload</span>
                    <span className="font-semibold text-slate-900 text-right">{product.specs.maxLoad}</span>
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
                  <p><strong>Shipping:</strong> 100% Free Nationwide Freight across all Australian states (NSW, VIC, QLD, WA, SA, TAS, ACT, NT).</p>
                  <p><strong>Timeframe:</strong> Metro 2–4 days, Regional 3–6 days. Fully tracked with SMS dispatch notifications.</p>
                  <p><strong>Assembly:</strong> 90% pre-assembled. Attach front wheel, handlebars, and pedals with included multi-tool kit.</p>
                </div>
              )}
            </div>

            {/* Sticky Action Module */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-4 mt-auto">
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
                onClick={handleAdd}
                className="flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order · ${(product.price * quantity).toLocaleString()}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
