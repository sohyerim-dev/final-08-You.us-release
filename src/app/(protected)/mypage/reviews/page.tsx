import MyPageSection from '@/components/pages/mypage/main/MyPageSection'
import ReviewCard from '@/components/pages/mypage/reviews/ReviewCard'

// 더미 데이터 - 작성한 리뷰
const writtenReviews = [
  {
    id: 1,
    reviewId: 101,
    productId: 1,
    imageSrc: '/images/products/mypage/image-food-fish.png',
    imageAlt: '옥돔&갈치&민어굴비 세트 상품 이미지',
    name: '옥돔&갈치&민어굴비 세트',
    price: '119,000원',
    rating: 5,
    createdAt: '2026.01.02',
    reviewContent:
      '부모님 선물로 선택했는데 반응이 정말 좋았어요. 평소 쉽게 먹기 힘든 옥돔과 갈치, 민어굴비를 한 번에 받을 수 있어서 구성부터 만족스러웠고, 개별 포장이 깔끔해서 선물용으로 손색이 없었습니다. 비린내 없이 담백한 옥돔, 짭조름하게 잘 말린 민어굴비, 살이 오동통한 갈치까지 각각의 매력이 확실해서 밥상 차릴 때마다 다르게 즐길 수 있었어요. 신선도도 좋아 믿고 선물할 수 있는 세트라고 느꼈습니다.',
    reviewImages: ['/images/products/mypage/image-food-fish.png'],
  },
  {
    id: 2,
    reviewId: 102,
    productId: 2,
    imageSrc: '/images/products/mypage/image-food-meat.png',
    imageAlt: '횡성축협한우 1++ 프리미엄 1호 상품 이미지',
    name: '횡성축협한우 1++ 프리미엄 1호',
    price: '218,000원',
    rating: 5,
    createdAt: '2026.01.01',
    reviewContent:
      '부모님 선물로 주문했는데 정말 만족스러웠어요. 마블링이 고르게 퍼져 있고 색감이 너무 좋아서 개봉하자마자 신뢰가 갔습니다. 구워 먹으니 육즙이 풍부하고 잡내 없이 깔끔했어요. 명절 선물로도 손색없습니다.',
    reviewImages: ['/images/products/mypage/image-food-meat.png'],
  },
]

// 더미 데이터 - 리뷰 대기 중
const pendingReviews = [
  {
    id: 1,
    orderItemId: 201,
    productId: 3,
    imageSrc: '/images/products/mypage/image-food-cookie.png',
    imageAlt: '제니쿠키 4믹스 쿠키 상품 이미지',
    name: '제니쿠키 4믹스 쿠키',
    price: '26,877원',
  },
]

export default function ReviewsPage() {
  const userName = '홍길동'

  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h1 className="sr-only">나의 후기</h1>

      {/* 나의 후기 섹션 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title="나의 후기">
          <ul className="flex flex-col gap-4">
            {writtenReviews.map((review) => (
              <ReviewCard
                key={review.id}
                type="written"
                productId={review.productId}
                imageSrc={review.imageSrc}
                imageAlt={review.imageAlt}
                name={review.name}
                price={review.price}
                reviewId={review.reviewId}
                rating={review.rating}
                createdAt={review.createdAt}
                reviewContent={review.reviewContent}
                reviewImages={review.reviewImages}
              />
            ))}
          </ul>
        </MyPageSection>
      </section>

      {/* 후기 대기 섹션 */}
      {pendingReviews.length > 0 && (
        <section className="flex flex-col gap-2">
          <MyPageSection title={`${userName}님의 후기를 기다리고있어요!`}>
            <ul className="flex flex-col gap-4">
              {pendingReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  type="pending"
                  productId={review.productId}
                  imageSrc={review.imageSrc}
                  imageAlt={review.imageAlt}
                  name={review.name}
                  price={review.price}
                  orderItemId={review.orderItemId}
                />
              ))}
            </ul>
          </MyPageSection>
        </section>
      )}
    </main>
  )
}
