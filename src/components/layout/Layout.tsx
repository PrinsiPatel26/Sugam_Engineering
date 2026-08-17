import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { MobileContactBar } from './MobileContactBar';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <Header />
      <main id="main" className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileContactBar />
    </div>);

}