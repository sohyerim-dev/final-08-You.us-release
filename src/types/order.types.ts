export interface Orders {
  ok: number;
  item: OrderList[];
}

export interface OrderList {
  cost: {
    discount: {
      products: number;
      shippingFees: number;
    };
    products: number;
    shippingFees: number;
    total: number;
  };
  createdAt: string;
  updatedAt: string;
  products: OrderItem[];
  state: 'OS035' | 'OS040';
  user_id: number;
  _id: number;
}

export interface OrderItem {
  _id: number;
  seller_id: number;
  seller: {
    _id: number;
    name: string;
    image: string;
  };
  state: 'OS035' | 'OS040';
  name: string;
  image: {
    path: string;
    name: string;
  };
  quantity: number;
  price: string;
  extra?: {
    category: string[];
  };
  review_id: number;
  review: {
    rating: number;
    content: string;
    extra?: {
      title: string;
    };
    createdAt: string;
  };
}
