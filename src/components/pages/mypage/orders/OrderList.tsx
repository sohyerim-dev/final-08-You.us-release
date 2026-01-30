import Button from '@/components/common/Button'
import EmptyState from '@/components/common/EmptyState'
import OrderItem from '@/components/pages/mypage/orders/OrderItem'
import Link from 'next/link'

type OrderData = {
  id: number
  item: {
    status: 'SHIPPING' | 'DELIVERED'
    date: string
    imageSrc: string
    imageAlt: string
    name: string
    price: string
    deliveryStatus: 'SHIPPING' | 'DELIVERED'
    reviewStatus: 'NONE' | 'WRITTEN'
    scope: { rating: number } | null
  }
}

export const order: OrderData[] = [
  {
    id: 1,
    item: {
      status: 'SHIPPING',
      date: '2026.01.23',
      imageSrc: '/images/products/mypage/image-food-apple.png',
      imageAlt: '상품이미지',
      name: '유명산지 사과세트 3.8kg(14~15입)',
      price: '254,900원',
      scope: null,
      deliveryStatus: 'SHIPPING',
      reviewStatus: 'NONE',
    },
  },
  {
    id: 2,
    item: {
      status: 'DELIVERED',
      date: '2026.01.23',
      imageSrc: '/images/products/mypage/image-food-cookie.png',
      imageAlt: '상품이미지',
      name: '제니쿠키 4믹스 쿠키',
      price: '26,877원',
      scope: null,
      deliveryStatus: 'DELIVERED',
      reviewStatus: 'NONE',
    },
  },
  {
    id: 3,
    item: {
      status: 'DELIVERED',
      date: '2026.01.02',
      imageSrc: '/images/products/mypage/image-food-fish.png',
      imageAlt: '상품이미지',
      name: '옥돔&갈치&민어굴비 세트',
      price: '119,000원',
      scope: { rating: 5 },
      deliveryStatus: 'DELIVERED',
      reviewStatus: 'WRITTEN',
    },
  },
  {
    id: 4,
    item: {
      status: 'DELIVERED',
      date: '2026.01.01',
      imageSrc: '/images/products/mypage/image-food-meat.png',
      imageAlt: '상품이미지',
      name: '횡성축협한우 1++ 프리미엄 1호',
      price: '218,000원',
      scope: { rating: 5 },
      deliveryStatus: 'DELIVERED',
      reviewStatus: 'WRITTEN',
    },
  },
]

export default function OrderList() {
  if (order.length === 0) {
    return (
      <EmptyState
        message="주문한 상품이 없습니다."
        action={
          <Link href="/products">
            <Button className="text-body-sm">상품 보러가기</Button>
          </Link>
        }
      />
    )
  }

  return (
    <ul>
      {order.map((item, id) => (
        <OrderItem key={id} {...item} />
      ))}
    </ul>
  )
}
