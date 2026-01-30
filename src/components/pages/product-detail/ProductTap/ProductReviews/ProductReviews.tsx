'use client'

import { useState, useReducer } from 'react'
import ReviewsComponent from '@/components/pages/product-detail/ProductTap/ProductReviews/ReviewsComponent'
import Pagination from '@/components/common/Pagination'
import ImageModal from '@/components/pages/product-detail/ProductTap/ProductReviews/ImageModal'
import { modalReducer, initialModalState } from './modalReducer'

export default function ProductReviews() {
  const [sortType, setSortType] = useState('latest')

  // 모달 이벤트 Reducer로 관리
  const [modal, dispatch] = useReducer(modalReducer, initialModalState)

  const handleImageClick = (images: string[], index: number) => {
    dispatch({ type: 'OPEN', images, index })
  }
  const handleCloseModal = () => dispatch({ type: 'CLOSE' })
  const handlePrev = () => dispatch({ type: 'PREV' })
  const handleNext = () => dispatch({ type: 'NEXT' })

  // 더미 데이터 정의
  const reviews = [
    {
      id: 1,
      userName: '9번 네스카페',
      rating: 5,
      date: '2024.01.15',
      content:
        '신선 사과 어머님이 좋고 심심하신 때 매인가메서 다른 집밥에서 신청하고는 심심 써셔 작년 좋아지시고 조치앤도 어머님 신쯥 매일가지네 다른 집밥 많이지다 좋아 던 많으신 어머 봐서 조자해도 신정 어머 저자곳 많이 더시 많 같네요',
      images: [
        'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200',
        'https://images.unsplash.com/photo-1543528176-61b239494933?w=200',
        'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=200',
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200',
      ],
    },
    {
      id: 2,
      userName: '사용자123',
      rating: 4,
      date: '2024.01.14',
      content: '배송도 빠르고 상품도 좋아요. 재구매 의사 있습니다!',
      images: [],
    },
    {
      id: 3,
      userName: '행복한구매자',
      rating: 5,
      date: '2024.01.13',
      content: '정말 좋아요! 또 구매할게요.',
      images: [],
    },
  ]

  return (
    <div className="min-x-[360px] lg:px-15">
      <div className="space-y-6">
        {/* 필터 버튼들 */}
        <div
          role="group"
          aria-label="리뷰 정렬 옵션"
          className="flex justify-end gap-2 border-b pb-4"
        >
          {[
            { id: 'latest', label: '최신순으로' },
            { id: 'rating', label: '별점순으로' },
            { id: 'photo', label: '사진 가격' },
          ].map((button, index, array) => (
            <button
              key={button.id}
              onClick={() => setSortType(button.id)}
              aria-pressed={sortType === button.id}
              className={`text-body-sm cursor-pointer border-r border-r-gray-300 px-4 py-2 ${
                index == array.length - 1 && 'border-none'
              } ${sortType === button.id && 'font-bold text-gray-500'} `}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <ReviewsComponent
              key={review.id}
              review={review}
              onImageClick={handleImageClick}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-15.5 w-fit">
        <Pagination
          onPageChange={(page) => {
            console.log(page)
          }}
        />
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
  )
}
