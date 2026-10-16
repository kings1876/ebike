import React from 'react';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onSelectCategory: (category: ProductCategory) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onSelectCategory }) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-14 lg:py-20">
      {/* Background glow and subtle mesh texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-700 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Editorial kicker */}
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Direct-to-Rider Electric Mobility · Australia
            </div>

            {/* Headline with balanced text wrapping */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
              Affordable Electric Bicycles Engineered for Australian Roads & Trails
            </h1>

            {/* Subheading incorporating user's requested keywords */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Discover Australia&apos;s best value <span className="text-white font-medium">electric mountain bikes</span>, <span className="text-white font-medium">step-through commuter bikes</span>, and <span className="text-white font-medium">folding e-bikes</span>. Enjoy 100% free nationwide delivery and an instant 10% discount when paying with Crypto or Australian Osko.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-900/30 flex items-center gap-2.5 cursor-pointer text-sm whitespace-nowrap active:scale-95"
              >
                <span>Browse All E-Bikes for Sale</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCategory('Electric Mountain Bikes')}
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-700 text-sm whitespace-nowrap cursor-pointer"
              >
                Explore e-MTB Series
              </button>
            </div>

            {/* 3 Core Trust Badges - Unboxed Editorial Presentation */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free AU Shipping</span>
                </div>
                <p className="text-[11px] text-slate-400">Door-to-door delivery on every e-bike</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10% Crypto / Osko</span>
                </div>
                <p className="text-[11px] text-slate-400">Instant cart discount at checkout</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2-Year AU Warranty</span>
                </div>
                <p className="text-[11px] text-slate-400">Local Australian support & parts</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=1200&q=80"
                alt="Electric mountain bike in scenic Australian landscape"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              {/* Showcase Overlay Data */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Featured Flagship
                  </div>
                  <div className="text-sm font-bold text-white">Apex Trail Pro 750W Dual-Air</div>
                  <div className="text-xs text-slate-400 mt-0.5">85Nm Torque · 110km Range · 4-Piston Brakes</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 line-through">$2,299</div>
                  <div className="text-base font-extrabold text-white font-mono tabular-nums">$1,899</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">$1,709 with Crypto</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
