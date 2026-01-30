'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '../Button'
import DesktopCategoryDropdown from './DesktopCategoryDropdown'
import Image from 'next/image'

export default function DesktopHeader() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="px-10">
      {/* 상단 헤더 */}
      <div className="flex h-32.5 items-center justify-between px-4">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="shrink-0">
            <Image
              src="/icons/LOGO.svg"
              alt="You,Us 로고"
              width={120}
              height={32}
              className="h-10 w-auto"
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

          <form className="relative mr-6 max-w-xl flex-1" role="search">
            <label htmlFor="desktop-search" className="sr-only">
              상품목록 검색창
            </label>
            <input
              type="text"
              id="desktop-search"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:border-primary h-10 w-full rounded-lg border border-gray-300 px-4 pr-10 text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <button
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
      </div>

      {/* 카테고리 네비게이션 */}
      <DesktopCategoryDropdown />
    </div>
  )
}
