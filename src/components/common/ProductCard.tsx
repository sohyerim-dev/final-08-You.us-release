import Image from 'next/image';
import Link from 'next/link';

// ProductCard.tsx
interface ProductCardProps {
  id: string | number;
  image: string;
  name: string;
  price: string;
  rating?: number;
  replies?: number;
  detailLinkText?: string;
  mainCategory: string;
  subCategory: string;
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  rating,
  replies,
  detailLinkText = '상세보기',
  mainCategory,
  subCategory,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${mainCategory}/${subCategory}/${id}`} // 동적 라우팅
      className="text-body-md text-primary hover:text-primary-hover shrink-0 cursor-pointer transition-colors duration-300 ease-in-out"
    >
      <div className="flex h-full flex-col rounded border border-gray-200 bg-white p-4">
        <div className="relative mb-4 aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="line-clamp-1 flex-1 text-sm text-gray-700">{name}</h3>
          <p className="text-body-md text-primary font-bold">{price}원</p>
          <div className="flex shrink-0 items-center justify-between">
            <p className="text-gray-500">
              ★ {(rating ?? 0).toFixed(2)}({replies ?? 0})
            </p>
            {detailLinkText}
          </div>
        </div>
      </div>
    </Link>
  );
}
