import type { ProductResponse, ProductError } from '@/types/product.types';

// 카테고리별 상품 조회 (제일 많이 팔린순서 별로)
export default async function getMainCategorySeller(
  category: 'PC01' | 'PC03' | 'PC04',
): Promise<ProductResponse | ProductError> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID as string;

  try {
    const response = await fetch(
      `${API_URL}/products?custom={"extra.category":"${category}"}&sort={"buyQuantity":-1}&limit=12`,
      {
        headers: {
          'Client-Id': CLIENT_ID,
        },
        cache: 'force-cache',
        next: {
          //   tags: ['posts'],
          revalidate: 1800, // 5분마다 자동 갱신
        },
      },
    );

    const data = await response.json();

    return data;
  } catch (err) {
    return {
      ok: 0,
      message: err instanceof Error ? err.message : String(err),
    };
  }
}

//
