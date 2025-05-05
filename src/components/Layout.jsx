import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, fullScreen = false }) {
  return (
    <div className={fullScreen ? '' : 'max-w-7xl mx-auto px-4'}>
      {/* Conditionally render header/footer */}
      {!fullScreen && <Header />}
      <main className={fullScreen ? 'min-h-screen' : 'flex-grow p-4 md:p-8 bg-gray-100'}>
        {children || <Outlet />} {/* Render children or child routes */}
      </main>
      {!fullScreen && <Footer />}
    </div>
  );
}