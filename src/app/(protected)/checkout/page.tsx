'use client'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import OrderItems from '@/components/pages/checkout/OrderItems'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CheckoutPage() {
  const [checked, setChecked] = useState(true)
  return (
    <div className="mx-auto max-w-5xl bg-gray-50 px-6.25 pt-6.25 lg:flex lg:flex-row lg:gap-37.5">
      <h1 className="sr-only">주문・결제 페이지</h1>
      <div className="mb-15 lg:w-200">
        <OrderItems />
        <form className="mt-7.5">
          {/* 주문자 정보 */}
          <fieldset className="mb-7.5 flex flex-col gap-2.5">
            <legend className="text-body-sm mb-2.5">주문자 정보</legend>
            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="ordererName">주문자</label>
              <span>|</span>
              <Input
                id="ordererName"
                name="ordererName"
                type="text"
                autoComplete="name"
                disabled
                placeholder="홍길동"
                wrapperClassName="flex-1"
                className="lg:w-82.5"
              />
            </div>

            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="ordererTel">연락처</label>
              <span>|</span>
              <Input
                id="ordererTel"
                name="ordererTel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="010-1234-5678"
                wrapperClassName="flex-1"
                className="lg:w-82.5"
                disabled
              />
            </div>

            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="ordererEmail">이메일</label>
              <span>|</span>
              <Input
                id="ordererEmail"
                name="ordererEmail"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="lg:w-82.5"
                placeholder="example@domain.com"
                wrapperClassName="flex-1"
                disabled
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center gap-2.5">
              <legend className="text-body-sm">배송지 정보</legend>
              <div className="flex flex-row items-center gap-1 text-[12px]">
                <Input
                  id="isDefaultAddress"
                  name="isDefaultAddress"
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <label htmlFor="isDefaultAddress">기본 배송지</label>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="receiverName">주문자</label>
              <span>|</span>
              <Input
                id="receiverName"
                name="receiverName"
                type="text"
                autoComplete="name"
                wrapperClassName="flex-1"
                placeholder="홍길동"
                className="lg:w-82.5"
              />
            </div>

            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="receiverTel">연락처</label>
              <span>|</span>
              <Input
                id="receiverTel"
                name="receiverTel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="010-1234-5678"
                wrapperClassName="flex-1"
                className="lg:w-82.5"
              />
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-row items-center gap-2.5 text-[12px]">
                <span id="addressLabel" className="shrink-0">
                  주소
                </span>
                <span>|</span>
                <div
                  role="group"
                  aria-labelledby="addressLabel"
                  className="flex w-full items-center gap-2.5"
                >
                  <Button className="text-primary border-primary shrink-0 border bg-white focus:text-white">
                    우편번호 찾기
                  </Button>

                  <label htmlFor="postalCode" className="sr-only">
                    우편번호
                  </label>

                  <Input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="03057"
                    className="text-center lg:w-36.25"
                    wrapperClassName="min-w-0 flex-1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="addressLine1" className="sr-only">
                  기본 주소
                </label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  autoComplete="address-line1"
                  placeholder="기본 주소"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="addressLine2" className="sr-only">
                  상세 주소
                </label>
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  autoComplete="address-line2"
                  placeholder="상세 주소"
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-2.5 text-[12px]">
              <label htmlFor="deliveryMemo" className="shrink-0 lg:w-82.5">
                배송메모
              </label>
              <span>|</span>
              <select
                id="deliveryMemo"
                name="deliveryMemo"
                defaultValue=""
                className="w-full appearance-none rounded-[10px] border border-gray-500 bg-white bg-[url('/icons/dropdown-arrow.svg')] bg-size-[14px_14px] bg-position-[right_12px_center] bg-no-repeat py-2.5 pr-10 pl-3"
              >
                <option value="" disabled>
                  배송메모를 선택해주세요
                </option>
                <option value="door">문 앞에 놓아주세요</option>
                <option value="call">배송 전 연락 부탁드려요</option>
                <option value="guard">경비실에 맡겨주세요</option>
                <option value="custom">직접 입력</option>
              </select>
            </div>

            {/* 직접 입력일 때만 노출 */}
            <div hidden>
              <label htmlFor="deliveryMemoCustom">배송메모 직접 입력</label>
              <Input
                id="deliveryMemoCustom"
                name="deliveryMemoCustom"
                type="text"
              />
            </div>
          </fieldset>

          <fieldset className="mt-7.5">
            <legend className="text-body-sm mb-2.5">쿠폰</legend>

            <div className="flex flex-row gap-2.5 text-[12px]">
              <label htmlFor="couponId" className="shrink-0">
                쿠폰선택
              </label>
              <span>|</span>
              <select
                id="couponId"
                name="couponId"
                defaultValue=""
                className="w-full appearance-none rounded-[10px] border border-gray-500 bg-white bg-[url('/icons/dropdown-arrow.svg')] bg-size-[14px_14px] bg-position-[right_12px_center] bg-no-repeat py-2.5 pr-10 pl-3 lg:w-82.5"
              >
                <option value="" disabled>
                  쿠폰을 선택해주세요
                </option>
                <option value="none">사용 안 함</option>
                <option value="coupon_10">10% 할인 쿠폰</option>
                <option value="coupon_ship">배송비 할인 쿠폰</option>
              </select>
            </div>
          </fieldset>

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
                  defaultChecked
                  className="peer sr-only"
                />
                <label
                  htmlFor="payDeposit"
                  className="peer-checked:border-primary peer-checked:text-primary flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-transparent py-3 text-sm font-medium text-gray-900"
                >
                  <Image
                    width={15}
                    height={15}
                    src="/icons/deposit-icon.svg"
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
          </fieldset>
        </form>
      </div>
      <section
        aria-labelledby="final-payment-title"
        className="mt-7.5 mb-7.5 h-fit rounded-[14px] border border-gray-200 bg-white px-6 py-7 lg:w-115"
      >
        <h2
          id="final-payment-title"
          className="text-primary border-primary text-body-sm inline-block border-b-2 pb-1 font-bold"
        >
          최종 결제 금액
        </h2>

        {/* 금액 표 */}
        <dl className="mt-6">
          <div className="flex items-center justify-between border-b border-gray-200 py-1">
            <dt className="text-[12px] font-medium text-gray-900">주문금액</dt>
            <dd className="text-[12px] text-gray-900">
              <data value="218000">218,000</data>
            </dd>
          </div>

          <div className="flex items-center justify-between border-b border-gray-200 py-1">
            <dt className="text-[12px] font-medium text-gray-900">할인</dt>
            <dd className="text-[12px] text-gray-400">
              <data value="-1000">-1,000</data>
            </dd>
          </div>

          <div className="flex items-center justify-between py-1">
            <dt className="text-[12px] font-medium text-gray-900">배송비</dt>
            <dd className="text-[12px] text-gray-900">
              <data value="3000">3,000</data>
            </dd>
          </div>
        </dl>

        {/* 총액 */}
        <div
          aria-live="polite"
          className="mt-5 flex items-baseline justify-end gap-6"
        >
          <strong className="text-body-sm font-bold text-gray-900">
            총 금액
          </strong>
          <strong className="text-primary text-body-sm font-extrabold">
            <data value="220000">220,000원</data>
          </strong>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* 동의 */}
        <div className="flex items-center gap-3">
          {/* 체크박스는 Input 말고 기본 input 권장 */}
          <input
            id="agreePayment"
            name="agreePayment"
            type="checkbox"
            required
            className="accent-primary h-3 w-3 shrink-0"
          />
          <label
            htmlFor="agreePayment"
            className="text-[12px] font-medium text-gray-900"
          >
            주문 내용 확인 및 결제 동의{' '}
            <span className="text-gray-900">(필수)</span>
          </label>
        </div>

        <ul className="mt-3 space-y-2 pl-6 text-[12px] text-gray-400">
          <li>
            <Link href="#" className="underline underline-offset-4">
              개인정보 수집 및 이용 동의
            </Link>
          </li>
          <li>
            <Link href="#" className="underline underline-offset-4">
              개인정보 제3자 정보 제공 동의
            </Link>
          </li>
          <li>
            <p className="mt-4 text-[12px] leading-relaxed text-gray-400">
              유어스의 일부 상품은 개별 판매(파트너)사의 상품이 포함되어 있으며,
              제공된 상품 정보 및 거래에 대한 책임은 판매자가 부담합니다.
            </p>
          </li>
        </ul>

        <button
          type="submit"
          className="bg-primary mt-6 w-full rounded-full py-4 text-lg font-bold text-white"
        >
          결제하기
        </button>
      </section>
    </div>
  )
}
