'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/common/ProductCard';
import ProductSort from '@/components/pages/products/ProductSort';
import {
  getProducts,
  getFilteredProducts,
  searchProducts,
} from '@/lib/api/products';
import Link from 'next/link';
import type { ProductItem } from '@/types/product.types';
import { useCategoryStore } from '@/lib/zustand/categoryStore';
import Loading from '@/components/common/Loading';

export default function ProductListClient({
  params,
}: {
  params: Promise<{ categories?: string[] }>;
}) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [sortOption, setSortOption] = useState<
    'price_high' | 'price_low' | 'latest' | 'bookmarks'
  >('latest');
  const [activeSort, setActiveSort] = useState<string>('latest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const category = categories[0];
  const subCategory = categories[1];

  //카테고리 목록 가져오기
  const categoryList = useCategoryStore((state) => state.categories);

  // 카테고리 코드 → 이름 변환
  const breadcrumbData = useMemo(() => {
    if (!category) {
      return { mainName: null, subName: null };
    }

    console.log('categoryList', categoryList);
    // 대분류 찾기
    const mainCategory = categoryList.find((cat) => cat.code === category);
    const mainName = mainCategory?.value || null;

    // 소분류 찾기
    let subName = null;
    if (subCategory && mainCategory?.sub) {
      const subCat = mainCategory.sub.find((s) => s.code === subCategory);
      subName = subCat?.value || null;
    }

    return { mainName, subName };
  }, [category, subCategory, categoryList]);

  useEffect(() => {
    const loadInitialData = async () => {
      const resolvedParams = await params;
      const cats = resolvedParams.categories || [];
      setCategories(cats);

      // 검색어가 있으면 검색
      if (keyword) {
        const res = await searchProducts(keyword);
        setProducts(res.item);
        setIsInitialized(true);
      } else {
        const res = await getProducts(cats[0], cats[1]);
        setProducts(res.item);
        setIsInitialized(true);
      }
    };

    loadInitialData();
  }, [params, keyword]);

  // 정렬 옵션 변경 시
  useEffect(() => {
    // 검색 모드
    if (keyword) {
      const fetchSearchProducts = async () => {
        try {
          setIsLoading(true);
          const res = await searchProducts(keyword, undefined, sortOption, 1);
          setProducts(res.item);
          setPage(1);
          setHasMore(res.item.length === 8);
        } catch (error) {
          console.error('검색 실패:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSearchProducts();
      return;
    }

    // 카테고리 모드
    if (!category) return;

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await getFilteredProducts(
          category,
          subCategory,
          sortOption,
          1,
        );
        setProducts(res.item);
        setPage(1);
        setHasMore(res.item.length === 8);
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption, category, subCategory, keyword]);

  // 더보기 버튼 클릭
  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;

      let res;
      if (keyword) {
        // 검색 모드
        res = await searchProducts(keyword, undefined, sortOption, nextPage);
      } else {
        // 카테고리 모드
        res = await getFilteredProducts(
          category,
          subCategory,
          sortOption,
          nextPage,
        );
      }

      setProducts((prev) => [...prev, ...res.item]);
      setPage(nextPage);
      setHasMore(res.item.length === 8);
    } catch (error) {
      console.error('상품 더 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSort = (
    option: 'price_high' | 'price_low' | 'latest' | 'bookmarks',
  ) => {
    setSortOption(option);
    setActiveSort(option);
  };

  // 초기 데이터 로딩 전에는 빈 화면 (깜빡임 방지)
  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-375">
      <main className="w-full bg-gray-50 py-8">
        <div className="px-4">
          {keyword ? (
            // 검색 결과 헤더
            <div className="mb-6">
              <h1 className="text-title-sm font-pretendard font-bold text-gray-900">
                &quot;{keyword}&quot; 검색 결과
              </h1>
              <p className="text-body-md mt-2 text-gray-600">
                총 {products.length}개의 상품
              </p>
            </div>
          ) : (
            <nav aria-label="breadcrumb" className="mb-6 ml-4 lg:mb-8 lg:ml-3">
              <ol className="text-body-sm flex items-center gap-1 text-gray-900">
                {/* 홈 */}
                <li>
                  <Link
                    href="/"
                    className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                  >
                    홈
                  </Link>
                </li>

                {/* 전체 상품 (카테고리 없을 때) */}
                {!category && (
                  <>
                    <li aria-hidden="true">
                      <span className="text-gray-900">&gt;</span>
                    </li>
                    <li>
                      <span
                        className="text-body-md text-gray-900"
                        aria-current="page"
                      >
                        전체 상품
                      </span>
                    </li>
                  </>
                )}

                {/* 대분류 */}
                {breadcrumbData.mainName && (
                  <>
                    <li aria-hidden="true">
                      <span className="text-gray-900">&gt;</span>
                    </li>
                    <li>
                      {breadcrumbData.subName ? (
                        <Link
                          href={`/products/${category}`}
                          className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                        >
                          {breadcrumbData.mainName}
                        </Link>
                      ) : (
                        <span
                          className="text-body-md text-gray-900"
                          aria-current="page"
                        >
                          {breadcrumbData.mainName}
                        </span>
                      )}
                    </li>
                  </>
                )}

                {/* 소분류 */}
                {breadcrumbData.subName && (
                  <>
                    <li aria-hidden="true">
                      <span className="text-gray-900">&gt;</span>
                    </li>
                    <li>
                      <span
                        className="text-body-md text-gray-900"
                        aria-current="page"
                      >
                        {breadcrumbData.subName}
                      </span>
                    </li>
                  </>
                )}
              </ol>
            </nav>
          )}

          {/* 정렬 버튼 */}
          <div className="mb-6 flex items-center gap-1 pb-4 lg:mb-[45px]">
            <button
              onClick={() => handleSort('latest')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'latest'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => handleSort('bookmarks')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'bookmarks'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              찜많은순
            </button>
            <button
              onClick={() => handleSort('price_high')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'price_high'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              높은가격순
            </button>
            <button
              onClick={() => handleSort('price_low')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'price_low'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              낮은가격순
            </button>
          </div>

          {/* 카테고리 제목 (검색이 아닐 때만) */}
          {!keyword && (
            <h1 className="text-title-sm font-pretendard mb-8 font-bold text-gray-900">
              {breadcrumbData.subName || breadcrumbData.mainName || '전체 상품'}
            </h1>
          )}

          {/* 상품 그리드 */}
          {products.length > 0 ? (
            <div
              className="mb-[100px] grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              role="list"
              aria-label={keyword ? '검색 결과' : '상품 목록'}
            >
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.mainImages[0]!.path}
                  name={product.name}
                  price={product.price.toLocaleString()}
                  rating={product.rating || 0}
                  replies={
                    typeof product.replies === 'number'
                      ? product.replies
                      : product.replies.length
                  }
                  mainCategory={product.extra.category[0]!}
                  subCategory={product.extra.category[1]!}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600">
                {keyword ? '검색 결과가 없습니다.' : '상품이 없습니다.'}
              </p>
              {keyword && (
                <p className="mt-2 text-sm text-gray-500">
                  다른 검색어로 다시 시도하세요.
                </p>
              )}
            </div>
          )}

          <ProductSort
            hasMore={hasMore}
            isLoading={isLoading}
            onLoadMore={handleLoadMore}
          />
        </div>
      </main>
    </div>
  );
}
