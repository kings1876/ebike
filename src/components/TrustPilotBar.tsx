import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { TRUSTPILOT_STATS, REVIEWS } from '../data/reviews';

export const TrustPilotBar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-slate-100 border-y border-slate-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Trustpilot Brand & Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-sm">Trustpilot</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center text-white text-xs">
                    <Star className="w-3.5 h-3.5 fill-current stroke-none" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900">{TRUSTPILOT_STATS.score}</span> out of {TRUSTPILOT_STATS.maxScore} · Based on{' '}
              <Link
                to="/reviews"
                className="font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
              >
                {TRUSTPILOT_STATS.totalReviews.toLocaleString()}+ verified Australian reviews
              </Link>
            </div>
          </div>

          {/* Trust markers */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Australian Owned & Operated Since 2016</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>2-Year Comprehensive Australian Warranty</span>
            </div>
            <span className="text-slate-300">·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900">10% Off</span>
              <span>with Crypto or Australian Osko</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trustpilot Customer Reviews Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-900">Trustpilot Verified Reviews</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                    Score {TRUSTPILOT_STATS.score}/5 ({TRUSTPILOT_STATS.totalReviews.toLocaleString()}+ Reviews)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Real verified purchases delivered across Australia</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
              {REVIEWS.map((rev) => (
                <div key={rev.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <div key={i} className="w-3.5 h-3.5 bg-[#00B67A] flex items-center justify-center text-white text-[9px]">
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{rev.author}</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500">{rev.location}</span>
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{rev.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.content}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="text-emerald-700 font-medium">Verified Purchase:</span>
                    <span className="font-medium text-slate-700">{rev.productName}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 text-right">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Close Reviews
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
