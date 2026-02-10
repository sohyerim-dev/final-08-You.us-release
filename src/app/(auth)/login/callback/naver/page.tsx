import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import NaverCallback from './NaverCallback';

export default function NaverCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NaverCallback />
    </Suspense>
  );
}
