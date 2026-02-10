import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';
import ToastProvider from '@/components/common/ToastProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://you-us.vercel.app'),
  title: 'Gift Shop',
  description: 'Find the perfect gift for your loved ones',
  icons: {
    icon: '/icons/favicon.ico.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
