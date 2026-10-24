import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductImage } from '../components/ProductImage';
import { Trash2, ArrowRight, ShieldCheck, Zap, Truck, ArrowLeft } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, cryptoDiscount, discountedTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-6">
          <svg className="w-10 h-10 stroke-current fill-none" viewBox="0 0 24 24">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Explore our range of electric mountain bikes, commuter bikes, and folding e-bikes to begin.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All E-Bikes</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Cart items list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {cart.map((item) => (
              <div key={item.lineId} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <ProductImage
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    category={item.product.category}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <div className="text-xs text-slate-500 font-medium">
                    {item.product.category} · {item.variantTitle ?? item.product.subcategory}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    <Link to={`/product/${item.product.id}`} className="hover:text-emerald-700">
                      {item.product.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {item.product.tagline}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mt-4">
                    <div className="flex items-center border border-slate-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-base font-extrabold text-slate-950 font-mono tabular-nums">
                        ${(item.product.price * item.quantity).toLocaleString()} AUD
                      </span>

                      <button
                        onClick={() => removeFromCart(item.lineId)}
                        className="text-slate-400 hover:text-red-600 p-1.5 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <span className="flex items-center gap-2 font-semibold">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Free Insured Delivery Across Australia</span>
            </span>
            <span className="font-bold uppercase text-emerald-800">Included</span>
          </div>
        </div>

        {/* Order Summary & Proceed */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                ${subtotal.toLocaleString()} AUD
              </span>
            </div>

            <div className="flex justify-between text-slate-600">
              <span>Nationwide Freight</span>
              <span className="font-bold text-emerald-700">FREE</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                  <span>10% Crypto/Osko Discount</span>
                </span>
                <span className="font-mono tabular-nums">-${cryptoDiscount.toLocaleString()}</span>
              </div>
              <div className="text-[11px] text-emerald-700">
                Calculated automatically when choosing Crypto, Bank Transfer, or Osko.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-slate-900">Total with 10% Off:</span>
              <span className="font-mono font-extrabold text-xl text-emerald-700 tabular-nums">
                ${discountedTotal.toLocaleString()} AUD
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm active:scale-98"
          >
            <span>Proceed to Order Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Australian Warranty</span>
            </span>
            <span>·</span>
            <span>30-Day Returns</span>
          </div>
        </div>

      </div>
    </div>
  );
};
