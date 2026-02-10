'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../Button';
import DesktopCategoryDropdown from './DesktopCategoryDropdown';
import Image from 'next/image';
import useUserStore from '@/lib/zustand/auth/userStore';
import useHasHydrated from '@/hooks/auth/useHasHydrated';
import { useCategoryStore } from '@/lib/zustand/categoryStore';

export default function DesktopHeader() {
  const { user, resetUser } = useUserStore();
  const isHydrated = useHasHydrated();
  const router = useRouter();
  const categories = useCategoryStore((state) => state.categories);

  const handleLogout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetUser();
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('naver_state');
    alert('로그아웃 되었습니다.');
  };

  const keywordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword') as string;

    router.push(
      keyword.trim() ? `/products?keyword=${keyword.trim()}` : '/products',
    );
  };

  return (
    <div className="px-10">
      <div className="flex h-32.5 items-center justify-between px-4">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/icons/LOGO.svg"
              alt="You,Us 로고"
              width={120}
              height={32}
              className="h-17.5 w-auto"
            />
          </Link>

          <Link href="/recommend" className="shrink-0">
            <Button
              variant="primary"
              className="flex h-10 items-center gap-2 px-4 text-sm leading-none whitespace-nowrap"
            >
              <Image src="/icons/AiButton.svg" width={9} height={15} alt="" />
              AI 추천받기
            </Button>
          </Link>

          <form
            onSubmit={keywordHandler}
            className="relative mr-6 max-w-xl flex-1"
            role="search"
          >
            <label htmlFor="desktop-search" className="sr-only">
              상품목록 검색창
            </label>
            <input
              type="text"
              id="desktop-search"
              name="keyword"
              placeholder="검색어를 입력하세요"
              className="focus:border-primary h-10 w-full rounded-lg border border-gray-300 px-4 pr-10 text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-3 -translate-y-1/2"
              aria-label="검색"
            >
              <svg
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 24 24"
                fill="none"
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
          </form>
        </div>

        {isHydrated &&
          (!user ? (
            <nav aria-label="사용자 메뉴">
              <ul className="flex shrink-0 items-center gap-4 text-sm">
                <li>
                  <Link
                    href="/login"
                    className="hover:text-primary text-gray-700 transition-colors"
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="hover:text-primary text-gray-700 transition-colors"
                  >
                    회원가입
                  </Link>
                </li>
              </ul>
            </nav>
          ) : (
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className="hover:text-primary text-sm text-gray-700 transition-colors"
              >
                로그아웃
              </button>
            </form>
          ))}
      </div>

      <DesktopCategoryDropdown categories={categories} />
    </div>
  );
}
