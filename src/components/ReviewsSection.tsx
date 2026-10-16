import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, ThumbsUp, Filter } from 'lucide-react';
import { TRUSTPILOT_STATS, REVIEWS } from '../data/reviews';

interface ReviewsSectionProps {
  filterProduct?: string;
  limit?: number;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ filterProduct, limit }) => {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filterTags = [
    'All',
    'Crypto & Osko Discount',
    'Free Shipping & Delivery',
    'Mountain e-MTB',
    'Commuter & Step-Through',
    'Folding e-Bikes'
  ];

  const filteredReviews = REVIEWS.filter((rev) => {
    if (filterProduct && rev.productName !== filterProduct) {
      return false;
    }
    if (selectedTag === 'Crypto & Osko Discount') {
      return rev.title.toLowerCase().includes('crypto') || rev.title.toLowerCase().includes('osko') || rev.content.toLowerCase().includes('crypto') || rev.content.toLowerCase().includes('discount');
    }
    if (selectedTag === 'Free Shipping & Delivery') {
      return rev.title.toLowerCase().includes('shipping') || rev.content.toLowerCase().includes('shipping') || rev.content.toLowerCase().includes('freight') || rev.content.toLowerCase().includes('delivered');
    }
    if (selectedTag === 'Mountain e-MTB') {
      return rev.productName.includes('MTB') || rev.productName.includes('Trail') || rev.productName.includes('Pioneer');
    }
    if (selectedTag === 'Commuter & Step-Through') {
      return rev.productName.includes('Commuter') || rev.productName.includes('Metro') || rev.productName.includes('CityLine') || rev.productName.includes('Hauler');
    }
    if (selectedTag === 'Folding e-Bikes') {
      return rev.productName.includes('Fold') || rev.productName.includes('Nomad');
    }
    return true;
  });

  const displayReviews = limit ? filteredReviews.slice(0, limit) : filteredReviews;

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200" id="customer-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Trustpilot Visual Proof */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Verified Customer Feedback
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-500">Australia-wide</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Reviews from Australian Riders
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl">
              Real testimonials from verified buyers across NSW, Victoria, Queensland, WA, SA, Tasmania, ACT, and Northern Territory.
            </p>
          </div>

          {/* Trustpilot Score Badge Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="text-2xl font-black text-slate-900 tracking-tight">Trustpilot</span>
                <span className="text-xs bg-[#00B67A]/10 text-[#00B67A] font-bold px-2 py-0.5 rounded">
                  {TRUSTPILOT_STATS.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 justify-center sm:justify-start">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center text-white text-xs">
                      <Star className="w-3.5 h-3.5 fill-current stroke-none" />
                    </div>
                  ))}
                </div>
                <span className="font-extrabold text-lg text-slate-900 font-mono tabular-nums">
                  {TRUSTPILOT_STATS.score}
                </span>
                <span className="text-xs text-slate-400">/ 5.0</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Based on <strong className="text-slate-800">{TRUSTPILOT_STATS.totalReviews.toLocaleString()}+</strong> verified Australian reviews
              </div>
            </div>

            {/* Star Distribution Breakdown */}
            <div className="hidden sm:block border-l border-slate-100 pl-6 space-y-1 text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-2">
                <span>5 ★</span>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B67A]" style={{ width: `${TRUSTPILOT_STATS.percentage5Star}%` }}></div>
                </div>
                <span className="text-slate-700 font-semibold">{TRUSTPILOT_STATS.percentage5Star}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4 ★</span>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00B67A]" style={{ width: `${TRUSTPILOT_STATS.percentage4Star}%` }}></div>
                </div>
                <span className="text-slate-700 font-semibold">{TRUSTPILOT_STATS.percentage4Star}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3 ★</span>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300" style={{ width: `${TRUSTPILOT_STATS.percentage3Star}%` }}></div>
                </div>
                <span className="text-slate-700 font-semibold">{TRUSTPILOT_STATS.percentage3Star}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tags Bar */}
        {!filterProduct && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-semibold">
            <span className="text-slate-400 flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                  selectedTag === tag
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                {/* Trustpilot Green Stars */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-[#00B67A] flex items-center justify-center text-white text-[10px]">
                        ★
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>

                {/* Review Title */}
                <h3 className="font-bold text-sm text-slate-900 leading-snug mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                {/* Review Body */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.content}
                </p>
              </div>

              {/* Author & Verified Purchase Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                  <span className="text-[11px] text-slate-500 font-medium">{rev.location}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-emerald-800">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="font-semibold">Verified Buyer:</span>
                  <span className="text-slate-600 truncate">{rev.productName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Proof Strip */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">100% Genuine Australian Customer Reviews</div>
              <div className="text-slate-500">All reviews are verified purchases shipped to Australian addresses.</div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400 text-xs">Rated 4.9/5 on</span>
            <span className="font-black text-slate-900 text-sm tracking-tight">Trustpilot</span>
          </div>
        </div>

      </div>
    </section>
  );
};
