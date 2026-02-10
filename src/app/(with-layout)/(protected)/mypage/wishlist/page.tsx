'use client';

import ProductCard from '@/components/common/ProductCard';
import { getMyproduct } from '@/lib/api/mypage';
import { BookmarkItem } from '@/types/bookmark.types';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const [products, setProducts] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getMyproduct();
      const dataItem = data?.item;
      if (dataItem) {
        setProducts(dataItem);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-4 lg:flex-row lg:py-10">
        <div className="flex-1">
          <h2 className="text-title-sm font-pretendard mb-3 pl-4 font-bold text-gray-900 lg:mb-6">
            찜한 선물
          </h2>

          <div
            className="grid grid-cols-2 gap-x-4 gap-y-4 p-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-9"
            role="list"
            aria-label="상품 목록"
          >
            {products.map((bookmark) => (
              <ProductCard
                key={bookmark.product._id}
                id={bookmark.product._id}
                image={bookmark.product.mainImages[0]?.path || ''}
                name={bookmark.product.name}
                price={`${bookmark.product.price.toLocaleString()}`}
                mainCategory={bookmark.product.extra.category[0] ?? ''}
                subCategory={bookmark.product.extra.category[1] ?? ''}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
