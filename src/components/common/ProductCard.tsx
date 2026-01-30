import Image from 'next/image'
import Link from 'next/link'

// ProductCard.tsx
interface ProductCardProps {
  id: string | number
  image: string
  name: string
  price: string
  rating: string
  detailLinkText?: string
}

export default function ProductCard({
  id,
  image,
  name,
  price,
  rating,
  detailLinkText = '상세보기',
}: ProductCardProps) {
  return (
    <div className="flex h-full flex-col rounded border border-gray-200 bg-white p-4">
      <div className="relative mb-4 aspect-square">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="line-clamp-1 flex-1 text-sm text-gray-700">{name}</h3>
        <p className="text-body-md text-primary font-bold">{price}</p>
        <div className="flex shrink-0 items-center justify-between">
          <p className="text-gray-500">{rating}</p>
          <Link
            href={`/products/food/vegetable/${id}`} // 동적 라우팅
            className="text-body-md text-primary shrink-0 cursor-pointer font-bold"
          >
            {detailLinkText}
          </Link>
        </div>
      </div>
    </div>
  )
}
