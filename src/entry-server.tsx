import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppShell, useEagerBlogPages } from './App';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';

useEagerBlogPages(BlogListPage, BlogPostPage);

/** Renders a route to an HTML string at build time (used by scripts/prerender.ts). */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  { progressiveChunkSize: 1e9 },
  );
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}
