import fetchClient from '@/lib/api/fetchClient';
import type { ProductResponse, ProductError } from '@/types/product.types';

// 메인페이지(식품, 뷰티, 쥬얼리 제일많이 팔리는 카테고리 호출)
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

export async function getProducts(
  category: string | undefined,
  subCategory: string | undefined,
): Promise<ProductResponse> {
  let customFilter = '';
  if (category !== 'PC00') {
    if (subCategory) {
      customFilter = `&custom={"extra.category.1":"${subCategory}"}`;
    } else if (category) {
      customFilter = `&custom={"extra.category.0":"${category}"}`;
    }
  }
  const url = `/products?limit=8${customFilter}`;
  return fetchClient<ProductResponse>(url);
}

export async function getFilteredProducts(
  category: string | undefined,
  subCategory: string | undefined,
  sortOption?: 'price_high' | 'price_low' | 'latest' | 'bookmarks',
  page: number = 1,
): Promise<ProductResponse> {
  let customFilter = '';
  if (category !== 'PC00') {
    if (subCategory) {
      customFilter = `&custom={"extra.category.1":"${subCategory}"}`;
    } else if (category) {
      customFilter = `&custom={"extra.category.0":"${category}"}`;
    }
  }

  let sortParam = '';
  if (sortOption) {
    switch (sortOption) {
      case 'price_high':
        sortParam = `&sort={"price":-1}`;
        break;
      case 'price_low':
        sortParam = `&sort={"price":1}`;
        break;
      case 'latest':
        sortParam = `&sort={"createdAt":-1}`;
        break;
      case 'bookmarks':
        sortParam = `&sort={"createdAt":1}`;
        break;
    }
  }

  const url = `/products?limit=8&page=${page}${customFilter}${sortParam}`;
  return fetchClient<ProductResponse>(url);
}

export async function searchProducts(
  keyword: string,
  category?: string,
  sortOption?: 'price_high' | 'price_low' | 'latest' | 'bookmarks',
  page: number = 1,
): Promise<ProductResponse> {
  // customFilter
  let customFilter = '';
  if (category && category !== 'PC00') {
    customFilter = `&custom={"extra.category.0":"${category}"}`;
  }

  // sortParam
  let sortParam = '';
  if (sortOption) {
    switch (sortOption) {
      case 'price_high':
        sortParam = `&sort={"price":-1}`;
        break;
      case 'price_low':
        sortParam = `&sort={"price":1}`;
        break;
      case 'latest':
        sortParam = `&sort={"createdAt":-1}`;
        break;
      case 'bookmarks':
        sortParam = `sort={"bookmarks":-1}`;
        break;
    }
  }

  // keywordParam
  const keywordParam = `&keyword=${encodeURIComponent(keyword)}`;

  const url = `/products?limit=8&page=${page}${keywordParam}${customFilter}${sortParam}`;
  return fetchClient<ProductResponse>(url);
}
