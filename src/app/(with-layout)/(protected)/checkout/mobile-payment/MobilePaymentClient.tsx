'use client';

import Loading from '@/components/ui/Loading';
import { createOrder, deleteCartItems } from '@/lib/api/checkout';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function MobilePaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const impSuccess = searchParams.get('imp_success');
    const errorMsg = searchParams.get('error_msg');

    const process = async () => {
      if (impSuccess !== 'true') {
        setError(errorMsg || '결제에 실패했습니다.');
        return;
      }

      const raw = sessionStorage.getItem('pending_order');
      if (!raw) {
        setError('주문 정보를 찾을 수 없습니다. 다시 시도해주세요.');
        return;
      }

      const { products, address, cartItemIds } = JSON.parse(raw);

      try {
        const result = await createOrder({ products, address, state: 'OS020' });

        if (result.ok === 1) {
          sessionStorage.removeItem('pending_order');
          try {
            await deleteCartItems(cartItemIds);
          } catch {
            // 장바구니 삭제 실패는 주문 완료에 영향 없음
          }
          router.replace(`/checkout/result?orderId=${result.item._id}`);
        } else {
          setError('주문 생성에 실패했습니다. 고객센터에 문의해주세요.');
        }
      } catch {
        setError('주문 처리 중 오류가 발생했습니다. 고객센터에 문의해주세요.');
      }
    };

    process();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-body-md font-semibold text-gray-900">{error}</p>
        <a
          href="/checkout"
          className="text-primary text-body-sm underline underline-offset-4"
        >
          결제 페이지로 돌아가기
        </a>
      </div>
    );
  }

  return <Loading />;
}
