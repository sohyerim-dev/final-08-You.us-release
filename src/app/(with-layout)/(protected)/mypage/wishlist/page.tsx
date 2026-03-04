'use client';

import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Loading from '@/components/ui/Loading';
import MoreButton from '@/components/ui/MoreButton';
import ProductCard from '@/features/product/ProductCard';
import { deleteBookmarkItems, getMyproduct } from '@/lib/api/mypage';
import { BookmarkItem } from '@/types/bookmark.types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function WishlistPage() {
  // 찜한 상품 목록 관리하는 상태
  const [products, setProducts] = useState<BookmarkItem[]>();
  // 더보기 버튼을 관리하는 상태
  const [visibleCount, setVisibleCount] = useState(() => {
    if (typeof window === 'undefined') return 8; // SSR 안전
    return window.matchMedia('(min-width: 1024px)').matches ? 12 : 8;
  });

  // 찜한 상품 목록을 불러오는 useEffect
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getMyproduct();
      const dataItem = data?.item;
      if (dataItem) {
        setProducts([...dataItem].sort((a, b) => b._id - a._id));
      }
    };

    fetchProducts();
  }, []);

  if (!products) {
    return <Loading />;
  }

  const handleDeleteBookmark = async (bookmarkId: number) => {
    setProducts((prev) => prev?.filter((p) => p._id !== bookmarkId));
    const response = await deleteBookmarkItems(bookmarkId);
    if (response.ok) {
      toast.success('찜한 상품이 삭제되었습니다.');
      // 삭제 성공 시, 찜한 상품 목록을 다시 불러오기
      const dataItem = data?.item;
      if (dataItem) {
        setProducts([...dataItem].sort((a, b) => b._id - a._id));
      }
      const data = await getMyproduct();
    } else {
      toast.error('찜한 상품 삭제 실패');
    }
  };

  return (
    <>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-4 lg:flex-row lg:py-10">
        <div className="flex-1">
          <h2 className="text-title-sm font-pretendard mb-3 pl-4 font-bold text-gray-900 lg:mb-6">
            찜한 선물
          </h2>
          {products && products.length > 0 ? (
            <div>
              <div
                className="grid grid-cols-2 gap-x-4 gap-y-4 p-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-5"
                role="list"
                aria-label="상품 목록"
              >
                {products.slice(0, visibleCount).map((bookmark) => (
                  <div key={bookmark.product._id} className="group relative">
                    {/* // 삭제 버튼 (X 아이콘) */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-4 right-3.5 z-1 h-3 w-3 cursor-pointer opacity-50 hover:opacity-100"
                      onClick={() => {
                        handleDeleteBookmark(bookmark._id);
                        console.log('Delete button clicked');
                      }}
                    >
                      <path
                        d="M26 2L2 26M2 2L26 26"
                        stroke="#1E1E1E"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <ProductCard
                      key={bookmark.product._id}
                      id={bookmark.product._id}
                      image={bookmark.product.mainImages[0]?.path || ''}
                      name={bookmark.product.name}
                      price={`${bookmark.product.price.toLocaleString()}`}
                      mainCategory={bookmark.product.extra.category[0] ?? ''}
                      subCategory={bookmark.product.extra.category[1] ?? ''}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              message="찜한 상품이 없습니다."
              action={
                <Link href="/products">
                  <Button tabIndex={-1} className="text-body-sm">
                    상품 보러가기
                  </Button>
                </Link>
              }
            />
          )}
          {/* 더보기 버튼 */}
          {products.length > visibleCount && (
            <div className="flex justify-center">
              <MoreButton
                className="m-4"
                onClick={() => {
                  const isDesktop = window.matchMedia(
                    '(min-width: 1024px)',
                  ).matches;
                  setVisibleCount((prev) => prev + (isDesktop ? 12 : 8));
                }}
              />
            </div>
          )}

          {/* 마이페이지로 돌아가는 버튼 */}
          <Link href="/mypage" className="w-75 lg:w-full">
            <Button
              tabIndex={-1}
              variant="update"
              className="text-body-sm mb-5 w-full"
            >
              마이페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
