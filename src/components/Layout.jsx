import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 md:p-8 bg-gray-100">
        <Outlet /> {/* This renders child routes */}
      </main>
      <Footer />
    </div>
  );
}