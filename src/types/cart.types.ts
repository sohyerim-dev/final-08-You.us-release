import { ProductImage, ProductExtra } from './product.types';

export interface CartItemForCreate {
  _id?: number;
  product_id: number;
  quantity: number;
  color?: string;
}
export interface CartItemOnList {
  _id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
  option?: string;
  options: {
    color?: string[];
    size?: string[];
  };
  image: string;
}

export interface CartItem {
  _id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  product: {
    _id: number;
    name: string;
    price: number;
    seller_id: number;
    quantity: number;
    buyQuantity: number;
    image: ProductImage;
    extra: ProductExtra;
    seller: {
      _id: number;
      name: string;
      image: string;
    };
  };
}

export interface CartResponse {
  ok: number;
  item: CartItem;
}

export interface CartListResponse {
  ok: number;
  item: CartItem[];
}
