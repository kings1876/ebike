import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GuideLink } from '../data/guide-links';

export const RelatedGuides: React.FC<{ guides: GuideLink[]; heading?: string }> = ({ guides, heading = 'Buying guides' }) => {
  if (!guides.length) return null;
  return (
    <section aria-labelledby="related-guides-heading">
      <h2 id="related-guides-heading" className="text-lg font-bold text-slate-900 mb-3">{heading}</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {guides.map((g) => (
          <li key={g.href}>
            <Link to={g.href} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-emerald-600 hover:text-emerald-800">
              <span>{g.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
