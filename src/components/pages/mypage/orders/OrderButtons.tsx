import Button from '@/components/common/Button'
import Link from 'next/link'

interface OrderButtonsProps {
  deliveryStatus: 'SHIPPING' | 'DELIVERED'
  reviewStatus: 'NONE' | 'WRITTEN'
}

export default function OrderButtons({
  deliveryStatus,
  reviewStatus,
}: OrderButtonsProps) {
  const isShipping = deliveryStatus === 'SHIPPING'

  return (
    <div className="flex flex-col gap-2 p-2 *:w-full lg:*:w-[162px]">
      <Link href="/mypage/orders/1">
        <Button
          aria-label="주문 상세 보기"
          className="text-body-sm py-button-y w-full shrink-0"
        >
          주문상세
        </Button>
      </Link>

      {isShipping ? (
        <Link href="/mypage/delivery">
          <Button
            aria-label="내 배송 조회하기"
            variant="update"
            className="text-body-sm w-full shrink-0"
          >
            배송현황
          </Button>
        </Link>
      ) : reviewStatus === 'NONE' ? (
        <Link href="/mypage/reviews/create">
          <Button
            aria-label="내 후기 쓰기"
            className="text-body-sm bg-primary-hover w-full"
          >
            후기쓰기
          </Button>
        </Link>
      ) : (
        <Link href="/mypage/reviews">
          <Button
            aria-label="내 후기 보기"
            variant="update"
            className="text-body-sm w-full"
          >
            내 후기 보기
          </Button>
        </Link>
      )}
    </div>
  )
}
