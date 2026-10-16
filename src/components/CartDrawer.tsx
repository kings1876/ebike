import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ProductImage } from './ProductImage';
import { X, Trash2, ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    cryptoDiscount,
    discountedTotal
  } = useCart();

  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Order Cart</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length > 1 ? 's' : ''} in cart`}
              </p>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
                  <svg className="w-8 h-8 stroke-current fill-none" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Browse our range of electric mountain bikes, commuter bikes, and folding e-bikes to begin.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/shop');
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.lineId}
                  className="flex gap-4 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50"
                >
                  <Link
                    to={`/product/${item.product.id}`}
                    onClick={closeCartDrawer}
                    className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200 block"
                  >
                    <ProductImage
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        <Link to={`/product/${item.product.id}`} onClick={closeCartDrawer}>
                          {item.product.name}
                        </Link>
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.lineId)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {item.variantTitle ? item.variantTitle : item.product.subcategory}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-300 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-900 font-mono tabular-nums">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Nationwide AU Shipping</span>
                </span>
                <span className="font-bold text-emerald-700 uppercase">FREE</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Standard Subtotal</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">
                  ${subtotal.toLocaleString()} USD
                </span>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                    <span>Pay with Crypto or Osko (10% OFF)</span>
                  </span>
                  <span className="font-mono tabular-nums">-${cryptoDiscount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-700 mt-1 font-semibold pt-1 border-t border-emerald-200/60">
                  <span>Discounted Total</span>
                  <span className="font-mono font-bold text-sm tabular-nums text-emerald-950">
                    ${discountedTotal.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/cart');
                  }}
                  className="py-3 px-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xl transition-all text-xs text-center cursor-pointer"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    closeCartDrawer();
                    navigate('/checkout');
                  }}
                  className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-md text-xs active:scale-98"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Australian Warranty</span>
                </span>
                <span>·</span>
                <span>Direct Order Desk</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
