import fetchClient from '@/lib/api/fetchClient';
import {
  CheckoutResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteCartResponse,
  OrderDetailResponse,
} from '@/types/checkout.types';

export default async function getCartItems() {
  const allCartItems = await fetchClient<CheckoutResponse>('/carts', {
    method: 'GET',
  });
  return allCartItems;
}

export async function createOrder(orderData: CreateOrderRequest) {
  const response = await fetchClient<CreateOrderResponse>('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
  return response;
}

export async function getOrderDetail(orderId: string) {
  const response = await fetchClient<OrderDetailResponse>(`/orders/${orderId}`);
  return response;
}

export async function deleteCartItems(cartIds: number[]) {
  const response = await fetchClient<DeleteCartResponse>('/carts', {
    method: 'DELETE',
    body: JSON.stringify({
      carts: cartIds,
    }),
  });
  return response;
}
