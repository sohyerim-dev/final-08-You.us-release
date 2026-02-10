import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import CheckoutResult from './CheckoutResult';

export default function CheckoutResultPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutResult />
    </Suspense>
  );
}
