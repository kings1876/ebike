import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Orders & Shipping', 'Payment & Discounts', 'Bike Specs & Laws', 'Warranty & Service'];

  const filteredItems = selectedCategory === 'All'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
          Got Questions? We Have Answers
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Everything you need to know about nationwide Australian delivery, 10% crypto discounts, street legal regulations, and warranty.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
              >
                <span className="text-sm font-bold text-slate-900 flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Help Callout */}
      <div className="mt-12 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
        <h3 className="text-sm font-bold text-emerald-950">Still have a specific question about our e-bikes?</h3>
        <p className="text-xs text-emerald-800 max-w-md mx-auto">
          Our Australian bicycle technicians are on hand 6 days a week to guide you to the perfect ride.
        </p>
        <div className="pt-2">
          <a
            href="mailto:sales@ebikesale.com.au"
            className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Email sales@ebikesale.com.au
          </a>
        </div>
      </div>
    </section>
  );
};
