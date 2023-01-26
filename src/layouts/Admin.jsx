import React from 'react';
import { Outlet } from 'react-router-dom';

// components

import AdminNavbar from '../components/Shared/Navbars/AdminNavbar';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import FooterAdmin from '../components/Shared/Footers/FooterAdmin';
import Toast from '../components/Shared/Toasts/Toast';

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className='relative md:ml-64 bg-slate-100 min-h-screen'>
        <AdminNavbar />
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className={`mx-auto w-full `}>
          <Outlet />
          <FooterAdmin />
        </div>
      </div>
      <Toast />
    </>
  );
}
