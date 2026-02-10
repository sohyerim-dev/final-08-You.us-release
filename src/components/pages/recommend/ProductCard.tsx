'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  rating?: number;
  reviewCount?: number;
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  rating = 0,
  reviewCount = 0,
}: ProductCardProps) {
  return (
    <li className="product-card p-button-y flex h-auto w-full flex-col rounded-[3%] border-2 border-[#E8E8E8] bg-white">
      <Link href={`/products/${id}`} className="product-link">
        <figure className="product-image relative aspect-square w-full overflow-hidden bg-gray-200">
          <Image src={image} alt={name} fill className="object-contain" />
        </figure>
        <h4 className="product-title mt-button-y line-clamp-1 px-2 text-[0.875rem]">
          {name}
        </h4>
        <p className="product-price px-2">
          <strong className="text-primary font-bold">
            {price.toLocaleString()}원
          </strong>
        </p>
        <div className="flex flex-row justify-between px-2 pb-2">
          <div className="product-rating text-[0.75rem] text-[#999999]">
            <span aria-hidden="true">★</span>
            <span className="sr-only">평점</span>
            <span>{rating.toFixed(1)}</span>
            <span className="review-count">({reviewCount})</span>
          </div>
          <span className="product-cta text-primary font-bold">상세보기</span>
        </div>
      </Link>
    </li>
  );
}
