export interface Product {
  _id: string;
  name: string;
  price: number;
  mainImages: { path: string; name: string }[];
  extra?: {
    tags?: string[];
    category?: string[];
  };
  rating?: number;
}

export interface GetRecommendProductsParams {
  tags: string[];
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export interface ProductListResponse {
  ok: number;
  item: Product[];
}

export interface RecommendProductsResult {
  ok: number;
  items: Product[];
  total: number;
  message?: string;
}
