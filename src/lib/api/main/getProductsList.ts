import type { ProductResponse, ProductError } from '@/types/product.types';
import fetchClient from '@/lib/api/fetchClient';

// 카테고리별 상품 조회 (제일 많이 팔린순서 별로)
export default async function getMainCategorySeller(
  category: 'PC01' | 'PC03' | 'PC04',
): Promise<ProductResponse | ProductError> {
  try {
    return await fetchClient<ProductResponse>(
      `/products?custom={"extra.category":"${category}"}&sort={"buyQuantity":-1}&limit=12`,
      {
        requireAuth: false,
        cache: 'force-cache',
        next: {
          //   tags: ['posts'],
          revalidate: 1800, // 30분마다 자동 갱신
        },
      },
    );
  } catch (err) {
    return {
      ok: 0,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}
