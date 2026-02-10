'use client';

import Button from '@/components/common/Button';
import EmptyState from '@/components/common/EmptyState';
import ProductCard from '@/components/common/ProductCard';
import MyPageSection from '@/components/pages/mypage/main/MyPageSection';
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader';
import ProfileCard from '@/components/pages/mypage/profile/ProfileCard';
import { getMyorder, getMyproduct, getMyReviews } from '@/lib/api/mypage';
import { BookmarkItem } from '@/types/bookmark.types';
import { OrderList, Orders } from '@/types/order.types';
import { ReviewItem } from '@/types/review.types';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/common/Loading';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const [products, setProducts] = useState<BookmarkItem[]>();
  const [review, setReview] = useState<ReviewItem[]>();
  const [order, setOrder] = useState<Orders>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const [productResult, reviewResult, orderResult] =
        await Promise.allSettled([
          getMyproduct(),
          getMyReviews(),
          getMyorder(),
        ]);

      if (productResult.status === 'fulfilled') {
        setProducts(productResult.value?.item);
      }
      if (reviewResult.status === 'fulfilled') {
        setReview(reviewResult.value?.item);
      }
      if (orderResult.status === 'fulfilled') {
        setOrder(orderResult.value);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log('review', review);

  if (isLoading) return <Loading />;

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

      {/* 주문,배송내역 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'주문/배송내역'} moreHref="/mypage/orders">
          {/* 주문 내역 카드 컴포넌트 */}
          <ul>
            {order && order.item.length > 0 ? (
              <>
                {order.item.slice(0, 2).map((orderItem: OrderList) => (
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
                          >
                            <p className="text-body-md line-clamp-1">
                              {orderItem.products[0]?.name}
                            </p>
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

      {/* 내 후기 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'나의 후기'} moreHref="/mypage/reviews">
          {!review || review.length === 0 ? (
            <li className="flex min-h-50 items-center justify-center text-gray-400">
              작성하신 리뷰가 없습니다.
            </li>
          ) : (
            <ul className="flex flex-col gap-2">
              {review?.slice(0, 2)?.map((item) => (
                <li key={item._id}>
                  <div className="border-primary ml-3 flex flex-col items-stretch justify-between gap-2 border-y bg-white lg:flex-row lg:items-center">
                    <div className="flex flex-1 flex-row items-center">
                      <Image
                        src={item.product.image.path}
                        alt="상품이미지"
                        width={100}
                        height={100}
                        className="border-primary m-3 h-25 w-25 shrink-0 rounded-lg border-2 object-cover sm:m-5"
                      />
                      <div className="flex flex-col gap-2 pr-4 *:line-clamp-1 *:shrink-0 sm:mr-auto sm:p-0">
                        <p className="text-body-md line-clamp-1">
                          {item.extra.title}
                        </p>
                        <p className="text-body-md">{}</p>
                        <p className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`inline-block ${i < item.rating ? 'text-amber-300' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="px-1.5">{`${item.rating}/5`}</span>
                        </p>
                      </div>
                    </div>
                    <time
                      dateTime="2026-01-01"
                      className="text-body-sm hidden shrink-0 place-self-end pr-3 pb-6.5 text-gray-300 lg:flex"
                    >
                      작성일 : {item.createdAt}
                    </time>
                    <div className="flex w-full shrink-0 flex-col gap-2 p-4 sm:w-auto sm:p-2">
                      <Link
                        href={`/mypage/reviews/${item._id}/edit`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          aria-label="내 후기 보기"
                          className="text-body-sm w-full py-3.5 whitespace-nowrap lg:w-auto"
                        >
                          내 후기 보기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </MyPageSection>
      </section>

      {/* 찜한 선물 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'찜한 선물'} moreHref="/mypage/wishlist">
          {/* 모바일 */}
          <div className="grid grid-cols-2 grid-rows-1 gap-4 lg:hidden">
            {products?.slice(0, 2).map((bookmark) => (
              <ProductCard
                key={bookmark.product._id}
                id={bookmark.product._id}
                image={bookmark.product.mainImages[0]?.path || ''}
                name={bookmark.product.name}
                price={`${bookmark.product.price.toLocaleString()}`}
                mainCategory={bookmark.product.extra.category[0] ?? ''}
                subCategory={bookmark.product.extra.category[1] ?? ''}
              />
            ))}
          </div>
          {/* 데스크탑 */}
          <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-1 lg:gap-4">
            {products?.slice(0, 4).map((bookmark) => (
              <ProductCard
                key={bookmark.product._id}
                id={bookmark.product._id}
                image={bookmark.product.mainImages[0]?.path || ''}
                name={bookmark.product.name}
                price={`${bookmark.product.price.toLocaleString()}`}
                mainCategory={bookmark.product.extra.category[0] ?? ''}
                subCategory={bookmark.product.extra.category[1] ?? ''}
              />
            ))}
          </div>
        </MyPageSection>
      </section>

      {/* 문의하기 */}
      {/* <section className="flex flex-col gap-2">
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
            </div>
          </li>
        </ul>
      </section> */}
    </main>
  );
}
