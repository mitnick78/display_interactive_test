import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomersPage from '@/pages/CustomersPage/CustomersPage';
import OrdersPage from '@/pages/OrderPage/OrdersPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:customerId/orders" element={<OrdersPage />} />
        <Route path="*" element={<Navigate to="/customers" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;