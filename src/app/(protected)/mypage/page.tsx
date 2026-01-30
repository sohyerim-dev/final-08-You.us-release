import Button from '@/components/common/Button'
import ProductCard from '@/components/common/ProductCard'
import MyPageSection from '@/components/pages/mypage/main/MyPageSection'
import OrderItem from '@/components/pages/mypage/orders/OrderItem'
import { order } from '@/components/pages/mypage/orders/OrderList'
import ProfileCard from '@/components/pages/mypage/profile/ProfileCard'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPage() {
  return (
    <main className="mx-auto mt-10 flex max-w-[1500PX] flex-col gap-8.5 px-4 pb-8.5 text-gray-900 md:px-8 lg:min-w-[52rem] lg:px-12">
      <h1 className="sr-only">마이페이지</h1>
      {/* 주문 내역, 포인트, 쿠폰 등 */}
      {/* 사용자 정보 요약 (이름, 이메일 등) */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'내 정보'} moreHref="/mypage/profile">
          <ProfileCard />
        </MyPageSection>
      </section>

      <section className="flex flex-col gap-2">
        <MyPageSection title={'주문/배송내역'} moreHref="/mypage/orders">
          {/* 주문 내역 카드 컴포넌트 */}
          <ul>
            {order.slice(0, 2).map((order) => (
              <OrderItem key={order.id} id={order.id} item={order.item} />
            ))}
          </ul>
        </MyPageSection>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between pb-1">
          <h2 className="llg:text-caption text-body-lg font-bold">나의 후기</h2>
          <Link
            href="/mypage/reviews"
            className="text-body-sm mt-2 place-self-start text-gray-500 sm:mt-0 sm:place-self-end"
          >
            <span className="sr-only">내 후기 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <div className="border-primary ml-3 flex flex-col items-stretch justify-between gap-2 border-y bg-white sm:flex-row sm:items-center">
              <div className="flex flex-row items-center sm:flex-1">
                <Image
                  src="/images/products/mypage/image-food-fish.png"
                  alt="상품이미지"
                  width={100}
                  height={100}
                  className="border-primary m-3 h-25 w-25 shrink-0 rounded-lg border-2 object-cover sm:m-5"
                />
                <div className="flex flex-col gap-2 pr-4 *:line-clamp-1 *:shrink-0 sm:mr-auto sm:p-0">
                  <p className="text-body-md line-clamp-1">
                    옥돔&갈치&민어굴비 세트
                  </p>
                  <p className="text-body-md">119,000원</p>
                  <p>
                    <span className="text-primary">★★★★★</span> <span>5/5</span>
                  </p>
                </div>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden shrink-0 place-self-end pr-3 pb-6.5 text-gray-300 lg:flex"
              >
                작성일 : 2026.01.01
              </time>
              <div className="flex w-full shrink-0 flex-col gap-2 p-4 sm:w-auto sm:p-2">
                <Link href="/mypage/reviews/2" className="w-full sm:w-auto">
                  <Button
                    aria-label="내가 쓴 후기 보기"
                    className="text-body-sm py-button-y w-full px-7 whitespace-nowrap sm:w-auto"
                  >
                    내 후기 보기
                  </Button>
                </Link>
                <Link
                  href="/mypage/reviews/2/edit"
                  className="w-full sm:w-auto"
                >
                  <Button
                    aria-label="내 후기 수정하기"
                    variant="update"
                    className="text-body-sm w-full py-3.5 whitespace-nowrap hover:bg-gray-200 sm:w-auto"
                  >
                    수정하기
                  </Button>
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="border-primary ml-3 flex flex-col items-stretch justify-between gap-2 border-y bg-white sm:flex-row sm:items-center">
              <div className="flex flex-row items-center sm:flex-1">
                <Image
                  src="/images/products/mypage/image-food-meat.png"
                  alt="상품이미지"
                  width={100}
                  height={100}
                  className="border-primary m-3 h-25 w-25 shrink-0 rounded-lg border-2 object-cover sm:m-5"
                />
                <div className="flex flex-col gap-2 pr-4 *:line-clamp-1 *:shrink-0 sm:mr-auto sm:p-0">
                  <p className="text-body-md line-clamp-1">
                    횡성축협한우 1++ 프리미엄 1호
                  </p>
                  <p className="text-body-md">218,000원</p>
                  <p>
                    <span className="text-primary">★★★★★</span> <span>5/5</span>
                  </p>
                </div>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden shrink-0 place-self-end pr-3 pb-6.5 text-gray-300 lg:flex"
              >
                작성일 : 2026.01.01
              </time>
              <div className="flex w-full shrink-0 flex-col gap-2 p-4 sm:w-auto sm:p-2">
                <Link href="/mypage/reviews/2" className="w-full sm:w-auto">
                  <Button
                    aria-label="내가 쓴 후기 보기"
                    className="text-body-sm py-button-y w-full px-7 whitespace-nowrap sm:w-auto"
                  >
                    내 후기 보기
                  </Button>
                </Link>
                <Link
                  href="/mypage/reviews/2/edit"
                  className="w-full sm:w-auto"
                >
                  <Button
                    aria-label="내 후기 수정하기"
                    variant="update"
                    className="text-body-sm w-full py-3.5 whitespace-nowrap hover:bg-gray-200 sm:w-auto"
                  >
                    수정하기
                  </Button>
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-caption text-body-lg font-bold">찜한 선물</h2>
          <Link
            href="/mypage/wishlist"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">찜한 선물 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <div className="flex flex-row justify-center gap-4 p-4">
          <ProductCard
            key={1}
            id={1}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
          <ProductCard
            key={2}
            id={2}
            image={'/images/products/mypage/image-food-cookie.png'}
            name={'제니쿠키 4믹스 쿠키'}
            price={'26,877원'}
            rating={'5.0 ★'}
          />
          <div className="hidden sm:block">
            <ProductCard
              key={3}
              id={3}
              image={'/images/products/mypage/image-food-cookie.png'}
              name={'제니쿠키 4믹스 쿠키'}
              price={'26,877원'}
              rating={'5.0 ★'}
            />
          </div>
          <div className="hidden md:block">
            <ProductCard
              key={4}
              id={4}
              image={'/images/products/mypage/image-food-cookie.png'}
              name={'제니쿠키 4믹스 쿠키'}
              price={'26,877원'}
              rating={'5.0 ★'}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="lg:text-caption text-body-lg font-bold">나의 Q&A</h2>
          <Link
            href="/mypage/qna"
            className="text-body-sm place-self-end text-gray-500"
          >
            <span className="sr-only">내 문의 더보기</span>
            <span aria-hidden="true">&gt;</span>
            더보기
          </Link>
        </div>
        <ul>
          <li>
            <div className="ml-3 flex items-center justify-end gap-2 border-t border-gray-300 bg-white p-3">
              <div className="flex grow flex-col gap-1 *:line-clamp-1">
                <p className="text-body-sm shrink-0 text-gray-300 before:content-['>']">
                  횡성축협한우 1++ 프리미엄 1호
                </p>
                <Link href="/mypage/qna" className="text-body-md shrink-0">
                  세트 구성과 부위는 어떻게 되나요?
                </Link>
              </div>
              <time
                dateTime="2026-01-18"
                className="text-body-sm hidden text-gray-300 lg:flex"
              >
                2026.01.18
              </time>
              <p className="text-body-sm shrink-0 rounded-lg border-3 border-gray-400 px-6.5 py-2.5 text-black">
                답변대기중
              </p>
              {/* <Button variant="update" className="text-body-sm border-2 border-gray-100 hover:bg-gray-200">답변대기</Button> */}
            </div>
          </li>
          <li>
            <div className="ml-3 flex items-center justify-end gap-2 border-t border-gray-300 bg-white p-3">
              <div className="flex grow flex-col gap-1 *:line-clamp-1">
                <p className="text-body-sm shrink-0 text-gray-300 before:content-['>']">
                  횡성축협한우 1++ 프리미엄 1호
                </p>
                <Link href="/mypage/qna" className="text-body-md shrink-0">
                  선물용으로 구매해도 괜찮을까요?
                </Link>
              </div>
              <time
                dateTime="2026-01-01"
                className="text-body-sm hidden text-gray-300 lg:flex"
              >
                2026.01.01
              </time>
              <p className="text-body-sm shrink-0 rounded-lg border-3 border-blue-400 px-8 py-2.5 text-black">
                답변완료
              </p>
              {/* <Button className="text-body-sm border-3 text-gray-900 hover:text-gray-900 hover:bg-gray-300 border-blue-500 bg-white py-0 px-0">답변완료</Button> */}
            </div>
          </li>
        </ul>
      </section>
    </main>
  )
}
