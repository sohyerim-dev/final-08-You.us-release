'use client'

import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/common/Button'
import Header from '@/components/common/Header/Header'
import Footer from '@/components/common/Footer/Footer'

export default function CartEmpty() {
  return (
    <>
      <Header />

      <main>
        {/* 장바구니 제목 */}
        <h1 className="text-title-sm color-gray-900 font-pretendard mt-[55px] ml-[25px] lg:mt-[105px] lg:ml-[225px]">
          장바구니
        </h1>

        {/* 빈 장바구니 내용 */}
        <div className="flex min-h-screen items-center justify-center py-16">
          <section
            className="flex flex-col items-center px-4 text-center"
            aria-labelledby="cart-empty-title"
          >
            {/* 아이콘 */}
            <div className="mb-5 lg:mb-[32px]">
              <Image
                src="/images/cart/cart.svg"
                alt=""
                width={65}
                height={65}
                className="lg:hidden"
                priority
                aria-hidden="true"
              />
              <Image
                src="/images/cart/cart.svg"
                alt=""
                width={110}
                height={90}
                className="hidden lg:block"
                priority
                aria-hidden="true"
              />
            </div>

            {/* 제목 */}
            <h2
              id="cart-empty-title"
              className="lg:text-body-md mb-[30px] tracking-tighter text-gray-900 lg:mb-[22px]"
            >
              장바구니에 담긴 상품이 없습니다.
            </h2>

            {/* 버튼 */}
            <Link href="/" className="w-full">
              <Button
                variant="primary"
                className="px-16 py-2 tracking-tighter lg:w-full lg:py-4"
              >
                상품 보러가기
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
