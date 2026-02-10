import CheckoutClient from '@/components/pages/checkout/CheckoutClient';
import Loading from '@/components/common/Loading';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '주문/결제',
  description: '주문 정보를 확인하고 결제를 진행하세요.',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutClient />
    </Suspense>
  );
}
