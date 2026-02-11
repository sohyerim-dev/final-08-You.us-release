'use client';

import CartListItem from '@/components/pages/cart/CartListItem';
import { ModalItem } from '@/components/pages/cart/CartPageClient';
import { CartItemOnList } from '@/types/cart.types';

interface CartListProps {
  items: CartItemOnList[]; // 장바구니 상품 배열
  updateItem: (_id: number, item: Partial<CartItemOnList>) => void; // 특정 상품 업데이트 함수
  setItems: (item: CartItemOnList[]) => void; // 전체 상품 목록 변경 함수
  setModalItem: (item: ModalItem) => void; // 모달에 표시할 상품 설정 함수
  setIsLoading: (loading: boolean) => void; // 로딩 상태 변경 함수
}

export default function CartList({
  items,
  setItems,
  updateItem,
  setModalItem,
  setIsLoading,
}: CartListProps) {
  return (
    <section className="mb-6 flex-1 lg:mb-0" aria-labelledby="cart-items-title">
      <h2 id="cart-items-title" className="sr-only">
        장바구니 상품 목록
      </h2>

      {items.map((item) => (
        <CartListItem
          key={item._id}
          item={item}
          items={items}
          setItems={setItems}
          updateItem={updateItem}
          setModalItem={setModalItem}
          setIsLoading={setIsLoading}
        />
      ))}
    </section>
  );
}
