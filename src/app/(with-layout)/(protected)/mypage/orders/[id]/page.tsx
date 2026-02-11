'use client';

import { use, useState, useEffect } from 'react';
import Button from '@/components/common/Button';
import MyPageSection from '@/components/pages/mypage/main/MyPageSection';
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader';
import { getOrderDetail } from '@/lib/api/checkout';
import { OrderDetailResponse } from '@/types/checkout.types';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/common/Loading';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderDetailResponse['item'] | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const result = await getOrderDetail(id);
      if (result.ok === 1) {
        setOrder(result.item);
      } else {
        setIsError(true);
      }
    };
    fetchOrder();
  }, [id]);

  if (isError) {
    return (
      <div className="min-h-[500px]">
        <p className="text-body-md ml-2 text-gray-500">
          주문 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  if (!order) {
    return <Loading />;
  }

  return (
    <div className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <MyPageSection title={'주문/배송내역'}>
        <div className="mb-2">
          <OrderStatusHeader status={order.state} date={order.createdAt} />
          <ul>
            {order.products.map((product) => (
              <li
                key={product._id}
                className="border-primary ml-3 flex flex-col border-b bg-white lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-center gap-2 bg-white pr-2">
                  {product.image?.path && (
                    <Link
                      href={`/products/${product.extra?.category[0] ?? ''}/${product.extra?.category[1] ?? ''}/${product._id}`}
                      className="shrink-0"
                    >
                      <Image
                        src={product.image.path}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="border-primary m-5 h-25 w-25 shrink-0 rounded-lg border-2 object-cover"
                      />
                    </Link>
                  )}
                  <div className="leading-8 *:line-clamp-1">
                    <Link
                      href={`/products/${product.extra?.category[0] ?? ''}/${product.extra?.category[1] ?? ''}/${product._id}`}
                    >
                      <p className="text-body-md line-clamp-1">
                        {product.name}
                      </p>
                    </Link>
                    <p className="text-body-md">
                      {(product.price / product.quantity).toLocaleString()}원{' '}
                      <span className="text-body-sm text-gray-400">
                        X {product.quantity}개
                      </span>
                    </p>
                  </div>
                </div>
                {order.state === 'OS040' && (
                  <div className="flex w-full shrink-0 flex-col gap-2 p-2 sm:w-auto lg:p-4">
                    <Link href={`/mypage/reviews/create/${id}/${product._id}`}>
                      <Button
                        aria-label={`${product.name} 후기 쓰기`}
                        className="text-body-sm py-button-y w-full shrink-0"
                      >
                        후기쓰기
                      </Button>
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-4">
            <p className="text-body-sm mb-2 text-gray-500">
              배송비: {order.cost.shippingFees.toLocaleString()}원
            </p>
            <p className="text-body-lg font-bold text-gray-900">
              총 결제금액: {order.cost.total.toLocaleString()}원
            </p>
          </div>
        </div>
      </MyPageSection>
      <Link href="/mypage/orders" className="w-75 lg:w-full">
        <Button variant="update" className="text-body-sm w-full">
          주문 목록으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
