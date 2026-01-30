'use client'

import Button from '@/components/common/Button'
import { useState } from 'react'
import SelectedOptionItem from '@/components/pages/product-detail/OptionItems'

interface SelectedOption {
  id: string
  name: string
  price: number
  quantity: number
  isDefault?: boolean
}

export default function ProductDetailInfo() {
  const price = 32000
  const productName =
    '딸기 이렇게 진짜 맛있을 수가 없다 인정? ❤️에게 줄까말까 진짜 고민하다 안줄래 ❤️ 3개 가격 / 인정이긴해'

  // 기본 상품 1개가 처음부터 있음
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption[]>([
    {
      id: 'default',
      name: productName,
      price: price,
      quantity: 1,
      isDefault: true,
    },
  ])
  const [selectValue, setSelectValue] = useState('')

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectValue(value)

    if (value && value !== '추가 옵션을 선택해주세요') {
      const exists = selectedOptions.find((opt) => opt.name === value)
      if (!exists) {
        const newOption: SelectedOption = {
          id: Date.now().toString(),
          name: value,
          price: price,
          quantity: 1,
          isDefault: false,
        }
        setSelectedOptions([...selectedOptions, newOption])
      }
      setSelectValue('')
    }
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setSelectedOptions(
      selectedOptions.map((opt) =>
        opt.id === id ? { ...opt, quantity: newQuantity } : opt,
      ),
    )
  }

  const handleRemove = (id: string) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== id))
  }

  const totalPrice = selectedOptions.reduce(
    (sum, opt) => sum + opt.price * opt.quantity,
    0,
  )

  return (
    <div className="relative h-full min-w-0">
      {/* 컨텐츠 영역 - 버튼 높이만큼 아래 여백 */}
      <div className="min-w-0 space-y-7 pb-20">
        {/* 카테고리 */}
        <p className="bg-category text-primary w-fit rounded-2xl p-1 text-sm">
          식품 &gt; 디저트
        </p>

        {/* 페이지 제목 - 스크린리더 전용 */}
        <h1 className="sr-only">상품 상세 페이지</h1>

        {/* 상품명 */}
        <h2 className="text-body-md font-bold wrap-break-word">
          딸기 이렇게 진짜 맛있을 수가 없다 인정? ❤️에게 줄까말까 진짜 고민하다
          안줄래 ❤️ 3개 가격 / 인정이긴해
        </h2>

        <p className="text-primary text-2xl font-bold">
          {price.toLocaleString()}원
        </p>

        <div className="space-y-2">
          <div className="flex min-w-0 items-center gap-3 border-t py-4">
            <label
              htmlFor="additional-option"
              className="text-body-sm shrink-0 text-gray-500"
            >
              추가 옵션
            </label>
            <select
              id="additional-option"
              className="w-full flex-1 rounded border border-gray-300 p-3 text-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50"
              value={selectValue}
              onChange={handleOptionSelect}
              disabled={true}
            >
              <option>추가 옵션을 선택해주세요</option>
              <option>딸기 프리미엄 세트 (대용량)</option>
              <option>딸기 선물용 고급 포장</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          {selectedOptions.map((option) => (
            <SelectedOptionItem
              key={option.id}
              id={option.id}
              name={option.name}
              price={option.price}
              quantity={option.quantity}
              onQuantityChange={handleQuantityChange}
              onRemove={option.isDefault ? undefined : handleRemove}
            />
          ))}
        </div>

        {/* 총 상품금액 */}
        <div className="flex items-center justify-between py-4">
          <span className="text-body-sm text-gray-600">총 상품금액</span>
          <span className="text-primary text-2xl font-bold">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      {/* 하단 버튼 - 절대 위치로 맨 아래 고정 */}
      <div className="absolute right-0 bottom-0 left-0 flex gap-3 pt-4">
        {/* 좋아요 버튼 */}
        <button
          aria-label="좋아요"
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded border border-gray-300"
        >
          <svg
            className="h-6 w-6 shrink-0 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* 알림 버튼 */}
        <button
          aria-label="알림 설정"
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded border border-gray-300"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <Button className="w-full rounded">장바구니</Button>
      </div>
    </div>
  )
}
