'use client';

import MoreButton from '@/components/common/MoreButton';

interface ProductSortProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function ProductSort({
  hasMore,
  isLoading,
  onLoadMore,
}: ProductSortProps) {
  return (
    <>
      {hasMore && (
        <div className="col-span-full mt-[60px]">
          <MoreButton
            className="mx-auto mb-[150px]"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? '로딩 중...' : '더보기'}
          </MoreButton>
        </div>
      )}
    </>
  );
}
