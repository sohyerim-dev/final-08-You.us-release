'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useUserStore from '@/lib/zustand/auth/userStore';
import useHasHydrated from '@/hooks/auth/useHasHydrated';
import { useCategoryStore } from '@/lib/zustand/categoryStore';
import { toast } from 'react-toastify';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const { user, resetUser } = useUserStore();
  const isHydrated = useHasHydrated();
  const router = useRouter();

  const categories = useCategoryStore((state) => state.categories);
  const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetUser();
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('naver_state');
    toast.success('로그아웃 되었습니다.');
  };

  const toggleCategory = (code: string) => {
    setOpenCategory(openCategory === code ? null : code);
  };

  const keywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword') as string;

    router.push(
      keyword.trim()
        ? `/products?keyword=${encodeURIComponent(keyword.trim())}`
        : '/products',
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-black/50"
        onClick={onClose}
        aria-label="메뉴 닫기"
      />

      <aside
        id="mobile-sidebar"
        className="fixed top-0 left-0 z-50 h-full w-[45%] min-w-58 overflow-y-auto bg-gray-50 lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="모바일 메뉴"
      >
        <div className="bg-category flex items-center justify-between p-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="메뉴 닫기"
            className="p-1"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form role="search" className="p-4" onSubmit={keywordHandler}>
          <div className="relative">
            <label htmlFor="mobile-search" className="sr-only">
              상품 검색
            </label>
            <input
              id="mobile-search"
              type="text"
              name="keyword"
              placeholder="상품 검색"
              className="focus:border-primary h-10 w-full rounded-lg border border-gray-300 pr-4 pl-10 text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-1/2 left-3 -translate-y-1/2"
              aria-label="검색하기"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="#C93C4F"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L17 17"
                  stroke="#C93C4F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </form>

        <nav aria-label="카테고리 메뉴">
          <ul className="py-2">
            {categories.map((category) => (
              <li key={category.code}>
                {category.code === 'PC00' ? (
                  <Link
                    href="/products"
                    className="text-primary flex w-full items-center px-4 py-3 text-left font-medium hover:bg-gray-100"
                    onClick={onClose}
                  >
                    <span>{category.value}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleCategory(category.code)}
                      className="text-primary flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-100"
                      aria-expanded={openCategory === category.code}
                      aria-controls={`subcategory-${category.code}`}
                    >
                      <span>{category.value}</span>
                      <svg
                        className={`h-5 w-5 transition-transform ${
                          openCategory === category.code ? 'rotate-180' : ''
                        }`}
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="13.25"
                          cy="13.25"
                          r="12.5"
                          fill="#FAFAFA"
                          stroke="#EFEFEF"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M17.75 12.0025L12.6417 16.75L7.53346 12.0025"
                          stroke={
                            openCategory === category.code
                              ? '#c93c4f'
                              : '#929292'
                          }
                          strokeWidth="1.5"
                        />
                      </svg>
                    </button>

                    <ul
                      id={`subcategory-${category.code}`}
                      className={`bg-gray-100 py-2 ${
                        openCategory === category.code ? 'block' : 'hidden'
                      }`}
                    >
                      {category.sub?.map((subCategory) => (
                        <li key={subCategory.code}>
                          <Link
                            href={`/products/${category.code}/${subCategory.code}`}
                            className="hover:text-primary block px-8 py-2 text-sm text-gray-700"
                            onClick={onClose}
                          >
                            {subCategory.value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {isHydrated &&
          (!user ? (
            <nav aria-label="사용자 메뉴" className="m-5.5">
              <ul className="flex justify-end gap-5">
                <li>
                  <Link href="/login" onClick={onClose}>
                    로그인
                  </Link>
                </li>
                <li>
                  <Link href="/signup" onClick={onClose}>
                    회원가입
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <form onSubmit={handleLogout} className="flex justify-end gap-5">
              <button
                type="submit"
                className="m-5.5 text-gray-700 transition-colors"
              >
                로그아웃
              </button>
            </form>
          ))}
      </aside>
    </>
  );
}
