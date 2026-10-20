import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Star, Truck, ShieldCheck, Mail, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TRUSTPILOT_STATS } from '../data/reviews';
import { MegaNav, MobileCategoryList, SALE_COUNT } from './MegaNav';

const SUPPORT_EMAIL = 'support@ebikesforsale.com.au';

const utilityLinks = [
  { path: '/blog', label: 'Buying Guides' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
  { path: '/faq', label: 'FAQ' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { totalCount, openCartDrawer } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setMobileOpen(false);
  };

  const searchBox = (
    <form onSubmit={submitSearch} role="search" className="relative w-full">
      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search e-bikes, brands, motors, accessories..."
        aria-label="Search products"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
      />
    </form>
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-950 text-white shadow-lg shadow-black/20">
      {/* Utility bar: trust + service highlights + info links */}
      <div className="border-b border-slate-800/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/reviews"
              className="flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 shrink-0 hover:bg-emerald-500/20 transition-colors"
            >
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="flex h-4 w-4 items-center justify-center bg-[#00B67A]">
                    <Star className="h-3 w-3 fill-white stroke-none" />
                  </span>
                ))}
              </span>
              <span className="font-bold text-white">Trustpilot</span>
              <span className="font-mono font-semibold text-emerald-300">
                {TRUSTPILOT_STATS.score} / {TRUSTPILOT_STATS.maxScore}
              </span>
              <span className="hidden sm:inline text-slate-300">· {TRUSTPILOT_STATS.totalReviews.toLocaleString()}+ Verified Reviews</span>
            </Link>
            <span className="hidden xl:flex items-center gap-1.5 text-slate-400">
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
              10% off with Crypto, Bank Transfer &amp; Osko
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-slate-300 shrink-0">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              Free Australia-Wide Delivery
            </span>
            <span className="hidden 2xl:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              2-Year Warranty
            </span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="hidden 2xl:flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300">
              <Mail className="w-3.5 h-3.5" />
              {SUPPORT_EMAIL}
            </a>
            <span className="hidden lg:block h-4 w-px bg-slate-700" />
            <nav aria-label="Information" className="hidden lg:flex items-center gap-4">
              {utilityLinks.map((l) => (
                <Link key={l.path} to={l.path} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main bar: logo, search, cart, sale CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center gap-4 lg:gap-8">
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="E Bikes for Sale home">
          <div className="w-11 h-11 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-500 transition-colors">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M13 2L4 13h6l-2 9 11-12h-7l2-8z" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-xl font-extrabold tracking-tight text-white">
              E BIKES <span className="text-emerald-400">FOR SALE</span>
            </div>
            <div className="hidden sm:block font-mono text-[11px] uppercase tracking-wider text-emerald-300/80">Australia · Electric bikes &amp; parts</div>
          </div>
        </Link>

        <div className="hidden md:block flex-1 max-w-2xl">{searchBox}</div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/shop?sale=1"
            className="hidden xl:inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-extrabold uppercase tracking-wide text-slate-950 hover:bg-amber-400 transition-colors"
          >
            Shop Sale ({SALE_COUNT})
          </Link>
          <button
            onClick={openCartDrawer}
            aria-label="View order cart"
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white hover:border-emerald-500 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Cart</span>
            <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums">{totalCount}</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="lg:hidden p-2 text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Category navigation with mega-menus (desktop) */}
      <div className="hidden lg:block border-t border-slate-800/80">
        <MegaNav />
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 max-h-[calc(100vh-7.5rem)] overflow-y-auto">
          <div className="md:hidden mb-3">{searchBox}</div>
          <MobileCategoryList onNavigate={() => setMobileOpen(false)} />
          <Link
            to="/shop?sale=1"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-lg bg-amber-500 py-2.5 text-center text-sm font-extrabold uppercase tracking-wide text-slate-950"
          >
            Shop Sale ({SALE_COUNT})
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {utilityLinks.map((l) => (
              <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)} className="rounded-md bg-slate-900 px-3 py-2 text-slate-200">
                {l.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              navigate('/checkout');
            }}
            className="mt-4 w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white"
          >
            Proceed to Order Form
          </button>
        </div>
      )}

      {/* Secondary links under the category bar are shown in the utility row on small screens */}
      <div className="hidden md:block lg:hidden border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center gap-5 text-xs text-slate-300">
          {utilityLinks.map((l) => (
            <Link key={l.path} to={l.path} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
