import Button from '@/components/common/Button';
import Link from 'next/link';

interface OrderButtonsProps {
  deliveryStatus: 'SHIPPING' | 'DELIVERED';
  reviewStatus: 'NONE' | 'WRITTEN';
}

export default function OrderButtons({
  deliveryStatus,
  reviewStatus,
}: OrderButtonsProps) {
  const isShipping = deliveryStatus === 'SHIPPING';

  return (
    <div className="flex w-full shrink-0 flex-col gap-2 p-4 sm:w-auto sm:p-2">
      <Link href="/mypage/orders/1">
        <Button
          tabIndex={-1}
          aria-label="주문 상세 보기"
          className="text-body-sm py-button-y w-full shrink-0"
        >
          주문상세
        </Button>
      </Link>

      {isShipping ? (
        <Link href="/mypage/delivery">
          <Button
            tabIndex={-1}
            aria-label="내 배송 조회하기"
            variant="update"
            className="text-body-sm w-full shrink-0 hover:bg-gray-200"
          >
            배송현황
          </Button>
        </Link>
      ) : reviewStatus === 'NONE' ? (
        <Link href="/mypage/reviews/create">
          <Button
            tabIndex={-1}
            aria-label="내 후기 쓰기"
            className="text-body-sm bg-primary"
          >
            후기쓰기
          </Button>
        </Link>
      ) : (
        <Link href="/mypage/reviews">
          <Button
            tabIndex={-1}
            aria-label="내 후기 보기"
            variant="update"
            className="text-body-sm py-button-y w-full px-7 whitespace-nowrap hover:bg-gray-200 sm:w-auto"
          >
            내 후기 보기
          </Button>
        </Link>
      )}
    </div>
  );
}
