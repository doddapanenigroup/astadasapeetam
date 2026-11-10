'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopUtilityBar from './TopUtilityBar';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

export default function AppShell({ children }) {
  const pathname = usePathname();

  // Check if current route is a role/dashboard console route
  const isRoleRoute = Boolean(
    pathname && (
      pathname.startsWith('/admin') ||
      pathname.startsWith('/reporter') ||
      pathname.startsWith('/marketing') ||
      pathname.startsWith('/astrologer')
    )
  );

  // If on admin or role reporter console, render pure standalone full-screen console without public header & footer
  if (isRoleRoute) {
    return (
      <main className="min-h-screen w-full bg-[#f1f5f9] overflow-hidden">
        {children}
      </main>
    );
  }

  // Standard public devotee website with header and footer
  return (
    <>
      <TopUtilityBar />
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
