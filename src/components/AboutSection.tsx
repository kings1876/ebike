import React from 'react';
import { ShieldCheck, Truck, Clock, Wrench, Award, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      
      {/* Brand Hero Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-5">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
            Founded in Australia · 21 June 2016
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Pioneering Affordable Electric Mobility for Every Australian Rider
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Founded on <strong>21 June 2016</strong> in Australia, <strong>E Bikes for Sale</strong> began with a clear, uncompromising vision: high-performance electric bicycles should not cost thousands in dealer markups. We believed that whether you are commuting across Sydney Harbour, tackling mountain trails in Victoria, or towing a caravan along the Coral Coast, electric assistance transforms everyday journeys into pure joy.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Over the past decade, we have remained true to our direct-to-rider model. By designing frames specifically for Australian conditions, maintaining a dedicated domestic parts depot, and providing 100% free nationwide shipping, we have helped over 25,000 riders leave their car keys behind.
          </p>
        </div>

        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-8 space-y-6 shadow-xl border border-slate-800">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            The E Bikes for Sale Difference
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Nationwide Tracked Delivery</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  100% free freight on all e-bikes to all Australian states and regional territories.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">2-Year Australian Warranty</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Complete peace of mind backed by certified bike mechanics and local warehouse spare parts.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">42-Point Safety Inspection</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Every e-bike is tuned, brake-tested, and battery diagnostics checked before carton dispatch.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Trustpilot Rated 4.9/5</div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Over 2,480 verified Australian customer reviews celebrating our bikes and prompt support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="pt-8 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
            Our Journey
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">Key Milestones</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              year: '2016',
              date: '21 June',
              title: 'Founded in Australia',
              desc: 'Established with the objective of eliminating retail dealership markups on quality e-bikes.'
            },
            {
              year: '2018',
              date: 'Nationwide Expansion',
              title: 'Free Freight Logistics',
              desc: 'Launched guaranteed free door-to-door freight across all Australian states and regional routes.'
            },
            {
              year: '2021',
              date: 'Circular Mobility',
              title: 'Certified Pre-Owned Fleet',
              desc: 'Initiated 42-point refurbished & ex-demo workshop program to provide low-cost accessible cycling.'
            },
            {
              year: '2026',
              date: 'Modern Payments',
              title: '10% Alternative Payment Discount',
              desc: 'Pioneered instant 10% savings on Australian Bank Transfer, Osko, and Cryptocurrency checkout.'
            }
          ].map((mile, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-emerald-700 font-mono">{mile.year}</span>
                <span className="text-[11px] font-semibold text-slate-400">{mile.date}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{mile.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{mile.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
