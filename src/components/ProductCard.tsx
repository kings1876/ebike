import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { hasVariants, priceFrom } from '../data/variants';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const discountedPrice = Math.round(product.price * 0.9);
  const multi = hasVariants(product);
  const { varies } = priceFrom(product);

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-200 flex flex-col h-full shadow-xs hover:shadow-md">
      
      {/* Product Image Stage with Link to dedicated Product Page */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer block"
      >
        <ProductImage
          src={product.imageUrl}
          alt={product.name}
          category={product.category}
          className="w-full h-full"
        />

        {/* Status badge if present */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded tracking-wide uppercase">
            {product.badge}
          </div>
        )}

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="px-3.5 py-2 bg-white text-slate-900 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer">
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Details</span>
          </span>
        </div>
      </Link>

      {/* Product Metadata & Description */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-medium">
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-emerald-700">
            {product.category}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{product.subcategory}</span>
        </div>

        {/* Title linking to dedicated product URL */}
        <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-4 flex-1">
          {product.tagline}
        </p>

        {/* Key Specs Row */}
        {product.specs ? (
        <div className="py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-100 grid grid-cols-3 gap-2 text-center text-xs mb-4">
          <div>
            <div className="text-[10px] text-slate-600 uppercase font-semibold">Motor</div>
            <div className="font-semibold text-slate-800 truncate text-[11px] mt-0.5">{product.specs.motor.split(' ')[0]}</div>
          </div>
          <div className="border-x border-slate-200">
            <div className="text-[10px] text-slate-600 uppercase font-semibold">Range</div>
            <div className="font-semibold text-slate-800 truncate text-[11px] mt-0.5">{product.specs.range.split(' ')[0]} km</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-600 uppercase font-semibold">Speed</div>
            <div className="font-semibold text-slate-800 truncate text-[11px] mt-0.5">{product.specs.topSpeed.split(' ')[0]} km/h</div>
          </div>
        </div>
        ) : (
        <div className="py-2.5 px-3 bg-slate-50 rounded-lg border border-slate-100 grid grid-cols-2 gap-2 text-center text-xs mb-4">
          {Object.entries(product.details ?? {}).slice(0, 2).map(([label, value], i) => (
            <div key={label} className={i === 1 ? 'border-l border-slate-200' : ''}>
              <div className="text-[10px] text-slate-600 uppercase font-semibold">{label}</div>
              <div className="font-semibold text-slate-800 truncate text-[11px] mt-0.5">{value}</div>
            </div>
          ))}
        </div>
        )}

        {/* Price & Action Module */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-slate-950 font-mono tabular-nums">
                {varies && <span className="text-[10px] font-semibold text-slate-500 mr-1">From</span>}${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through font-mono tabular-nums">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-[11px] font-semibold text-emerald-800">
              ${discountedPrice.toLocaleString()} with Crypto/Osko (10% off)
            </div>
          </div>

          {multi ? (
            <Link
              to={'/product/' + product.id}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Select Options
            </Link>
          ) : (
          <button
            disabled={!product.inStock}
            onClick={() => addToCart(product, 1)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 whitespace-nowrap shrink-0"
            title="Add to order cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Add to Order' : 'Sold Out'}</span>
          </button>
          )}
        </div>

      </div>
    </div>
  );
};
