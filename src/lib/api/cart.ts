// src/lib/api/cart.ts

import fetchClient from '@/lib/api/fetchClient';
import {
  CartItemForCreate,
  CartListResponse,
  CartResponse,
} from '@/types/cart.types';

/**
 * 장바구니에 상품 추가
 */
export async function addToCart(
  cartData: CartItemForCreate,
): Promise<CartListResponse> {
  const url = '/carts';
  return fetchClient<CartListResponse>(url, {
    method: 'POST',
    body: JSON.stringify(cartData),
  });
}

/**
 * 장바구니에 상품 수정
 */
export async function updateCart(
  cartData: CartItemForCreate,
): Promise<CartListResponse> {
  const url = `/carts/${cartData._id}`;
  return fetchClient<CartListResponse>(url, {
    method: 'PATCH',
    body: JSON.stringify(cartData),
  });
}

/**
 * 장바구니 목록 조회
 */
export async function getCartItems(): Promise<CartListResponse> {
  const url = '/carts';
  return fetchClient<CartListResponse>(url);
}

/**
 * 장바구니 아이템 수량 수정
 */
export async function updateCartItem(
  cartId: number,
  updates: { quantity: number },
): Promise<CartResponse> {
  const url = `/carts/${cartId}`;
  return fetchClient<CartResponse>(url, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}

/**
 * 장바구니 아이템 삭제
 */
export async function deleteCartItem(cartId: number): Promise<{ ok: number }> {
  const url = `/carts/${cartId}`;
  return fetchClient<{ ok: number }>(url, {
    method: 'DELETE',
  });
}
