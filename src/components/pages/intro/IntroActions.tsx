'use client';

import Link from 'next/link';

export default function IntroActions() {
  const markVisited = () => {
    document.cookie = 'hasVisited=true; path=/; max-age=31536000';
  };

  return (
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
  );
}
