'use client';

import Link from 'next/link';
import SmallCategory from './SmallCategory';
import Image from 'next/image';
import useUserStore from '@/lib/zustand/auth/userStore';
import { fetchServerCartCount, useCartStore } from '@/lib/zustand/cartStore';
import type { CategoryCode } from '@/types/categoryCode.type';
import { useEffect } from 'react';
import useHasHydrated from '@/hooks/auth/useHasHydrated';

export default function DesktopCategoryDropdown({
  categories,
}: {
  categories: CategoryCode[];
}) {
  // persist 스토어 hydration 완료 여부 (SSR/클라이언트 불일치 방지)
  const isHydrated = useHasHydrated();
  const user = useUserStore((state) => state.user);
  const localCartCount = useCartStore((state) => state.items.length);
  const serverCartCount = useCartStore((state) => state.serverCartCount);

  // 로그인 상태면 서버 장바구니 수량 조회
  useEffect(() => {
    if (user) {
      fetchServerCartCount();
    }
  }, [user]);

  // hydration 전에는 0 (SSR과 동일), hydration 후 실제 값
  const cartCount = isHydrated ? (user ? serverCartCount : localCartCount) : 0;

  return (
    <nav aria-label="상품 카테고리" className="relative border-gray-200">
      <div className="flex justify-between px-4">
        <div className="group relative w-[60%]">
          <ul className="flex h-11 flex-wrap items-center justify-between gap-3 overflow-x-auto">
            {categories?.map((category) => (
              <li key={category.code}>
                <Link
                  href={`/products/${category.code}`}
                  className="hover:text-primary text-body-sm font-medium text-gray-700 transition-colors"
                >
                  {category.value}
                </Link>
              </li>
            ))}
          </ul>

          <SmallCategory categories={categories} />
        </div>

        <ul className="flex gap-6" aria-label="빠른 메뉴">
          <li>
            {isHydrated && (
              <Link href="/mypage" className="block">
                {user ? (
                  <Image
                    src="/icons/MyPage.svg"
                    alt="마이페이지"
                    width={120}
                    height={32}
                    className="h-10 w-auto"
                  />
                ) : (
                  <Image
                    src="/icons/User.svg"
                    alt="마이페이지 비활성화"
                    width={120}
                    height={32}
                    className="h-10 w-auto"
                  />
                )}
              </Link>
            )}
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
        </ul>
      </div>
    </nav>
  );
}
