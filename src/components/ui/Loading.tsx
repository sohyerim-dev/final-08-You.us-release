'use client';

import { useEffect, useState } from 'react';

export default function Loading({ height }: { height?: number }) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-4 ${
        height ? `h-[${height}px]` : 'min-h-screen'
      }`}
    >
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
      <p
        className={`text-sm text-gray-400 transition-opacity duration-700 ${
          showText ? 'opacity-100' : 'opacity-0'
        }`}
      >
        데이터를 불러오는 중입니다...
      </p>
    </div>
  );
}
