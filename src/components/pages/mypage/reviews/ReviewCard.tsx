'use client';

import { useReducer } from 'react';
import Button from '@/components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import ImageModal from '@/components/pages/product-detail/ProductTap/ProductReviews/ImageModal';

import {
  modalReducer,
  initialModalState,
} from '@/components/pages/product-detail/ProductTap/ProductReviews/modalReducer';

export type ReviewCardProps = {
  type: 'written' | 'pending';
  productId: number;
  imageSrc: string;
  imageAlt: string;
  name: string;
  price: string;
  // 작성된 리뷰일 경우
  reviewId?: number;
  rating?: number;
  createdAt?: string;
  reviewContent?: string;
  reviewImages?: string[];
  // 대기 중인 리뷰일 경우
  orderItemId?: number;
};

export default function ReviewCard({
  type,
  imageSrc,
  imageAlt,
  name,
  price,
  reviewId,
  rating = 0,
  createdAt,
  reviewContent,
  reviewImages = [],
}: ReviewCardProps) {
  const [modal, dispatch] = useReducer(modalReducer, initialModalState);

  const handleImageClick = (index: number) => {
    dispatch({ type: 'OPEN', images: reviewImages, index });
  };
  const handleCloseModal = () => dispatch({ type: 'CLOSE' });
  const handlePrev = () => dispatch({ type: 'PREV' });
  const handleNext = () => dispatch({ type: 'NEXT' });

  // 별점 렌더링
  const renderStars = () => {
    if (type === 'pending') {
      return (
        <span>
          <span className="text-gray-300">{'☆'.repeat(5)}</span> ?/5
        </span>
      );
    }
    return (
      <span>
        <span className="text-primary">{'★'.repeat(rating)}</span>
        <span className="text-gray-300">{'★'.repeat(5 - rating)}</span> {rating}
        /5
      </span>
    );
  };

  return (
    <li className="overflow-hidden border border-gray-200 bg-white">
      {/* 상품 정보 영역 */}
      <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={80}
            height={80}
            className="border-primary h-20 w-20 shrink-0 rounded-lg border object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-body-md line-clamp-1 font-medium">{name}</p>
            <p className="text-body-md">{price}</p>
            <div className="text-body-sm">{renderStars()}</div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="gap-2 lg:flex lg:flex-col">
          <div className="flex flex-col gap-2">
            {type === 'written' ? (
              <>
                <Link href={`/mypage/reviews/${reviewId}/edit`}>
                  <Button className="text-body-sm w-full lg:w-[162px]">
                    수정하기
                  </Button>
                </Link>
                {createdAt && (
                  <span className="text-body-sm text-gray-500">
                    작성일 : {createdAt}
                  </span>
                )}
              </>
            ) : (
              <>
                <Link href={`/mypage/orders/1`}>
                  <Button className="text-body-sm w-full lg:w-[162px]">
                    주문 상세
                  </Button>
                </Link>
                <Link
                  href={`/mypage/reviews/create/${orderItemId}/${productId}`}
                >
                  <Button
                    variant="update"
                    className="text-body-sm w-full lg:w-[162px]"
                  >
                    후기 쓰기
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 리뷰 내용 영역 (작성된 리뷰만) */}
      {type === 'written' && reviewContent && (
        <div className="border-primary border-t-2 p-4">
          {/* 리뷰 이미지 */}
          <div className="mb-4 flex min-h-[40px] gap-2">
            {reviewImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleImageClick(idx)}
                className="cursor-pointer"
              >
                <Image
                  src={img}
                  alt={`리뷰 이미지 ${idx + 1}`}
                  width={80}
                  height={80}
                  className="h-15 w-15 rounded border border-gray-200 object-cover"
                />
              </button>
            ))}
          </div>
          {/* 리뷰 텍스트 */}
          <div className="border-primary min-h-[150px] border-t-2 pt-4">
            <p className="text-body-md leading-relaxed text-gray-900">
              &gt; {reviewContent}
            </p>
          </div>
        </div>
      )}
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
    </li>
  );
}
