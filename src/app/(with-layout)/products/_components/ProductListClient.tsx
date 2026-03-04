'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/features/product/ProductCard';
import ProductSort from '@/app/(with-layout)/products/_components/ProductSort';
import {
  getProducts,
  getFilteredProducts,
  searchProducts,
} from '@/lib/api/products';
import Link from 'next/link';
import type { ProductItem } from '@/types/product.types';
import { useCategoryStore } from '@/lib/zustand/categoryStore';
import Loading from '@/components/ui/Loading';
import { tagTranslations, TagKey, TAG_GROUPS } from '@/lib/constants/tags';

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

  // 선택된 태그 상태
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 태그 필터 열림/닫힘 상태
  const [isTagFilterOpen, setIsTagFilterOpen] = useState(false);

  const category = categories[0];
  const subCategory = categories[1];

  //카테고리 목록 가져오기
  const categoryList = useCategoryStore((state) => state.categories);

  // 카테고리 코드(이름 변환)
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
      const cats = resolvedParams.categories || ['PC00'];
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

  // 태그 필터링된 상품
  const filteredProducts = useMemo(() => {
    if (selectedTags.length === 0) return products;
    return products.filter((product) =>
      selectedTags.every((tag) => product.extra.tags?.includes(tag)),
    );
  }, [products, selectedTags]);

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

  // 태그 토글
  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
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
                총 {filteredProducts.length}개의 상품
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

          {/* 정렬 버튼 + 태그 필터 */}
          <div className="mb-4 flex items-center gap-1 pb-4 lg:mb-6">
            <button
              onClick={() => handleSort('latest')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'latest'
                  ? 'bg-gray-900 text-gray-50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              최신순
            </button>
            <button
              onClick={() => handleSort('bookmarks')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'bookmarks'
                  ? 'bg-gray-900 text-gray-50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              찜많은순
            </button>
            <button
              onClick={() => handleSort('price_high')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'price_high'
                  ? 'bg-gray-900 text-gray-50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              높은가격순
            </button>
            <button
              onClick={() => handleSort('price_low')}
              className={`text-body-md cursor-pointer rounded px-3 py-1.5 ${
                activeSort === 'price_low'
                  ? 'bg-gray-900 text-gray-50'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              낮은가격순
            </button>

            {/* 태그 필터 토글 버튼 - 낮은가격순 옆 */}
            <button
              onClick={() => setIsTagFilterOpen((prev) => !prev)}
              className="text-body-md flex cursor-pointer items-center gap-1 rounded border border-gray-300 bg-gray-50 px-2 py-1.5 text-gray-500 hover:border-gray-900 hover:text-gray-900"
            >
              태그 필터
              <span
                className={`transition-transform ${isTagFilterOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
          </div>
          {/* 태그 필터 드롭다운 박스 */}
          <div className="mb-6">
            {isTagFilterOpen && (
              <>
                {/* 바탕 클릭 시 닫히는 오버레이 */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsTagFilterOpen(false)}
                />
                <div className="relative z-20 mt-2 rounded-lg border border-gray-100 bg-gray-50 p-4 shadow-md">
                  {Object.entries(TAG_GROUPS).map(([groupName, tags]) => (
                    <div key={groupName} className="mb-3 last:mb-0">
                      <span className="text-body-sm mb-1.5 block font-semibold text-gray-500">
                        {groupName}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagToggle(tag)}
                            className={`text-body-sm rounded-full border px-3 py-1 transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-primary text-gray-50'
                                : 'border-gray-300 bg-gray-50 text-gray-900 hover:border-gray-500'
                            }`}
                          >
                            {tagTranslations[tag as TagKey] ?? tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 선택된 태그 칩 표시 */}
            {selectedTags.length > 0 && (
              <div className="mt-3 flex cursor-pointer flex-wrap items-center gap-2">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-body-sm bg-primary flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-gray-50"
                  >
                    # {tagTranslations[tag as TagKey] ?? tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-0.5 cursor-pointer text-gray-50"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-body-sm cursor-pointer text-gray-500 underline"
                >
                  전체 초기화
                </button>
              </div>
            )}
          </div>

          {/* 카테고리 제목 (검색이 아닐 때만) */}
          {!keyword && (
            <h1 className="text-title-sm font-pretendard mb-8 font-bold text-gray-900">
              {breadcrumbData.subName || breadcrumbData.mainName || '전체 상품'}
            </h1>
          )}

          {/* 상품 그리드 */}
          {isLoading ? (
            // 정렬 변경 시 로딩
            <div className="flex items-center justify-center py-20">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div
              className="mb-[100px] grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
              role="list"
              aria-label={keyword ? '검색 결과' : '상품 목록'}
            >
              {filteredProducts.map((product) => (
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
