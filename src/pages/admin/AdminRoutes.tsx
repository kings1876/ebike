import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminShell } from './AdminShell';
import { AdminDashboard, AdminOrders, AdminOrderDetail, AdminEnquiries, AdminEnquiryDetail } from './AdminPages';

// Loaded lazily so the admin code is not part of the public bundle.
const AdminRoutes: React.FC = () => (
  <Routes>
    <Route element={<AdminShell />}>
      <Route index element={<AdminDashboard />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="orders/:id" element={<AdminOrderDetail />} />
      <Route path="enquiries" element={<AdminEnquiries />} />
      <Route path="enquiries/:id" element={<AdminEnquiryDetail />} />
    </Route>
  </Routes>
);
export default AdminRoutes;
