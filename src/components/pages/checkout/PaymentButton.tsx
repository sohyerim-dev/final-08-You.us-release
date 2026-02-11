'use client';

import Button from '@/components/common/Button';
import { PaymentButtonProps } from '@/types/checkout.types';
import { toast } from 'react-toastify';

export default function PaymentButton({
  paymentMethod,
  agreePayment,
  onOrder,
  onCardPayment,
  isLoading,
}: PaymentButtonProps) {
  const handleClick = async () => {
    if (!agreePayment) {
      toast.warn('주문 내용 확인 및 결제 동의를 체크해주세요.');
      return;
    }

    if (paymentMethod === 'deposit') {
      // 무통장입금
      await onOrder();
    } else if (paymentMethod === 'card') {
      // 카드결제
      await onCardPayment();
    }
  };
  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={!agreePayment || isLoading}
      className="bg-primary hover:bg-primary-hover mt-6 w-full rounded-full py-4 text-lg font-bold text-white"
    >
      {isLoading ? '주문 처리중...' : '주문하기'}
    </Button>
  );
}
