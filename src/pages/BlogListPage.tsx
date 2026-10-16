import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogs';
import { Clock, ArrowRight } from 'lucide-react';

export const BlogListPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
          Australian Rider Guides & Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
          E-Bike Knowledge Hub & Blog
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Expert articles on Australian e-bike road regulations, saving 10% on crypto payments, battery preservation in hot climates, and buying advice.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-200 p-6 flex flex-col justify-between hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{post.readTime}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{post.date}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
              <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="text-slate-400 font-normal">By {post.author.split(',')[0]}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
