/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Header } from './components/Header';
import { TrustPilotBar } from './components/TrustPilotBar';
import { CartDrawer } from './components/CartDrawer';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';

// Dedicated Pages with individual URLs
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { PolicyPage } from './pages/PolicyPage';
import { ReviewsPage } from './pages/ReviewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
          
          {/* Global Header adhering to Top Bar Contract */}
          <Header />

          {/* Trustpilot 4.9/5 Rating Bar based on 2,480+ Australian reviews */}
          <TrustPilotBar />

          {/* Routed Page Content with Dedicated URLs */}
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />

              {/* Shop & Catalog with filtering */}
              <Route path="/shop" element={<ShopPage />} />

              {/* Dedicated Product Page for each e-bike */}
              <Route path="/product/:productId" element={<ProductDetailPage />} />

              {/* Blog Hub & Individual Article Pages */}
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

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
    </BrowserRouter>
  );
}
