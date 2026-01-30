'use client'

import Link from 'next/link'

export default function ProductCard() {
  return (
    <li className="product-card p-button-y flex h-auto w-full flex-col rounded-[3%] border-2 border-[#E8E8E8] bg-white">
      <Link href="/products/food/vegetable/2" className="product-link">
        <figure className="product-image aspect-square w-full bg-gray-400"></figure>
        <h4 className="product-title mt-button-y text-[0.875rem]">
          프리미엄 과일 세트
        </h4>
        <p className="product-price">
          <strong className="text-primary font-bold">65,700원</strong>
        </p>
        <div className="flex flex-row justify-between">
          <div className="product-rating text-[0.75rem] text-[#999999]">
            <span aria-hidden="true">★</span>
            <span className="sr-only">평점</span>
            <span>5.0</span>
            <span className="review-count">(15)</span>
          </div>
          <span className="product-cta text-primary font-bold">상세보기</span>
        </div>
      </Link>
    </li>
  )
}
