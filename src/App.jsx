import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// layouts

import Admin from './layouts/Admin';
import Auth from './layouts/Auth';

// Views
import Dashboard from './views/admin/Dashboard';
import Settings from './views/admin/Settings';
import Staff from './views/admin/Staff';
import Customer from './views/admin/Customer';
import Products from './views/admin/Products';
// import Slides from './views/admin/Slides';
import Brand from './views/admin/Brand';
import Category from './views/admin/Category';
import SubCategory from './views/admin/SubCategory';
import Supplier from './views/admin/Supplier';
import Collection from './views/admin/Collection';
import ImportProduct from './views/admin/ImportProduct';
import Invoice from './views/admin/Invoice';
import Navigation from './views/admin/Navigation';

// Landing pages
import Login from './views/auth/Login';
import Discount from './views/admin/Discount';
import Order from './views/admin/Order';

export default function App() {
  const [title, setTitle] = useState('Draco - Quản Trị');

  useEffect(() => {
    window.document.title = title;
  }, [title]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* add routes with layouts */}
          <Route element={<Admin />}>
            <Route index path='/dashboard' element={<Dashboard setTitle={setTitle} />} />
            <Route path='/settings' element={<Settings setTitle={setTitle} />} />
            <Route index path='/products' element={<Products setTitle={setTitle} />} />
            <Route path='/categories' element={<Category setTitle={setTitle} />} />
            <Route path='/category-subs' element={<SubCategory setTitle={setTitle} />} />
            <Route path='/collections' element={<Collection setTitle={setTitle} />} />
            <Route path='/suppliers' element={<Supplier setTitle={setTitle} />} />
            <Route path='/discounts' element={<Discount setTitle={setTitle} />} />
            <Route path='/brands' element={<Brand setTitle={setTitle} />} />
            <Route path='/orders' element={<Order setTitle={setTitle} />} />
            <Route path='/invoices' element={<Invoice setTitle={setTitle} />} />
            <Route path='/invoices/:slug' element={<ImportProduct setTitle={setTitle} />} />
            <Route path='/customers' element={<Customer setTitle={setTitle} />} />
            <Route path='/staffs' element={<Staff setTitle={setTitle} />} />
            {/* <Route path='/slides' element={<Slides setTitle={setTitle} />} /> */}
            <Route path='/pages' element={<Navigation setTitle={setTitle} />} />
          </Route>
          <Route element={<Auth />}>
            <Route index path='/login' element={<Login setTitle={setTitle} />} />
          </Route>
          
          <Route
            path='*'
            element={<Navigate to='/dashboard' replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
