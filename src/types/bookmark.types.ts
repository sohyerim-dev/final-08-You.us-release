import { ProductImage } from './product.types';

export interface BookmarkItem {
  _id: number;
  createdAt: string;
  user_id: number;
  product: {
    _id: number;
    name: string;
    price: number;
    quantity: number;
    buyQuantity: number;
    mainImages: ProductImage[];
    extra: {
      category: string[];
      sort: number;
      tags: string[];
      options: Record<string, unknown>;
    };
    seller: {
      _id: number;
      name: string;
      email: string;
      image: string;
    };
    bookmarks: number;
    likes: number;
  };
}

export interface SingleBookmarkResponse {
  ok: number;
  item: BookmarkItem;
}

export interface BookmarkResponse {
  ok: number;
  item: BookmarkItem[];
}
