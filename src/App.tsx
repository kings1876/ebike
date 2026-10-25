/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ScrollToTop';
import { RouteSeo } from './components/RouteSeo';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';

// Dedicated Pages with individual URLs
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PolicyPage } from './pages/PolicyPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { PaymentDetailsPage } from './pages/PaymentDetailsPage';
// Blog pages are code-split in the browser. The build-time renderer (entry-server.tsx) swaps in the plain components,
// so the prerendered HTML holds the real article instead of a Suspense placeholder.
let BlogListPage: React.ComponentType = lazy(() => import('./pages/BlogListPage').then((m) => ({ default: m.BlogListPage })));
let BlogPostPage: React.ComponentType = lazy(() => import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));
export function useEagerBlogPages(list: React.ComponentType, post: React.ComponentType) {
  BlogListPage = list;
  BlogPostPage = post;
}
const AdminRoutes = lazy(() => import('./pages/admin/AdminRoutes'));

/** The whole app minus the router, so the same tree renders in the browser and at build time (prerender). */
export function AppShell() {
  return (
      <CartProvider>
        <ScrollToTop />
        <RouteSeo />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
          
          {/* Global Header adhering to Top Bar Contract */}
          <Header />

          {/* Routed Page Content with Dedicated URLs */}
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Shop & Catalog with filtering */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ShopPage />} />

              {/* Dedicated Product Page for each e-bike */}
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Blog Hub & Individual Article Pages */}
              <Route path="/blog" element={<Suspense fallback={<div className="min-h-[130vh]" />}><BlogListPage /></Suspense>} />
              <Route path="/blog/:slug" element={<Suspense fallback={<div className="min-h-[130vh]" />}><BlogPostPage /></Suspense>} />

              {/* About, Contact, FAQ & Reviews Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />

              {/* Shopping Cart & Order Checkout */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* Policy Pages */}
              <Route path="/shipping" element={<PolicyPage policyType="shipping" />} />
              <Route path="/refund" element={<PolicyPage policyType="refund" />} />
              <Route path="/privacy" element={<PolicyPage policyType="privacy" />} />
              <Route path="/terms" element={<PolicyPage policyType="terms" />} />
              <Route path="/policies/:type" element={<PolicyPage />} />

              {/* Reply portal (passcode-gated) + public payment page */}
              <Route path="/order/payment-details" element={<PaymentDetailsPage />} />
              <Route path="/admin/*" element={<Suspense fallback={null}><AdminRoutes /></Suspense>} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Slide-over Cart Drawer accessible from any page */}
          <CartDrawer />

          {/* Live Support Widget */}
          <LiveChatWidget />

          {/* Comprehensive Footer with real URL routing */}
          <Footer />

        </div>
      </CartProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
