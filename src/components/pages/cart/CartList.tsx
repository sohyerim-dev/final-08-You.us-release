'use client'

import Button from '@/components/common/Button'
import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import Image from 'next/image'
import Link from 'next/link'

export default function CartList() {
  return (
    <>
      <Header />

      <main className="pb-20 lg:pb-50">
        {/* 장바구니 제목 */}
        <h1 className="text-title-sm color-gray-900 font-pretendard mt-[55px] mb-[50px] ml-[25px] lg:mt-[50px] lg:mb-[57px] lg:ml-[225px]">
          장바구니
        </h1>

        {/* 전체선택 */}
        <section className="mx-auto mb-6 max-w-[1500px] px-4">
          <nav
            className="flex items-center justify-between"
            aria-label="장바구니 관리"
          >
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="ml-[20px] h-4 w-4 lg:ml-[35px]"
                id="select-all"
                aria-label="전체 상품 선택"
              />
              <span className="text-body-sm">전체선택 (0/1개)</span>
            </label>

            <button
              className="text-body-sm cursor-pointer rounded-sm border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 lg:mr-[465px]"
              aria-label="선택한 상품 삭제"
            >
              선택삭제
            </button>
          </nav>
        </section>

        {/* 장바구니 내용 */}
        <section className="w-full bg-gray-100 pt-[45px] pb-[60px] lg:pb-[80px]">
          <div className="mx-auto max-w-[1500px] px-4 py-4 lg:flex lg:gap-11">
            {/* 왼쪽: 장바구니 아이템 */}
            <section
              className="mb-6 flex-1 lg:mb-0"
              aria-labelledby="cart-items-title"
            >
              <h2 id="cart-items-title" className="sr-only">
                장바구니 상품 목록
              </h2>

              {/* 장바구니 아이템 카드 */}
              <article className="rounded border border-gray-300 bg-white px-[24px] pt-[24px] lg:px-[36px] lg:pt-[36px]">
                {/* 스토어 정보 */}
                <nav aria-label="Breadcrumb" className="mb-4">
                  <ol className="text-body-md flex items-center gap-2">
                    <li className="flex items-center gap-2">
                      <Link href="/" className="cursor-pointer">
                        향기좋은 향초나라
                      </Link>
                      <span aria-hidden="true" className="text-gray-400">
                        &gt;
                      </span>
                    </li>
                  </ol>
                </nav>

                {/* 상품 상세 */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  {/* 체크박스 */}
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    id="product-1"
                    aria-label="향기 좋은 향초 라벤더 상품 선택"
                  />

                  {/* 상품 이미지 */}
                  <figure className="relative h-24 w-24 shrink-0">
                    <Image
                      src="/images/cart/candle.png"
                      alt=""
                      fill
                      className="object-cover"
                      aria-hidden="true"
                    />
                  </figure>

                  {/* 상품 정보 */}
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    {' '}
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <h3 className="text-body-md mb-1">
                          선물 이름) 향기 좋은 향초 - 라벤더
                        </h3>
                        <p className="text-body-md text-gray-900">
                          향: 라벤더 향
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-body-sm cursor-pointer rounded-sm border border-gray-300 px-[60px] py-2 text-gray-900 max-[639px]:w-full max-[639px]:px-4 sm:self-start"
                        aria-label="상품 옵션 추가"
                      >
                        옵션추가
                      </button>
                    </div>
                    {/* 수량 및 가격 */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* 수량 조절 */}
                      <div className="flex items-center gap-2">
                        <button
                          className="text-body-sm mt-8 cursor-pointer rounded-sm border border-gray-300 px-3 py-1 text-gray-900"
                          aria-label="옵션 변경"
                        >
                          옵션변경
                        </button>

                        <fieldset
                          className="flex items-center gap-1"
                          role="group"
                          aria-label="수량 조절"
                        >
                          <legend className="sr-only">상품 수량</legend>
                          <button
                            className="text-body-sm mt-8 cursor-pointer rounded-sm border border-gray-300 px-2 py-1 text-gray-900"
                            aria-label="수량 감소"
                          >
                            -
                          </button>
                          <label htmlFor="quantity-1" className="sr-only">
                            상품 수량
                          </label>
                          <input
                            id="quantity-1"
                            type="number"
                            value="1"
                            readOnly
                            className="text-body-sm mt-8 w-15 rounded-sm border border-gray-300 px-2 py-1 text-center text-gray-900"
                            aria-label="현재 수량"
                          />
                          <button
                            className="text-body-sm mt-8 cursor-pointer rounded-sm border border-gray-300 px-2 py-1 text-gray-900"
                            aria-label="수량 증가"
                          >
                            +
                          </button>
                        </fieldset>
                      </div>

                      {/* 가격 및 삭제 */}
                      <div className="flex items-center gap-2">
                        <span
                          className="text-body-md mt-8 font-bold text-gray-900"
                          aria-label="상품 가격"
                        >
                          10,900원
                        </span>
                        <button
                          type="button"
                          aria-label="상품 삭제"
                          title="상품 삭제"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 주문 금액 */}
                <div className="mt-[55px] flex items-center justify-end gap-2 border-t border-gray-300 pt-9">
                  <span className="text-body-md mb-[98px] tracking-tighter text-gray-900">
                    주문 금액
                  </span>
                  <output
                    className="mb-[98px] text-lg font-bold"
                    aria-label="총 주문 금액"
                  >
                    10,900원
                  </output>
                </div>
              </article>
            </section>

            {/* 오른쪽: 주문 예상 금액 */}
            <aside
              className="w-full shrink-0 lg:w-105"
              aria-labelledby="order-summary-title"
            >
              <div className="rounded border border-gray-300 bg-white p-6 lg:px-8 lg:pt-12">
                <h2
                  id="order-summary-title"
                  className="text-body-lg mb-4 border-b border-gray-900 pb-4 font-bold"
                >
                  주문 예상 금액
                </h2>

                <dl className="space-y-3">
                  <div className="flex justify-between">
                    <dt className="text-body-sm text-gray-900">총 상품금액</dt>
                    <dd className="text-body-sm font-bold text-gray-900">
                      10,900원
                    </dd>
                  </div>
                  <div className="mb-8 flex justify-between">
                    <dt className="text-body-sm text-gray-900">배송비</dt>
                    <dd>0원</dd>
                  </div>
                </dl>

                <hr
                  className="my-4 border-t border-gray-300"
                  aria-hidden="true"
                />

                <dl className="mb-12">
                  <div className="flex items-center justify-between rounded-2xl">
                    <dt className="text-body-md">총 1건 주문 금액</dt>
                    <dd className="text-body-lg font-bold text-gray-900">
                      10,900원
                    </dd>
                  </div>
                </dl>

                <Link href="/checkout" className="mb-17 block w-full">
                  <Button
                    variant="primary"
                    className="w-full px-16 py-2 tracking-tighter lg:py-4"
                  >
                    주문하기
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
