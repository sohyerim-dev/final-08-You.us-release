'use client'

import Button from '@/components/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ReviewFormProps = {
  mode: 'create' | 'edit'
  productInfo: {
    imageSrc: string
    imageAlt: string
    name: string
    price: string
  }
  createdAt?: string
  initialData?: {
    rating: number
    content: string
    images: string[]
  }
}

export default function ReviewForm({
  mode,
  productInfo,
  createdAt,
  initialData,
}: ReviewFormProps) {
  const [rating, setRating] = useState(initialData?.rating || 0)
  const [content, setContent] = useState(initialData?.content || '')
  const [images] = useState<string[]>(initialData?.images || [])

  const title = mode === 'create' ? '후기 작성' : '후기 수정'
  const submitText = mode === 'create' ? '등록하기' : '수정하기'

  // 별점 렌더링
  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-xl"
          >
            <span className={star <= rating ? 'text-primary' : 'text-gray-300'}>
              ★
            </span>
          </button>
        ))}
        <span className="text-body-sm ml-1">{rating}/5</span>
      </div>
    )
  }

  // 이미지 업로드 핸들러 (UI만)
  const handleImageUpload = () => {
    // TODO: 실제 이미지 업로드 로직
  }

  // 폼 제출 핸들러 (UI만)
  const handleSubmit = () => {
    console.log({ rating, content, images })
  }

  return (
    <div>
      <div className="border-primary border-b p-4">
        <h2 className="text-body-lg font-bold">{title}</h2>
      </div>
      <div className="rounded border border-gray-200 bg-white">
        {/* 타이틀 */}

        {/* 상품 정보 */}
        <div className="border-primary flex items-end justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Image
              src={productInfo.imageSrc}
              alt={productInfo.imageAlt}
              width={60}
              height={60}
              className="h-15 w-15 shrink-0 rounded border border-gray-200 object-cover"
            />
            <div className="flex flex-col gap-1">
              <p className="text-body-md line-clamp-1 font-medium">
                {productInfo.name}
              </p>
              <p className="text-body-sm text-gray-600">{productInfo.price}</p>
              {renderStars()}
            </div>
          </div>
          {createdAt && (
            <span className="text-body-sm text-gray-500">
              작성일 : {createdAt}
            </span>
          )}
        </div>

        {/* 이미지 업로드 영역 */}
        <div className="border-primary flex gap-2 border-b p-4">
          {/* 업로드 버튼 */}
          <button
            type="button"
            onClick={handleImageUpload}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </button>

          {/* 업로드된 이미지 미리보기 */}
          {images.map((img, idx) => (
            <div key={idx} className="relative h-16 w-16 shrink-0">
              <Image
                src={img}
                alt={`리뷰 이미지 ${idx + 1}`}
                fill
                className="rounded border border-gray-200 object-cover"
              />
            </div>
          ))}
        </div>

        {/* 리뷰 텍스트 입력 */}
        <div className="p-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="&gt; 후기를 작성해주세요."
            className="text-body-md focus:border-primary h-32 w-full resize-none p-3 focus:outline-none"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 p-4">
          <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
            <Button variant="update" className="text-body-sm w-full">
              취소
            </Button>
          </Link>
          <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
            <Button className="text-body-sm w-full" onClick={handleSubmit}>
              {submitText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
