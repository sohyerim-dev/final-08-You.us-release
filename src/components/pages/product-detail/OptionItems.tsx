'use client'

interface SelectedOptionItemProps {
  id: string
  name: string
  price: number
  quantity: number
  onQuantityChange: (id: string, newQuantity: number) => void
  onRemove?: (id: string) => void // optional로 변경
}

export default function SelectedOptionItem({
  id,
  name,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: SelectedOptionItemProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1)
    }
  }

  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1)
  }

  return (
    <div className="bg-category border-primary space-y-2 rounded border-2 p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <p className="text-body-sm text-primary font-bold">{name}</p>
        </div>
        {/* onRemove가 있을 때만 삭제 버튼 표시 */}
        {onRemove && (
          <button
            onClick={() => onRemove(id)}
            aria-label="옵션 삭제"
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="text-body-md flex items-center justify-between text-gray-500">
        <span className="">{price.toLocaleString()}원</span>

        {/* 수량 선택 */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            aria-label="수량 감소"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
          >
            <span className="text-gray-600">−</span>
          </button>
          <span className="w-8 text-center text-gray-900">{quantity}</span>
          <button
            onClick={handleIncrease}
            aria-label="수량 증가"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300"
          >
            <span className="text-gray-600">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}
