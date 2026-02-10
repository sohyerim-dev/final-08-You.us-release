'use client';

import Loading from '@/components/common/Loading';

export default function RecommendLoading() {
  return (
    <>
      <h2 className="text-title-lg mt-15 text-gray-900">
        AI가 추천 결과를 생성 중이에요
      </h2>
      <Loading />
    </>
  );
}
