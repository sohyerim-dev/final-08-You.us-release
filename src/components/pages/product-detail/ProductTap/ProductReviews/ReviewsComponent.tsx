import Image from 'next/image'

export interface Review {
  id: number
  userName: string
  rating: number
  date: string
  content: string
  images: string[]
  userImage?: string
}

interface ReviewsComponentProps {
  review: Review
  onImageClick?: (images: string[], index: number) => void
}

export default function ReviewsComponent({
  review,
  onImageClick,
}: ReviewsComponentProps) {
  return (
    <div className="rounded border-gray-400 bg-gray-50 p-6">
      {/* 사용자 정보 */}
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          {review.userImage ? (
            <Image
              src={review.userImage}
              alt={review.userName}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <span className="text-lg text-gray-500">👤</span>
          )}
        </div>
        <div>
          <span className="font-medium">{review.userName}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">{review.date}</span>
        </div>
      </div>

      {/* 후기 이미지들 */}
      {review.images.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {review.images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onImageClick?.(review.images, index)}
              className="h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded border border-gray-200"
            >
              <Image
                src={img}
                alt={`후기 이미지 ${index + 1}`}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* 후기 내용 */}
      <p className="text-sm leading-relaxed text-gray-700">{review.content}</p>
    </div>
  )
}
