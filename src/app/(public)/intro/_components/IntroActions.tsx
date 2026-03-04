'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IntroActions() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const markVisited = () => {
    document.cookie = 'hasVisited=true; path=/; max-age=31536000';
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/recommend"
        className="bg-primary relative mt-7.5 box-border overflow-hidden rounded-[20px] px-10 py-5 text-[1.125rem] font-bold text-gray-50 transition-all duration-300 focus:outline-gray-900 lg:mt-15 lg:text-[1.5rem]"
        onClick={markVisited}
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
        style={{
          transform: isHovered1
            ? 'translateY(-4px) scale(1.02)'
            : 'translateY(0) scale(1)',
          boxShadow: isHovered1
            ? '0 12px 24px rgba(201, 60, 79, 0.3)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span className="relative z-10">AI에게 선물 추천받기</span>
        {isHovered1 && (
          <span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
            }}
          />
        )}
      </Link>

      <Link
        href="/"
        className="mt-1.25 text-center font-bold transition-all duration-300 focus:outline-gray-900"
        onClick={markVisited}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
        style={{
          transform: isHovered2 ? 'translateY(-2px)' : 'translateY(0)',
          color: isHovered2 ? '#C93C4F' : 'inherit',
        }}
      >
        쇼핑몰 둘러보기
        <span
          className="ml-1 inline-block transition-transform duration-300"
          style={{
            transform: isHovered2 ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          →
        </span>
      </Link>
    </div>
  );
}
