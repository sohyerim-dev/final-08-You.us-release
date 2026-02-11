import { OrderItem } from '@/types/checkout.types';
import Image from 'next/image';

interface OrderItemsProps {
  items: OrderItem[];
}

export default function OrderItems({ items }: OrderItemsProps) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section aria-labelledby="order-products-title">
      <header className="mb-3 flex items-center justify-between">
        <h2
          id="order-products-title"
          className="text-body-lg flex items-baseline gap-1 font-medium"
        >
          <span>주문상품</span>
          <span className="sr-only">총 수량 {totalQuantity}개</span>
          <span aria-hidden="true">({totalQuantity})</span>
        </h2>
      </header>

      <ul aria-label="주문 상품 목록" className="border-primary border-t">
        {items.map((item, index) => (
          <li
            key={index}
            className="px-button-y border-primary flex w-full items-center gap-3 border border-x-0 border-t-0 bg-white py-2.5"
          >
            <figure className="shrink-0">
              <div className="aspect-square h-16 overflow-hidden rounded-xl border border-red-400">
                <Image
                  src={item.image.path}
                  width={64}
                  height={64}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>

            <div className="min-w-0 flex-1">
              <h3 className="text-body-md truncate font-medium text-gray-900">
                {item.name}
              </h3>

              <p className="text-body-sm mt-1 flex items-center gap-1 text-gray-900">
                <span aria-label="가격">{item.price.toLocaleString()}원</span>
                <span className="text-gray-500" aria-hidden="true">
                  ×
                </span>
                <span className="text-gray-500" aria-label="수량">
                  {item.quantity}개
                </span>
              </p>

              {/* size와 color가 있으면 표시 */}
              {(item.size || item.color) && (
                <p className="text-body-sm mt-1 text-gray-500">
                  {item.size && <span>사이즈: {item.size}</span>}
                  {item.size && item.color && <span> / </span>}
                  {item.color && <span>색상: {item.color}</span>}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
