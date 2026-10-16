import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogs';
import { BlogPost } from '../types';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Editorial Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-widest">
          Australian Rider Guides & Insights
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          E-Bike Knowledge Hub
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Expert articles on Australian e-bike road regulations, battery care in warm climates, and choosing between mountain, commuter, and folding electric bikes.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer hover:shadow-md"
          >
            <div>
              {/* Clean unboxed metadata with separators (Zero-Pill Rule) */}
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

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-6 text-xs font-semibold text-emerald-800 group-hover:text-emerald-950">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 overflow-hidden border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>{selectedPost.category}</span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {selectedPost.title}
              </h2>
              <div className="text-xs text-slate-500 font-medium pb-2 border-b border-slate-100">
                By {selectedPost.author} · Published {selectedPost.date}
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed pt-2">
                {selectedPost.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
