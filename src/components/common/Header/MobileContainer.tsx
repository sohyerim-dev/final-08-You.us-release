'use client';
import MobileHeader from '@/components/common/Header/MobileHeader';
import MobileSidebar from '@/components/common/Header/MobileSidebar';
import { useState } from 'react';

export default function MobileContainer() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <MobileHeader
        onMenuOpen={() => setIsMobileMenuOpen(true)}
        isOpen={isMobileMenuOpen}
      />
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
