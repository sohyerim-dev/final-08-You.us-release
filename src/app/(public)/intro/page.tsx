'use client'

import Link from 'next/link'
import styles from '@/app/(public)/intro/page.module.css'
import Image from 'next/image'

export default function IntroPage() {
  const markVisited = () => {
    document.cookie = 'hasVisited=true; path=/; max-age=31536000'
  }

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-hidden bg-[#F3E7E9] pt-35 lg:justify-center lg:pt-0">
      <h1 className="sr-only">인트로 페이지</h1>
      <h2
        className={`color-gray-900 text-title-md lg:text-title-lg ${styles.content}`}
      >
        선물 추천 쇼핑몰
      </h2>
      <Image
        src="/icons/LOGO.svg"
        className={`w-72.5 lg:w-112.5 ${styles.logo}`}
        width="450"
        height="146"
        alt="유어스"
      />
      <div className={`mt-6 flex flex-col items-center ${styles.content}`}>
        <h3 className="text-[1.5rem] md:text-[3rem]">선물 고르기 힘들 때,</h3>
        <h3 className="text-[1.5rem] md:text-[3rem]">AI에게 선물 추천받자!</h3>
        <div className="flex flex-col gap-4">
          <Link
            href="/recommend"
            className="bg-primary mt-7.5 box-border rounded-[20px] px-10 py-5 text-[1.125rem] font-bold text-gray-50 focus:outline-gray-900 lg:mt-15 lg:text-[1.5rem]"
            onClick={markVisited}
          >
            AI에게 선물 추천받기
          </Link>
          <Link
            href="/"
            className="mt-1.25 text-center font-bold focus:outline-gray-900"
            onClick={markVisited}
          >
            쇼핑몰 둘러보기
          </Link>
        </div>
      </div>
    </div>
  )
}
