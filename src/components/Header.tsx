import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, openCartDrawer } = useCart();
  const navigate = useNavigate();

  const navItems = [
    { path: '/shop', label: 'Shop' },
    { path: '/blog', label: 'Blog' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Promotional Trust Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 text-center font-medium">
        <span className="text-emerald-400 font-semibold">Free Nationwide Shipping across Australia</span>
        <span className="mx-2 text-slate-500 hidden sm:inline">·</span>
        <span className="hidden sm:inline">10% Instant Discount on Crypto, Australian Bank Transfer & Osko</span>
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (5 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark Element */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-left focus:outline-none group whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M13 2L4 13h6l-2 9 11-12h-7l2-8z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-950">
            E Bikes <span className="text-emerald-600">for Sale</span>
          </span>
        </Link>

        {/* Zone 2: 4–5 Clean Single-Line Nav Links with Router URLs */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-emerald-700 border-emerald-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 border-transparent hover:border-slate-300'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer Trigger / Checkout) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={openCartDrawer}
            className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shadow-sm active:scale-95"
            aria-label="View Order Cart"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span className="whitespace-nowrap">Cart</span>
            <span className="ml-0.5 px-1.5 py-0.5 text-xs bg-emerald-600 text-white rounded font-mono font-bold tabular-nums">
              {totalCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/checkout');
              }}
              className="w-full text-center py-2.5 px-4 bg-emerald-600 text-white font-bold rounded-lg text-sm"
            >
              Proceed to Order Form
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
