'use client';

import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import MyPageSection from '@/components/pages/mypage/main/MyPageSection';
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader';
import { getMyorder } from '@/lib/api/mypage';
import { Orders, OrderList } from '@/types/order.types';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/common/Loading';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [order, setOrder] = useState<Orders>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // 주문 목록 불러오기
    const fetchOrders = async () => {
      const data = await getMyorder();
      setOrder(data);
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h1 className="sr-only">주문 내역</h1>

      {/* 전체 주문 내역 리스트 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'주문/배송내역'}>
          {/* 주문 내역 카드 컴포넌트 */}
          <ul>
            {order && order.item.length > 0 ? (
              <>
                {order.item.map((orderItem: OrderList) => (
                  <li key={orderItem._id} className="mb-2">
                    <OrderStatusHeader
                      status={
                        orderItem.state === 'OS040' ? 'DELIVERED' : 'SHIPPING'
                      }
                      date={orderItem.createdAt}
                    />
                    <div className="border-primary ml-3 flex flex-col border-b bg-white lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-2 bg-white pr-2">
                        <Link
                          href={`/products/${orderItem.products[0]?.extra?.category[0] ?? ''}/${orderItem.products[0]?.extra?.category[1] ?? ''}/${orderItem.products[0]?._id}`}
                          className="shrink-0"
                        >
                          <Image
                            src={orderItem.products[0]?.image.path ?? ''}
                            alt={orderItem.products[0]?.image.name ?? ''}
                            width={100}
                            height={100}
                            className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
                          />
                        </Link>
                        <div className="leading-8 *:line-clamp-1">
                          <Link
                            href={`/products/${orderItem.products[0]?.extra?.category[0] ?? ''}/${orderItem.products[0]?.extra?.category[1] ?? ''}/${orderItem.products[0]?._id}`}
                            className="text-body-md line-clamp-1"
                          >
                            {orderItem.products[0]?.name}
                          </Link>
                          <p className="text-body-md">
                            {orderItem.cost.total.toLocaleString()}원
                          </p>
                          {orderItem.products.length > 1 && (
                            <p className="text-gray-500">
                              외 {orderItem.products.length - 1}건
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full shrink-0 flex-col gap-2 p-2 sm:w-auto lg:p-4">
                        <Link href={`/mypage/orders/${orderItem._id}`}>
                          <Button
                            aria-label="주문 상세 보기"
                            className="text-body-sm py-button-y w-full shrink-0"
                          >
                            주문상세
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
                <Link href="/mypage" className="w-75 lg:w-full">
                  <Button variant="update" className="text-body-sm w-full">
                    마이페이지로 돌아가기
                  </Button>
                </Link>
              </>
            ) : (
              <EmptyState
                message="주문한 상품이 없습니다."
                action={
                  <Link href="/products">
                    <Button className="text-body-sm">상품 보러가기</Button>
                  </Link>
                }
              />
            )}
          </ul>
        </MyPageSection>
      </section>
    </main>
  );
}
