import { ReviewItem } from './review.types';

// 단일 상품 응답 타입
export interface SingleProductResponse {
  ok: number;
  item: ProductItem;
}

export interface ProductResponse {
  ok: number;
  item: ProductItem[];
}
export interface ProductItem {
  _id: number;
  createdAt: string;
  updatedAt: string;
  price: number;
  shippingFees: number;
  show: boolean;
  active: boolean;
  name: string;
  quantity: number;
  buyQuantity: number;
  mainImages: ProductImage[];
  content: string;
  extra: ProductExtra;
  options: number;
  replies: number | ReviewItem[];
  bookmarks: number;
  likes: number;
  rating: number;
}

export interface ProductImage {
  path: string;
  name: string;
}

export interface ProductExtra {
  category: string[];
  sort: number;
  tags: string[];
  options: { color?: string[]; size?: string[] };
}

export interface ProductError {
  ok: number;
  message: string;
}
