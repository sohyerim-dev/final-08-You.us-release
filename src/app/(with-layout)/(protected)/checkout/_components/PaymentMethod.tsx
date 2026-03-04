'use client';

import Image from 'next/image';
interface PaymentMethodProps {
  payment: string;
  setPayment: (value: string) => void;
}
export default function PaymentMethod({
  payment,
  setPayment,
}: PaymentMethodProps) {
  return (
    <fieldset>
      <legend className="text-body-sm mb-2.5">결제 수단</legend>

      <div
        role="radiogroup"
        aria-label="결제 수단 선택"
        className="flex gap-2 rounded-xl border border-gray-300 p-2"
      >
        {/* 무통장입금 */}
        <div className="flex-1">
          <input
            id="payDeposit"
            name="paymentMethod"
            type="radio"
            value="deposit"
            checked={payment === 'deposit'}
            onChange={() => setPayment('deposit')}
            className="peer sr-only"
          />
          <label
            htmlFor="payDeposit"
            className="peer-checked:border-primary peer-checked:text-primary flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-transparent py-3 text-sm font-medium text-gray-900"
          >
            <Image
              width={15}
              height={15}
              src={
                payment === 'deposit'
                  ? '/icons/deposit-icon.svg'
                  : '/icons/disabled-deposit-icon.svg'
              }
              alt=""
              aria-hidden="true"
            />
            무통장입금
          </label>
        </div>

        {/* 카드 결제 */}
        <div className="flex-1">
          <input
            id="payCard"
            name="paymentMethod"
            type="radio"
            value="card"
            checked={payment === 'card'}
            onChange={() => setPayment('card')}
            className="peer sr-only"
          />
          <label
            htmlFor="payCard"
            className="peer-checked:border-primary peer-checked:text-primary flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-transparent py-3 text-sm font-medium text-gray-900"
          >
            <span aria-hidden="true">$</span>
            카드 결제
          </label>
        </div>
      </div>

      {payment === 'card' && (
        <p className="text-body-sm mt-2 text-gray-400">
          카드 결제는 테스트 결제로 진행되며, 자정 무렵 자동 환불됩니다.
        </p>
      )}
    </fieldset>
  );
}
