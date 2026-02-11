'use client';

import QuickMenu from '@/components/pages/mypage/main/QuickMenu';
import useUserStore from '@/lib/zustand/auth/userStore';
import useHasHydrated from '@/hooks/auth/useHasHydrated';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MypageLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // 로그인 사용자 점검
  const { user } = useUserStore();
  const router = useRouter();
  const isHydrated = useHasHydrated();

  // hydration 완료 후에만 인증 체크
  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      const currentPath = window.location.pathname;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [isHydrated, user, router]);

  return (
    isHydrated &&
    user && (
      <div className="mx-auto bg-gray-50">
        <main className="mx-auto w-full px-7.5 lg:flex lg:max-w-375 lg:min-w-5xl lg:gap-32.5">
          <QuickMenu className="hidden lg:block lg:shrink-0" />
          <div className="w-full lg:max-w-255 lg:min-w-0 lg:flex-1">
            {children}
          </div>
        </main>
      </div>
    )
  );
}
