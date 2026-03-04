import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import MobilePaymentClient from './MobilePaymentClient';

export default function MobilePaymentPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MobilePaymentClient />
    </Suspense>
  );
}
