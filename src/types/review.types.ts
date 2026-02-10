import { ProductImage } from './product.types';

export interface ReviewItem {
  _id: number;
  createdAt: string;
  user: {
    _id: number;
    image: string;
    name: string;
  };
  rating: number;
  content: string;
  extra: {
    title: string;
    images: string[];
  };
  product: {
    _id: number;
    image: ProductImage;
    name: string;
    price: number;
  };
}

export interface ReviewResponse {
  ok: number;
  item: ReviewItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
