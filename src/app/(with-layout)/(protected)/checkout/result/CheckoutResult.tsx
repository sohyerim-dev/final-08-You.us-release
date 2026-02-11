'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getOrderDetail } from '@/lib/api/checkout';
import { OrderDetailResponse } from '@/types/checkout.types';
import { fetchServerCartCount } from '@/lib/zustand/cartStore';
import Loading from '@/components/common/Loading';
import { toast } from 'react-toastify';

export default function CheckoutResult() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [orderData, setOrderData] = useState<
    OrderDetailResponse['item'] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderDetail = async () => {
      try {
        const result = await getOrderDetail(orderId);
        if (result.ok === 1) {
          setOrderData(result.item);
          await fetchServerCartCount();
        }
      } catch (error) {
        console.error('주문 조회 실패:', error);
        toast.error('주문 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (isLoading) {
    return <Loading />;
  }

  if (!orderData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        주문 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const isDeposit = orderData.state === 'OS010';
  const isCardPayment = orderData.state === 'OS020';

  // 무통장입금 계좌 정보 (더미)
  const bankInfo = {
    bankName: '국민은행',
    accountNumber: '123-456-789012',
    accountHolder: '유어스',
    deadline: '2일 이내',
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* 주문 완료 헤더 */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-5xl">✓</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isCardPayment ? '결제가 완료되었습니다' : '주문이 완료되었습니다'}
        </h1>
        <p className="mt-2 text-gray-600">주문번호: {orderData._id}</p>
      </div>

      {/* 무통장입금 안내 - OS010일 때만 표시 */}
      {isDeposit && (
        <section className="border-primary mb-8 rounded-lg border bg-[#FFF5F7] p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">입금 안내</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">은행명</dt>
              <dd className="text-gray-900">{bankInfo.bankName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">계좌번호</dt>
              <dd className="text-gray-900">{bankInfo.accountNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">예금주</dt>
              <dd className="text-gray-900">{bankInfo.accountHolder}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-gray-700">입금 기한</dt>
              <dd className="font-semibold text-red-600">
                {bankInfo.deadline}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-gray-600">
            * 입금 기한 내에 입금하지 않으시면 자동으로 주문이 취소됩니다.
          </p>
        </section>
      )}

      {/* 카드결제 완료 안내 - OS020일 때만 표시 */}
      {isCardPayment && (
        <section className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-2 text-lg font-bold text-gray-900">결제 완료</h2>
          <p className="text-sm text-gray-700">
            카드 결제가 정상적으로 완료되었습니다.
            <br />
            주문하신 상품은 빠르게 배송해드리겠습니다.
          </p>
        </section>
      )}

      {/* 주문 상품 목록 */}
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">주문 상품</h2>
        <div className="space-y-4">
          {orderData.products.map((product, index) => (
            <div
              key={index}
              className="flex gap-4 border-b pb-4 last:border-b-0"
            >
              {product.image?.path && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={product.image.path}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{product.name}</p>
                <div className="mt-1 text-sm text-gray-600">
                  {product.size && <span>사이즈: {product.size} </span>}
                  {product.color && <span>색상: {product.color}</span>}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  수량: {product.quantity}개
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  {(product.price / product.quantity).toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 결제 금액 */}
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">결제 금액</h2>
        <dl className="space-y-2">
          <div className="flex justify-between text-sm">
            <dt className="text-gray-700">상품 금액</dt>
            <dd className="text-gray-900">
              {orderData.cost.products.toLocaleString()}원
            </dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-700">배송비</dt>
            <dd className="text-gray-900">
              {orderData.cost.shippingFees.toLocaleString()}원
            </dd>
          </div>
          <div className="flex justify-between border-t pt-2 text-base font-bold">
            <dt className="text-gray-900">총 결제 금액</dt>
            <dd className="text-blue-600">
              {orderData.cost.total.toLocaleString()}원
            </dd>
          </div>
        </dl>
      </section>

      {/* 배송지 정보 */}
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">배송지 정보</h2>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="font-medium text-gray-700">주소</dt>
            <dd className="mt-1 text-gray-900">{orderData.address.value}</dd>
          </div>
        </dl>
      </section>

      {/* 버튼 */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex-1 rounded-lg border border-gray-300 bg-white py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
        >
          쇼핑 계속하기
        </Link>
        <Link
          href="/mypage/orders"
          className="bg-primary hover:bg-primary-hover flex-1 rounded-lg py-3 text-center font-medium text-white"
        >
          주문 내역 보기
        </Link>
      </div>
    </div>
  );
}
