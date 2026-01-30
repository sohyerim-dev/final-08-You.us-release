// 상품 요약 타입
type ProductSummaryProps = {
  imageSrc: string
  imageAlt: string
  name: string
  price: number | string
}

// 주문 목록 타입
type OrderItemCardProps = {
  deliveryStatus: 'SHIPPING' | 'DELIVERED'
  reviewStatus: 'NONE' | 'WRITTEN'
  product: {
    image: string
    name: string
    price: string
  }
  date: string
}

// 리뷰 별점 타입
type ReviewInfoProps = {
  deliveryStatus: 'SHIPPING' | 'DELIVERED'
  reviewStatus: 'NONE' | 'WRITTEN'
  scope: Scope | null
}

// 별점 갯수 타입
type Scope = {
  rating: number // 1~5
}
