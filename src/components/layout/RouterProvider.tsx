'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RouterProvider() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  return null;
}
