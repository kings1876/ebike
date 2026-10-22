import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { OrderFormData, PaymentMethod } from '../types';
import { newOrderRef } from '../../shared/payment.js';
import { CheckCircle, Zap, Truck, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, cryptoDiscount, discountedTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'NSW',
    postcode: '',
    paymentMethod: 'Crypto',
    notes: '',
    discountCode: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');

  const australianStates = [
    { code: 'NSW', name: 'New South Wales' },
    { code: 'VIC', name: 'Victoria' },
    { code: 'QLD', name: 'Queensland' },
    { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' },
    { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' },
    { code: 'NT', name: 'Northern Territory' }
  ];

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Your Cart is Empty</h1>
        <p className="text-sm text-slate-500 mt-2">Add an electric bicycle to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All E-Bikes</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const generatedOrderId = newOrderRef();
    setOrderId(generatedOrderId);
    setSubmitError('');

    const payload = {
      formName: 'order',
      website: '',
      orderNumber: generatedOrderId,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      address: `${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.state} ${formData.postcode}, Australia`,
      paymentMethod: formData.paymentMethod,
      notes: formData.notes || '',
      amountDue: discountedTotal,
      items: cart.map((item) => ({
        name: item.product.name,
        variant: item.variantTitle || '',
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setOrderComplete(true);
      clearCart();
    } catch {
      setSubmitError('We could not register your order just now. Please try again, or email sales@ebikesale.com.au with your cart.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      
      {!orderComplete ? (
        <div>
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900">E-Bike Order Checkout</h1>
            <p className="text-sm text-slate-500 mt-1">
              Direct-to-rider delivery anywhere in Australia. 10% instant discount applied for Crypto, Australian Bank Transfer & Osko.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Delivery Info & Payment Selection */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Section 1: Address */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">1</span>
                  <span>Australian Delivery Address</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Liam Henderson"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Email Address (Order Confirmation) *</label>
                    <input
                      required
                      type="email"
                      placeholder="liam@example.com.au"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Mobile Phone (Delivery SMS) *</label>
                    <input
                      required
                      type="tel"
                      placeholder="0412 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-medium text-slate-700 mb-1">Street Address *</label>
                    <input
                      required
                      type="text"
                      placeholder="42 George Street"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Suburb / City *</label>
                    <input
                      required
                      type="text"
                      placeholder="Sydney"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-2.5 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        {australianStates.map((st) => (
                          <option key={st.code} value={st.code}>
                            {st.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Postcode *</label>
                      <input
                        required
                        type="text"
                        maxLength={4}
                        placeholder="2000"
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Payment Method */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs">2</span>
                    <span>Select Payment Method</span>
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current text-emerald-600" />
                    <span>10% Instant Discount</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'Crypto' as PaymentMethod,
                      title: 'Cryptocurrency',
                      desc: 'BTC, ETH, USDT (TRC-20)'
                    },
                    {
                      id: 'Australian Bank Transfer' as PaymentMethod,
                      title: 'AU Bank Transfer',
                      desc: 'Direct BSB & Account No.'
                    },
                    {
                      id: 'Osko' as PaymentMethod,
                      title: 'Osko / PayID',
                      desc: 'Instant 60-Second Realtime'
                    }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.paymentMethod === m.id
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900">{m.title}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-700 text-white rounded">
                          -10%
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{m.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <p>
                    <strong>How it works:</strong> After you place this order we email you our payment details for your chosen method. Your e-bike is dispatched once payment clears.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary & Confirmation CTA */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Review Items ({cart.length})
                </h2>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1 text-xs">
                  {cart.map((item) => (
                    <div key={item.lineId} className="flex justify-between items-center text-slate-700">
                      <div>
                        <div className="font-bold text-slate-900">{item.quantity}x {item.product.name}</div>
                        <div className="text-[11px] text-slate-500">{item.variantTitle ?? item.product.subcategory}</div>
                      </div>
                      <span className="font-mono font-semibold text-slate-900">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation */}
                <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Standard Subtotal:</span>
                    <span className="font-mono tabular-nums font-semibold">${subtotal.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>10% Payment Discount ({formData.paymentMethod}):</span>
                    <span className="font-mono tabular-nums">-${cryptoDiscount.toLocaleString()} USD</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Nationwide Tracked Delivery:</span>
                    <span className="font-semibold text-emerald-700">FREE ($0.00)</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-base">
                    <span className="font-extrabold text-slate-900">Final Total Due:</span>
                    <span className="font-mono font-extrabold text-2xl text-emerald-700 tabular-nums">
                      ${discountedTotal.toLocaleString()} USD
                    </span>
                  </div>
                </div>

                {submitError && <p role="alert" className="text-xs text-red-600">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  {submitting ? 'Registering Order...' : `Complete Order · $${discountedTotal.toLocaleString()}`}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Nationwide Freight</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2-Year Warranty</span>
                  </span>
                </div>
              </div>
            </div>

          </form>
        </div>
      ) : (
        /* Order Confirmed Receipt View */
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Thank You! Your Order is Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Order Reference ID: <span className="font-mono font-bold text-slate-900">{orderId}</span>
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="text-xs font-bold text-slate-900">
                Payment Method: <span className="text-emerald-700">{formData.paymentMethod}</span>
              </div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                Amount Due: ${discountedTotal.toLocaleString()} USD
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>
                We have emailed a confirmation to <strong>{formData.email}</strong>. Watch for a follow-up email from us with your payment details. Your e-bike is dispatched once payment clears.
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600 border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <strong>Delivery Address:</strong> {formData.addressLine1}, {formData.city} {formData.state} {formData.postcode}, Australia
            </div>
            <div className="text-emerald-700 font-semibold">
              Tracked Heavy-Carton Delivery
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Continue Exploring E-Bikes
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};
