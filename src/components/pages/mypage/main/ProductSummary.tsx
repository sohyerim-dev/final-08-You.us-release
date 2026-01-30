import ReviewInfo from '@/components/pages/mypage/main/ReviewInfo'
import Image from 'next/image'

type ProductSummaryProps = {
  imageSrc: string
  imageAlt: string
  name: string
  price: number | string
  scope: { rating: number } | null
  deliveryStatus: 'SHIPPING' | 'DELIVERED'
  reviewStatus: 'NONE' | 'WRITTEN'
}

export default function ProductSummary({
  imageSrc,
  imageAlt,
  name,
  price,
  scope,
  deliveryStatus,
  reviewStatus,
}: ProductSummaryProps) {
  return (
    <div className="flex items-center gap-2 bg-white">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
      />
      <div className="leading-8 *:line-clamp-1">
        <p className="text-body-md line-clamp-1">{name}</p>
        <p className="text-body-md">{price}</p>
        <ReviewInfo
          deliveryStatus={deliveryStatus}
          reviewStatus={reviewStatus}
          scope={scope}
        />
      </div>
    </div>
  )
}
