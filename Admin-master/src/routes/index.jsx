import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Home from '../components/Home';
import PrivateRoute from './PrivateRoute';
import DashboardOwner from '../pages/Shopowner/Pages/Dashboard';
import UpdateProduct from '../pages/Shopowner/Pages/UpdateProduct';
import PurchasedProducts from '../components/PurchasedProducts/PurchasedProducts';
import Claims from '../components/Claims/Claims';
import DashboardCompnay from '../pages/InsuranceCompany/Insurance/Dashboard';




const Index = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Dashboard-Owner" element={<DashboardOwner />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/PurchasedProducts" element={<PurchasedProducts />} />

        <Route path="/claims" element={<Claims />} />
        <Route path="/Dashboard-Compnay" element={<DashboardCompnay />} />


        <Route path="/Dashboard" element={
        <PrivateRoute>
        <Home/>
        </PrivateRoute>
     }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
