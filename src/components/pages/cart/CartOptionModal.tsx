'use client'

import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'

export default function CartOptionModal() {
  const [selectedOption, setSelectedOption] = useState('옵션선택')
  const [quantity, setQuantity] = useState(1)

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900 opacity-80" />

      {/* 모달 컨텐츠 */}
      <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-[300px] -translate-x-1/2 -translate-y-1/2 rounded bg-gray-100 p-4 shadow-xl">
        {/* 상품 이미지 */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/images/products/Beauty/03.png"
            alt="상품"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* 상품명 */}
        <p className="text-body-sm mb-2 text-gray-900">
          선물 이름 예) 향기 좋은 향초 - 라벤더
        </p>

        {/* 가격 */}
        <p className="text-body-sm mb-4 font-bold">10,900원</p>

        {/* 옵션 선택 */}
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="text-body-sm mb-4 w-full cursor-pointer rounded-sm border border-gray-300 bg-gray-50 p-2 text-center"
        >
          <option>옵션변경</option>
          <option>옵션1</option>
          <option>옵션2</option>
        </select>

        {/* 수량 조절 */}
        <div className="mb-6 flex items-center justify-end gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            -
          </button>
          <span className="w-5 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-8 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-gray-50"
          >
            +
          </button>
        </div>

        {/* 취소/수정 버튼 */}
        <div className="flex gap-5">
          <Button className="flex-1 border border-gray-300 bg-gray-50 py-3 text-gray-900 hover:bg-gray-50 hover:text-gray-900">
            취소
          </Button>
          <Button className="flex-1 py-3 text-gray-50">수정</Button>
        </div>
      </div>
    </>
  )
}
