'use client';

import { useState, useEffect } from 'react';
import CartList from '@/components/pages/cart/CartList';
import CartEmpty from '@/components/pages/cart/CartEmpty';
import { getCartItems } from '@/lib/api/cart';
import { CartItemOnList } from '@/types/cart.types';
import Button from '@/components/common/Button';
import CartOptionModal from '@/components/pages/cart/CartOptionModal';
import Allcheck from '@/components/pages/cart/AllCheck';
import { useRouter } from 'next/navigation';

export interface ModalItem extends CartItemOnList {
  type: 'edit' | 'add';
}

export default function CartPageClient() {
  const [items, setItems] = useState<CartItemOnList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const [modalItem, setModalItem] = useState<ModalItem | null>(null);

  // 장바구니 데이터 불러오기
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setIsLoading(true);
        const response = await getCartItems();
        console.log('장바구니 데이터', response);

        const cartItems: CartItemOnList[] = response.item.map((item) => ({
          _id: item._id,
          product_id: item.product_id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          checked: true, // 초기값: 체크
          option: item.color,
          options: item.product.extra.options,
          image: item.product.image?.path || '',
          storeName: item.product.seller?.name || '',
        }));

        setItems(cartItems);
      } catch (error) {
        console.error('장바구니 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleOrder = () => {
    const idList = items
      .filter((item) => item.checked)
      .map((item) => item._id)
      .join(',');
    const url = `/checkout?id=${idList}`;
    router.push(url);
  };

  // 체크된 상품만 계산
  const checkedItems = items.filter((item) => item.checked);
  const totalPrice = checkedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = checkedItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // 체크된 상품이 있는지 확인
  const hasCheckedItems = checkedItems.length > 0;

  const updateItem = (_id: number, updates: Partial<CartItemOnList>) => {
    setItems(
      items.map((item) => (item._id === _id ? { ...item, ...updates } : item)),
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
      </div>
    );
  }

  if (items.length === 0) return <CartEmpty />;

  return (
    <>
      <main className="pb-20 lg:pb-50">
        <h1 className="text-title-sm color-gray-900 font-pretendard mt-[55px] mb-[50px] ml-[25px] lg:mt-[50px] lg:mb-[57px]">
          장바구니
        </h1>

        <Allcheck items={items} setItems={setItems} />

        <section className="w-full bg-gray-100 pt-[45px] pb-[60px] lg:pb-[80px]">
          <div className="mx-auto max-w-[1500px] px-4 py-4 lg:flex lg:gap-11">
            <CartList
              items={items}
              setItems={setItems}
              updateItem={updateItem}
              setModalItem={setModalItem}
              setIsLoading={setIsLoading}
            />

            <aside
              className="w-full shrink-0 lg:w-105"
              aria-labelledby="order-summary-title"
            >
              <div className="rounded border border-gray-300 bg-white p-6 lg:px-8 lg:pt-12">
                <h2
                  id="order-summary-title"
                  className="text-body-lg mb-5 border-b border-gray-900 pb-4 font-bold"
                >
                  주문 예상 금액
                </h2>

                <dl className="mb-2 space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-gray-900">총 상품금액</dt>
                    <dd className="text-body-sm font-bold text-gray-900">
                      {totalPrice.toLocaleString()}원
                    </dd>
                  </div>
                </dl>

                <dl className="mb-12">
                  <div className="flex items-center justify-between rounded-2xl">
                    <dt className="text-body-md">
                      총 {totalQuantity}건 주문 금액
                    </dt>
                    <dd className="text-body-lg font-bold text-gray-900">
                      {totalPrice.toLocaleString()}원
                    </dd>
                  </div>
                </dl>

                {/* 주문하기 버튼 */}
                <Button
                  onClick={handleOrder}
                  variant="primary"
                  disabled={!hasCheckedItems} // 비활성화
                  className="w-full px-16 py-2 tracking-tighter disabled:cursor-not-allowed disabled:opacity-50 lg:py-4"
                >
                  주문하기
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {modalItem && (
        <CartOptionModal
          modalItem={modalItem}
          setModalItem={setModalItem}
          setItems={setItems}
        />
      )}
    </>
  );
}
