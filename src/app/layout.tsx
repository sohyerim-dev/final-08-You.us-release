import type { Metadata } from 'next';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import './globals.css';
import ToastProvider from '@/components/ui/ToastProvider';
import RouterProvider from '@/components/layout/RouterProvider';

const pretendard = localFont({
  src: '../../public/fonts/Pretendard-Medium.woff2',
  display: 'swap',
});

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
      <body className={`bg-gray-50 ${pretendard.className}`}>
        <RouterProvider />
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
