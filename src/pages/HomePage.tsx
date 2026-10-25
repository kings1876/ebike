import { categoryPath } from '../data/seo';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Zap, Wrench, Award, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES_WITH_SUBCATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FAQSection } from '../components/FAQSection';
import { ReviewsSection } from '../components/ReviewsSection';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 6);
  const flagship = PRODUCTS.find(p => p.inStock && p.category === 'Electric Mountain Bikes') ?? PRODUCTS[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-14 lg:py-20">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-700 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Direct-to-Rider Electric Mobility · Australia
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
                Affordable Electric Bicycles Engineered for Australian Roads & Trails
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Discover Australia&apos;s best value <span className="text-white font-medium">electric mountain bikes</span>, <span className="text-white font-medium">step-through commuter bikes</span>, and <span className="text-white font-medium">folding e-bikes</span>. Enjoy 100% free nationwide delivery and an instant 10% discount when paying with Crypto or Australian Osko.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all duration-200 shadow-lg shadow-emerald-900/30 flex items-center gap-2.5 text-sm whitespace-nowrap active:scale-95"
                >
                  <span>Browse All E-Bikes for Sale</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/shop/electric-mountain-bikes"
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-700 text-sm whitespace-nowrap"
                >
                  Explore e-MTB Series
                </Link>
              </div>

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
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>2-Year AU Warranty</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Local Australian support & parts</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                <img
                  src="/images/hero-ebike.webp"
                width={720}
                height={480}
                fetchPriority="high"
                  alt="Electric mountain bike in scenic Australian landscape"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Featured Flagship
                    </div>
                    <div className="text-sm font-bold text-white">{flagship.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{flagship.brand}{flagship.details?.['Motor System'] ? ' · ' + flagship.details['Motor System'] + ' motor' : ''}</div>
                  </div>
                  <div className="text-right">
                    {flagship.originalPrice && <div className="text-xs text-slate-400 line-through">${flagship.originalPrice.toLocaleString()}</div>}
                    <div className="text-base font-extrabold text-white font-mono tabular-nums">${flagship.price.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">${Math.round(flagship.price * 0.9).toLocaleString()} with Crypto</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
            Shop by Category
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Find Your Perfect E-Bike
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES_WITH_SUBCATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              to={categoryPath(cat.category)}
              className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cat.category}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
              Most Popular Models
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Electric Bikes
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
          >
            <span>View All ({PRODUCTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-colors shadow-md"
          >
            <span>Explore All E-Bikes for Sale</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Customer Reviews Section (Trustpilot 4.9/5 based on 2,480+ Australian reviews) */}
      <ReviewsSection />

      {/* Why Choose Us & Milestones Strip */}
      <section className="bg-slate-900 text-white py-14 mt-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              Australian Direct Operations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Why Australian Riders Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">Free Nationwide Freight</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct to your doorstep in Sydney, Melbourne, Brisbane, Perth, Adelaide, or rural Australia with tracked heavy-freight insurance.
              </p>
            </div>

            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">10% Off Instant Discount</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bypass credit card banking merchant surcharges. Receive an automatic 10% discount when paying with Crypto or Australian Osko.
              </p>
            </div>

            <div className="bg-slate-800/60 p-6 rounded-xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-white">2-Year Australian Warranty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Local mechanics, genuine replacement parts in stock, and complete Australian Consumer Law peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section on Homepage */}
      <section className="bg-white border-b border-slate-200">
        <FAQSection />
      </section>
    </div>
  );
};
