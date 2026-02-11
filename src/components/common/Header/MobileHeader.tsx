'use client';

import useUserStore from '@/lib/zustand/auth/userStore';
import { fetchServerCartCount, useCartStore } from '@/lib/zustand/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import useHasHydrated from '@/hooks/auth/useHasHydrated';

interface MobileHeaderProps {
  onMenuOpen: () => void;
  isOpen: boolean;
}

export default function MobileHeader({
  onMenuOpen,
  isOpen,
}: MobileHeaderProps) {
  // persist 스토어 hydration 완료 여부 (SSR/클라이언트 불일치 방지)
  const isHydrated = useHasHydrated();
  const { user } = useUserStore();
  const localCartCount = useCartStore((state) => state.items.length);
  const serverCartCount = useCartStore((state) => state.serverCartCount);

  useEffect(() => {
    if (user) {
      fetchServerCartCount();
    }
  }, [user]);

  // hydration 전에는 0 (SSR과 동일), hydration 후 실제 값
  const cartCount = isHydrated ? (user ? serverCartCount : localCartCount) : 0;
  return (
    <div className="relative flex h-20 min-w-90 items-center justify-between bg-gray-50 px-7">
      <button
        onClick={onMenuOpen}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 1H23.565" stroke="#212121" strokeWidth="2" />
          <path d="M0 8H23.565" stroke="#212121" strokeWidth="2" />
          <path d="M0 15H23.565" stroke="#212121" strokeWidth="2" />
        </svg>
      </button>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/icons/LOGO.svg"
          alt="You,Us 로고"
          width={120}
          height={32}
          className="h-8 w-auto"
        />
      </Link>

      <nav aria-label="빠른 메뉴">
        <ul className="flex gap-4">
          {isHydrated &&
            (user ? (
              <>
                <li>
                  <Link href="/mypage" className="block">
                    <Image
                      src="/icons/MyPage.svg"
                      alt="마이페이지"
                      width={120}
                      height={32}
                      className="h-10 w-auto"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="relative block">
                    <Image
                      src="/icons/Basket.svg"
                      alt="장바구니"
                      width={120}
                      height={32}
                      className="h-10 w-auto"
                    />
                    {cartCount > 0 && (
                      <span className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white">
                        {cartCount > 99 ? '99+' : cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/mypage" className="block">
                    <Image
                      src="/icons/User.svg"
                      alt="마이페이지"
                      width={120}
                      height={32}
                      className="h-10 w-auto"
                    />
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="relative block">
                    <Image
                      src="/icons/disabled-basket.svg"
                      alt="장바구니"
                      width={120}
                      height={32}
                      className="h-10 w-auto"
                    />
                  </Link>
                </li>
              </>
            ))}
        </ul>
      </nav>
    </div>
  );
}
