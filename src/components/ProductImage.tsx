import React, { useState } from 'react';
import { ProductCategory } from '../types';

interface ProductImageProps {
  src: string;
  alt: string;
  category: ProductCategory;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt, category, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 flex items-center justify-center ${className}`}>
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />
      )}

      {/* Styled vector illustration fallback container if image fails or before load */}
      {(!isLoaded || hasError) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200 transition-opacity duration-300 ${
            hasError ? 'opacity-100' : isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Detailed SVG Bicycle Blueprint Graphic */}
          <svg
            className="w-28 h-20 text-slate-700 stroke-current mb-2"
            viewBox="0 0 100 60"
            fill="none"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Rear Wheel */}
            <circle cx="20" cy="42" r="14" strokeWidth="2.8" />
            <circle cx="20" cy="42" r="2" fill="currentColor" />
            <line x1="20" y1="28" x2="20" y2="56" strokeWidth="1" stroke="currentColor" strokeOpacity="0.4" />
            <line x1="6" y1="42" x2="34" y2="42" strokeWidth="1" stroke="currentColor" strokeOpacity="0.4" />

            {/* Front Wheel */}
            <circle cx="80" cy="42" r="14" strokeWidth="2.8" />
            <circle cx="80" cy="42" r="2" fill="currentColor" />
            <line x1="80" y1="28" x2="80" y2="56" strokeWidth="1" stroke="currentColor" strokeOpacity="0.4" />
            <line x1="66" y1="42" x2="94" y2="42" strokeWidth="1" stroke="currentColor" strokeOpacity="0.4" />

            {/* Bottom Bracket / Motor Drive Unit */}
            <circle cx="44" cy="42" r="5" strokeWidth="2.5" fill="#059669" fillOpacity="0.2" />
            <circle cx="44" cy="42" r="1.5" fill="currentColor" />

            {/* Frame Geometry */}
            <line x1="20" y1="42" x2="44" y2="42" strokeWidth="3" /> {/* Chainstay */}
            <line x1="20" y1="42" x2="38" y2="20" strokeWidth="3" /> {/* Seatstay */}
            <line x1="44" y1="42" x2="38" y2="20" strokeWidth="3.5" /> {/* Seattube */}
            <line x1="44" y1="42" x2="68" y2="22" strokeWidth="4.5" stroke="#059669" /> {/* Downtube Battery Pack */}
            <line x1="38" y1="20" x2="68" y2="22" strokeWidth="3" /> {/* Toptube */}
            <line x1="68" y1="22" x2="80" y2="42" strokeWidth="3.2" /> {/* Fork */}

            {/* Seat & Post */}
            <line x1="38" y1="20" x2="35" y2="12" strokeWidth="2.5" />
            <path d="M29 12 h12 c1.5 0 2 1 1 2 h-14 z" fill="currentColor" />

            {/* Handlebars */}
            <line x1="68" y1="22" x2="70" y2="12" strokeWidth="2.5" />
            <path d="M66 12 h10 c2 0 3-1.5 3-3" strokeWidth="2.8" />

            {/* Lightning bolt symbol indicating electric power */}
            <path d="M47 30 L43 35 H47 L44 40 L51 34 H47 Z" fill="#059669" stroke="none" />
          </svg>
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{category}</span>
          <span className="text-xs font-semibold text-slate-700 mt-0.5 text-center px-4 line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
};
