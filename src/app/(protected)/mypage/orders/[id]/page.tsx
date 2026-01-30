import Button from '@/components/common/Button'
import Link from 'next/dist/client/link'

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params

  return (
    <div className="min-h-[500px]">
      <h1>주문 상세 - {id}</h1>
      {/* 주문 상품, 배송 정보, 결제 정보 */}
      <Link href="/mypage/orders" className="w-75 lg:w-40.5">
        <Button variant="update" className="text-body-sm w-full">
          주문 목록으로 돌아가기
        </Button>
      </Link>
      <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
        <Button variant="update" className="text-body-sm w-full">
          후기 목록으로 돌아가기
        </Button>
      </Link>
    </div>
  )
}
