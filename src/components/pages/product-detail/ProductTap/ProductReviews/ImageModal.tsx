'use client'

import Image from 'next/image'

interface ImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ImageModal({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageModalProps) {
  return (
    <div
      tabIndex={0}
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') onPrev()
        if (e.key === 'ArrowRight') onNext()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        aria-label="모달 닫기"
        className="absolute top-6 right-6 text-3xl text-white hover:text-gray-300"
      >
        ✕
      </button>

      {/* 이전 버튼 */}
      {images.length > 1 && (
        <button
          onClick={onPrev}
          aria-label="이전 이미지"
          className="absolute left-6 text-5xl text-white hover:text-gray-300"
        >
          ‹
        </button>
      )}

      {/* 이미지 */}
      <div className="flex flex-col items-center">
        <Image
          src={images[currentIndex] ?? ''}
          alt={`이미지 ${currentIndex + 1}`}
          width={600}
          height={600}
          className="h-[30vh] w-auto max-w-[90vw] rounded object-contain"
        />
        {/* 인덱스 표시 */}
        {images.length > 1 && (
          <div className="mt-4 text-center text-white">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* 다음 버튼 */}
      {images.length > 1 && (
        <button
          onClick={onNext}
          aria-label="다음 이미지"
          className="absolute right-6 text-5xl text-white hover:text-gray-300"
        >
          ›
        </button>
      )}
    </div>
  )
}
