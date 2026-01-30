import ReviewForm from '@/components/pages/mypage/reviews/ReviewForm'

// 더미 데이터 - 실제로는 reviewId로 리뷰 및 상품 정보 조회
const productInfo = {
  imageSrc: '/images/products/mypage/image-food-meat.png',
  imageAlt: '횡성축협한우 1++ 프리미엄 1호 상품 이미지',
  name: '횡성축협한우 1++ 프리미엄 1호',
  price: '218,000원',
}

const existingReview = {
  rating: 5,
  content:
    '부모님 선물로 주문했는데 정말 만족스러웠어요. 마블링이 고르게 퍼져 있고 색감이 너무 좋아서 개봉하자마자 신뢰가 갔습니다. 구워 먹으니 육즙이 풍부하고 잡내 없이 깔끔했어요. 명절 선물로도 손색없습니다.',
  images: ['/images/products/mypage/image-food-meat.png'],
  createdAt: '2026.01.20',
}

export default function ReviewEditPage() {
  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 md:px-8 lg:px-12">
      <h1 className="sr-only">후기 수정</h1>
      <ReviewForm
        mode="edit"
        productInfo={productInfo}
        createdAt={existingReview.createdAt}
        initialData={{
          rating: existingReview.rating,
          content: existingReview.content,
          images: existingReview.images,
        }}
      />
    </main>
  )
}
