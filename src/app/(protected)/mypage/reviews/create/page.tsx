import ReviewForm from '@/components/pages/mypage/reviews/ReviewForm'

// 더미 데이터 - 실제로는 orderItemId로 상품 정보 조회
const productInfo = {
  imageSrc: '/images/products/mypage/image-food-cookie.png',
  imageAlt: '제니쿠키 4믹스 쿠키 상품 이미지',
  name: '제니쿠키 4믹스 쿠키',
  price: '26,877원',
}

export default function ReviewCreatePage() {
  const today = new Date()
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace('.', '')

  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 md:px-8 lg:px-12">
      <h1 className="sr-only">후기 작성</h1>
      <ReviewForm mode="create" productInfo={productInfo} createdAt={today} />
    </main>
  )
}
