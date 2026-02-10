'use client';

import ProductCard from '@/components/pages/recommend/ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  mainImages: { path: string; name: string }[];
  extra?: {
    tags?: string[];
    category?: string[];
  };
  rating?: number;
  replies?: number;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          image={product.mainImages[0]?.path || '/placeholder.png'}
          name={product.name}
          price={product.price}
          rating={product.rating ?? 0}
          reviewCount={product.replies ?? 0}
        />
      ))}
    </ul>
  );
}
