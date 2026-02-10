export interface ProductImage {
  path: string;
}

export interface CheckoutItem {
  _id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  product: {
    _id: number;
    name: string;
    price: number;
    image: ProductImage;
    // 나머지는 나중에 필요할 때 추가
    [key: string]: any;
  };
}

export interface CheckoutResponse {
  ok: number;
  item: CheckoutItem[];
  cost: { shippingFees: number };
}

export interface OrderItem {
  _id: number;
  image: ProductImage;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface OrderProduct {
  _id: number;
  quantity: number;
  size?: string;
  color?: string;
}

export interface CreateOrderRequest {
  products: OrderProduct[];
}

export interface CreateOrderResponse {
  ok: 1 | 0;
  item: {
    _id: number;
    // 주문 정보
  };
}

// lib/api/order.ts
export interface OrderDetailResponse {
  ok: 1 | 0;
  item: {
    _id: number;
    products: Array<{
      _id: number;
      quantity: number;
      size?: string;
      color?: string;
      name: string;
      price: number;
      image?: {
        path: string;
      };
      extra?: {
        category: string[];
      };
    }>;
    createdAt: string;
    cost: {
      products: number;
      shippingFees: number;
      total: number;
    };
    address: {
      name: string;
      value: string;
    };
    state: string;
  };
}
export interface DeleteCartRequest {
  carts: number[];
}

export interface DeleteCartResponse {
  ok: 1 | 0;
}

export interface PaymentButtonProps {
  paymentMethod: string;
  agreePayment: boolean;
  onOrder: () => Promise<void>;
  onCardPayment: () => Promise<void>; // 카드결제 함수 추가
  isLoading: boolean;
}
