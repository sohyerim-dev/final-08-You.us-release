import Image from 'next/image'
import Link from 'next/link'

export default function OrderItems() {
  return (
    <section aria-labelledby="order-products-title">
      <header className="mb-3 flex items-center justify-between">
        <h2
          id="order-products-title"
          className="text-body-md flex items-baseline gap-1 font-medium"
        >
          <span>주문상품</span>
          <span className="sr-only">총 수량 1개</span>
          <span aria-hidden="true">(1)</span>
        </h2>

        <Link
          href="#"
          className="hidden items-center gap-1 text-xs text-gray-500 lg:flex"
        >
          <span aria-hidden="true">›</span>
          더보기
        </Link>
      </header>

      <ul aria-label="주문 상품 목록">
        <li className="px-button-y border-primary flex w-full items-center gap-3 border border-x-0 border-b-0 bg-white py-2.5">
          <figure className="shrink-0">
            <div className="aspect-square h-16 overflow-hidden rounded-xl border border-red-400">
              <Image
                src="/images/products/mypage/image-food-meat.png"
                width={64}
                height={64}
                alt="횡성축협한우 1++ 프리미엄 1호"
                className="h-full w-full object-cover"
              />
            </div>
          </figure>

          <div className="min-w-0 flex-1">
            <h3 className="text-body-sm truncate font-medium text-gray-900">
              횡성축협한우 1++ 프리미엄 1호
            </h3>

            <p className="mt-1 flex items-center gap-1 text-xs text-gray-900">
              <span aria-label="가격">218,000원</span>
              <span className="text-gray-500" aria-hidden="true">
                ×
              </span>
              <span className="text-gray-500" aria-label="수량">
                1개
              </span>
            </p>
          </div>
        </li>
      </ul>
    </section>
  )
}
