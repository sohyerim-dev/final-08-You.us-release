'use client'

import { useState } from 'react'
import Link from 'next/link'
import { categories, categoryData } from './Header'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  if (!isOpen) return null

  return (
    <>
      {/* 오버레이 - button으로 변경하여 키보드 접근 가능 */}
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

        {/* 검색 폼 */}
        <form role="search" className="p-4">
          <div className="relative">
            <label htmlFor="mobile-search" className="sr-only">
              상품 검색
            </label>
            <input
              id="mobile-search"
              type="text"
              placeholder="상품 검색"
              className="focus:border-primary h-10 w-full rounded-lg border border-gray-300 pr-4 pl-10 text-sm placeholder:text-gray-400 focus:outline-none"
            />
            <Link
              href="/products"
              className="absolute top-1/2 left-3 -translate-y-1/2"
              aria-label="검색하기"
              onClick={onClose}
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
            </Link>
          </div>
        </form>

        {/* 카테고리 목록 */}
        <nav aria-label="카테고리 메뉴">
          <ul className="py-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className="text-primary flex w-full items-center justify-between px-4 py-3 text-left font-medium hover:bg-gray-100"
                  aria-expanded={openCategory === category}
                  aria-controls={`subcategory-${category}`}
                >
                  <span>{category}</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${
                      openCategory === category ? 'rotate-180' : ''
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
                      stroke={openCategory === category ? '#c93c4f' : '#929292'}
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>

                {/* 소분류 (아코디언) */}
                <ul
                  id={`subcategory-${category}`}
                  className={`bg-gray-100 py-2 ${
                    openCategory === category ? 'block' : 'hidden'
                  }`}
                >
                  {categoryData[category].map((subCategory) => (
                    <li key={subCategory}>
                      <Link
                        href={`/products`}
                        className="hover:text-primary block px-8 py-2 text-sm text-gray-700"
                        onClick={onClose}
                      >
                        {subCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        {/* 하단 링크 */}
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
      </aside>
    </>
  )
}
