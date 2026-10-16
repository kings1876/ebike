import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogs';
import { ArrowLeft, Clock, BookOpen, Share2, Tag } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
        <p className="text-sm text-slate-500 mt-2">The article you are searching for does not exist.</p>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Hub</span>
        </Link>
      </div>
    );
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Articles</span>
      </Link>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="text-emerald-700 font-bold">{post.category}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{post.readTime}</span>
          </span>
          <span>·</span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Written by <strong>{post.author}</strong></span>
          <span className="text-slate-400">Australia E-Bikes Editorial Desk</span>
        </div>
      </header>

      {/* Article Content */}
      <div className="py-8 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
        {post.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>

      {/* Next actions strip */}
      <div className="mt-12 p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-white">Ready to find your perfect electric bicycle?</h3>
          <p className="text-xs text-slate-400 mt-0.5">Explore our range with 100% free delivery across Australia.</p>
        </div>
        <Link
          to="/shop"
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs whitespace-nowrap"
        >
          Browse E-Bikes for Sale
        </Link>
      </div>

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <div className="mt-14 pt-10 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Related Australian Cycling Guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherPosts.map((p) => (
              <div key={p.id} className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs text-emerald-700 font-semibold">{p.category}</div>
                <h4 className="font-bold text-sm text-slate-900 hover:text-emerald-700 line-clamp-2">
                  <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{p.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
