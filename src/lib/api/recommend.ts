import fetchClient from '@/lib/api/fetchClient';
import {
  GetRecommendProductsParams,
  Product,
  ProductListResponse,
  RecommendProductsResult,
} from '@/types/recommend.types';

/**
 * 태그로 상품 필터링
 */
function filterProductsByTags(products: Product[], tags: string[]): Product[] {
  return products.filter((product) => {
    const productTags = product.extra?.tags || [];
    return tags.every((tag) => productTags.includes(tag));
  });
}

/**
 * 추천 상품 목록 조회 (로그인 불필요)
 */
export async function getRecommendProducts({
  tags,
  minPrice,
  maxPrice,
  limit = 100,
}: GetRecommendProductsParams): Promise<RecommendProductsResult> {
  try {
    // params 생성
    const params: Record<string, string> = {
      limit: String(limit),
      ...(minPrice !== undefined && { minPrice: String(minPrice) }),
      ...(maxPrice !== undefined && { maxPrice: String(maxPrice) }),
    };

    // API 호출
    const response = await fetchClient<ProductListResponse>('/products', {
      method: 'GET',
      params,
    });

    // 에러 응답 처리
    if ('message' in response) {
      console.error('API 응답 에러:', response);
      return {
        ok: 0,
        message:
          (response.message as string) || '상품을 불러오는데 실패했습니다.',
        items: [],
        total: 0,
      };
    }

    // 4개 태그 모두 포함된 상품만 필터링
    const filteredProducts = filterProductsByTags(response.item || [], tags);

    return {
      ok: 1,
      items: filteredProducts,
      total: filteredProducts.length,
    };
  } catch (error) {
    console.error('상품 조회 오류:', error);
    return {
      ok: 0,
      message:
        error instanceof Error
          ? error.message
          : '상품을 불러오는데 실패했습니다.',
      items: [],
      total: 0,
    };
  }
}
