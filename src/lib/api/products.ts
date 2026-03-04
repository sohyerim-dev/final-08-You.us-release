import fetchClient from '@/lib/api/fetchClient';
import type { ProductResponse } from '@/types/product.types';

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
        sortParam = `&sort={"bookmarks":-1}`;
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
        sortParam = `&sort={"bookmarks":-1}`;
        break;
    }
  }

  // keywordParam
  const keywordParam = `&keyword=${encodeURIComponent(keyword)}`;

  const url = `/products?limit=8&page=${page}${keywordParam}${customFilter}${sortParam}`;
  return fetchClient<ProductResponse>(url);
}
