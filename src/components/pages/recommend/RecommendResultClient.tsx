'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import ProductList from '@/components/pages/recommend/ProductList';
import { getRecommendProducts } from '@/lib/api/recommend';
import type {
  Answer,
  RecommendResult as RecommendResultType,
} from '@/types/aitest.types';
import { Product } from '@/types/recommend.types';

export default function RecommendResultClient() {
  const router = useRouter();
  const [data, setData] = useState<{
    result: RecommendResultType;
    answers: Answer[];
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('recommend_data');

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setData(parsed);
      } catch (error) {
        console.error('데이터 파싱 실패:', error);
        router.push('/recommend');
      }
    } else {
      router.push('/recommend');
    }
  }, [router]);

  const a = (i: number) => data?.answers[i]?.value?.trim() ?? '';
  const stripGiftWord = (text: string) =>
    text.replace(/\s*선물\s*/g, '').trim();

  const isAllFilled = data ? [0, 1, 2, 3, 4, 5].every((i) => a(i)) : false;

  const searchParams = useMemo(() => {
    if (!data) return null;
    return {
      recipient: data.result.tags.recipient,
      gender: data.result.tags.gender,
      ageGroup: data.result.tags.ageGroup,
      occasion: data.result.tags.occasion,
      style: data.result.tags.style,
      minPrice: data.result.tags.priceRange.min,
      maxPrice: data.result.tags.priceRange.max,
    };
  }, [data]);

  useEffect(() => {
    if (!isAllFilled || !searchParams || hasFetched.current) return;

    hasFetched.current = true;

    const tags = [
      searchParams.recipient,
      searchParams.gender,
      searchParams.ageGroup,
      searchParams.occasion,
      searchParams.style,
    ].filter(Boolean);

    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const productResult = await getRecommendProducts({
          tags: tags,
          minPrice: searchParams.minPrice,
          maxPrice: searchParams.maxPrice,
          limit: 100,
        });

        if (productResult.ok) {
          setProducts(productResult.items);
        } else {
          alert(productResult.message);
        }
      } catch (error) {
        console.error('상품 조회 오류:', error);
        alert('상품을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAllFilled, searchParams]);

  const handleReset = () => {
    sessionStorage.removeItem('recommend_data');
    router.push('/recommend');
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">로딩중...</p>
      </div>
    );
  }

  if (!isAllFilled) return null;

  console.log('전체 result:', data.result);
  console.log('tags 객체:', data.result.tags);

  const tags = [
    data.result.tags.recipient,
    data.result.tags.gender,
    data.result.tags.ageGroup,
    data.result.tags.occasion,
    data.result.tags.style,
  ].filter(Boolean);

  console.log('대답', JSON.stringify(data.answers, null, 2));
  console.log('반환', JSON.stringify(data.result, null, 2));
  console.log('태그 배열:', tags);
  console.log('가격대:', data.result.tags.priceRange);
  console.log('필터링된 상품 수:', products.length);

  return (
    <div className="mx-auto bg-gray-50 lg:max-w-375 lg:min-w-5xl">
      <Header />
      <section className="mx-auto mt-15 mb-30 flex flex-col items-center gap-4 px-2.5 lg:max-w-375 lg:min-w-256.25">
        <h2 className="text-title-md">AI가 추천한 선물은 바로!!</h2>
        <h3 className="text-title-sm text-gary-900 w-fit border-gray-900 text-center">
          ({stripGiftWord(a(2))}) ({stripGiftWord(a(1))}) ({stripGiftWord(a(0))}
          )에게 선물하기 좋은 <br className="block lg:hidden" />(
          {stripGiftWord(a(5))}) ({stripGiftWord(a(4))}) ({stripGiftWord(a(3))})
          선물
        </h3>
        <Button type="button" className="mb-15 leading-4" onClick={handleReset}>
          다시 하기
        </Button>

        {isLoading ? (
          <div className="py-20 text-center">
            <p className="text-lg">상품을 불러오는 중...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg">조건에 맞는 상품이 없습니다.</p>
            <p className="mt-2 text-sm text-gray-500">
              다른 조건으로 다시 시도해주세요.
            </p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </section>
      <Footer />
    </div>
  );
}
