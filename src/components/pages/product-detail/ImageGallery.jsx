'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ImageGallery() {
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800',
    'https://images.unsplash.com/photo-1543528176-61b239494933?w=800',
    'https://images.unsplash.com/photo-1543528176-61b239494933?w=800',
    'https://images.unsplash.com/photo-1543528176-61b239494933?w=800',
  ]

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-4">
      {/* 큰 이미지 */}
      <div className="mx-auto max-w-80 overflow-hidden rounded-3xl bg-white shadow-xl lg:max-w-none">
        <div className="relative aspect-square">
          <Image
            width={600}
            height={600}
            src={images[currentImage]}
            alt="상품 이미지"
            className="h-full w-full object-cover"
          />

          {/* 점 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                aria-label={`${index + 1}번 이미지 보기`}
                className={`h-2 rounded-full transition-all ${
                  index === currentImage ? 'w-8 bg-rose-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 썸네일 + 화살표 */}
      <div className="flex items-center gap-3">
        <button
          onClick={goToPrevious}
          aria-label="이전 이미지"
          className="shrink-0 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 hover:bg-gray-50"
        >
          <svg
            className="h-5 w-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <div className="flex flex-1 gap-3 overflow-x-auto p-3.5">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-15 w-15 shrink-0 overflow-hidden rounded-md transition-all ${
                index === currentImage
                  ? 'text-primary ring-2'
                  : 'ring-2 ring-gray-200'
              } p-0.5`}
            >
              <Image
                width={500}
                height={500}
                src={img}
                alt={`썸네일 ${index + 1}`}
                className="h-full w-full rounded-md object-cover"
              />
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          aria-label="이후 이미지"
          className="shrink-0 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 hover:bg-gray-50"
        >
          <svg
            className="h-5 w-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
