import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L4 13h6l-2 9 11-12h-7l2-8z" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                E Bikes <span className="text-emerald-500">for Sale</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Australia&apos;s specialist in affordable electric bicycles, electric mountain bikes (e-MTB), step-through commuter bikes, and folding electric bikes. Founded on 21 June 2016 in Australia with 100% free nationwide shipping.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nationwide AU Delivery</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>2-Year AU Warranty</span>
              </span>
            </div>
          </div>

          {/* Quick Links with real router URLs (Col 3) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop" className="hover:text-emerald-400 transition-colors">
                  Shop All E-Bikes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald-400 transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us (Since 2016)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-emerald-400 transition-colors">
                  Customer Reviews (Trustpilot 4.9★)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Protection & Policies with real URLs (Col 4) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Policies & Support</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shipping" className="hover:text-emerald-400 transition-colors">
                  Free Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-emerald-400 transition-colors">
                  30-Day Return & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms & Road Regulations
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy (APP)
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-emerald-400 transition-colors">
                  Order Checkout Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Accepted Payments & Savings (Col 5) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Accepted Payments</h3>
            <p className="text-xs text-slate-400">
              Enjoy an instant <strong>10% discount</strong> on your order total with:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Cryptocurrency (BTC / ETH / USDT)</span>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">10% OFF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Australian Bank Transfer (EFT)</span>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">10% OFF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                <span>Osko / PayID Instant Real-time</span>
                <span className="text-[10px] text-emerald-400 font-bold font-mono">10% OFF</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keyword Cloud Strip */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong>Popular Searches in Australia:</strong>{' '}
            <Link to="/shop" className="hover:text-emerald-400">ebike for sale</Link> ·{' '}
            <Link to="/shop/cheap-electric-bikes" className="hover:text-emerald-400">cheap electric bikes</Link> ·{' '}
            <Link to="/shop/electric-mountain-bikes" className="hover:text-emerald-400">electric mountain bikes</Link> ·{' '}
            <Link to="/shop/electric-commuter-bikes" className="hover:text-emerald-400">electric commuter bike</Link> ·{' '}
            <Link to="/shop/step-through-electric-bikes" className="hover:text-emerald-400">step through ebike</Link> ·{' '}
            <Link to="/shop/folding-electric-bikes" className="hover:text-emerald-400">folding electric bike</Link> ·{' '}
            <Link to="/shop/fat-tyre-electric-bikes" className="hover:text-emerald-400">fat tyre electric bike</Link> ·{' '}
            <Link to="/shop/electric-cargo-bikes" className="hover:text-emerald-400">electric cargo bike</Link> ·{' '}
            <Link to="/shop/electric-trikes" className="hover:text-emerald-400">electric trike</Link> ·{' '}
            <Link to="/shop/trek-electric-bikes" className="hover:text-emerald-400">trek electric bike</Link> ·{' '}
            <Link to="/shop/smartmotion-electric-bikes" className="hover:text-emerald-400">smartmotion ebike</Link> ·{' '}
            <Link to="/shop/ebike-batteries-chargers" className="hover:text-emerald-400">ebike battery</Link>.
          </p>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} E Bikes for Sale. All rights reserved. Australian Business Operations.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Compliant with EN15194 European & Australian Pedelec Safety Standards.
          </div>
        </div>

      </div>
    </footer>
  );
};
