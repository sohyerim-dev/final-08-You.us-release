'use client';

import { useState, useReducer, useEffect } from 'react';
import ReviewsComponent from '@/components/pages/product-detail/ProductTap/ProductReviews/ReviewsComponent';
import Pagination from '@/components/common/Pagination';
import ImageModal from '@/components/pages/product-detail/ProductTap/ProductReviews/ImageModal';
import { modalReducer, initialModalState } from './modalReducer';
import fetchClient from '@/lib/api/fetchClient';
import { ReviewResponse } from '@/types/review.types';
import { useParams } from 'next/navigation';
import Loading from '@/components/common/Loading';

export default function ProductReviews() {
  const { id } = useParams();

  const [reviews, setReviews] = useState<ReviewResponse>({
    ok: 0,
    item: [],
    pagination: { page: 1, limit: 5, total: 0, totalPages: 0 },
  });
  const [page, setPage] = useState<number>(1);
  const [sortType, setSortType] = useState('latest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let url = `/replies/products/${id}?page=${page}&limit=4`;

    switch (sortType) {
      case 'latest':
        url += `&sort={"createdAt":-1}`;
        break;
      case 'rating':
        url += `&sort={"rating":-1}`;
        break;
      case 'photo':
        url += `&sort={"createdAt":-1}`;
        break;
    }

    fetchClient<ReviewResponse>(url).then((data) => {
      if (sortType === 'photo') {
        const filtered = data.item?.filter(
          (r) => r.extra?.images && r.extra.images.length > 0,
        );
        setReviews({ ...data, item: filtered });
      } else {
        setReviews(data);
      }
      setIsLoading(false);
    });
  }, [id, page, sortType]);

  // 모달 이벤트 Reducer로 관리
  const [modal, dispatch] = useReducer(modalReducer, initialModalState);

  const handleImageClick = (images: string[], index: number) => {
    dispatch({ type: 'OPEN', images, index });
  };
  const handleCloseModal = () => dispatch({ type: 'CLOSE' });
  const handlePrev = () => dispatch({ type: 'PREV' });
  const handleNext = () => dispatch({ type: 'NEXT' });

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
  };

  return (
    <div className="min-x-[360px] lg:px-15">
      <div className="space-y-6">
        {/* 필터 버튼들 */}
        <div
          role="group"
          aria-label="리뷰 정렬 옵션"
          className="flex justify-end gap-2 pb-4"
        >
          {[
            { id: 'latest', label: '최신순으로' },
            { id: 'rating', label: '별점순으로' },
            { id: 'photo', label: '사진 리뷰만' },
          ].map((button, index, array) => (
            <button
              key={button.id}
              onClick={() => {
                setIsLoading(true);
                setSortType(button.id);
                setPage(1);
              }}
              aria-pressed={sortType === button.id}
              className={`text-body-sm cursor-pointer border-r border-r-gray-300 px-4 py-2 ${
                index === array.length - 1 && 'border-none'
              } ${sortType === button.id && 'text-primary font-bold'}`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* 리뷰 목록 */}
        {isLoading ? (
          <Loading />
        ) : reviews.item?.length === 0 ? (
          <div className="flex min-h-[700px] items-center justify-center">
            <p className="text-gray-400">등록된 후기가 없습니다.</p>
          </div>
        ) : (
          <div className="min-h-[500px] space-y-6">
            {reviews.item?.map((review) => (
              <ReviewsComponent
                key={review._id}
                review={review}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="mx-auto mt-15.5 mb-15.5 w-fit">
          <Pagination
            currentPage={page}
            totalPages={reviews.pagination?.totalPages}
            maxVisible={reviews.pagination?.limit}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {modal.images && (
        <ImageModal
          images={modal.images}
          currentIndex={modal.currentIndex}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
