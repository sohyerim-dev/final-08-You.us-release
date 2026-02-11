import type { Metadata } from 'next';
import { cache } from 'react';
import ImageGallery from '@/components/pages/product-detail/ImageGallery';
import ProductDetailInfo from '@/components/pages/product-detail/ProductDetailInfo';
import ProductTabs from '@/components/pages/product-detail/ProductTabs';
import fetchClient from '@/lib/api/fetchClient';
import { SingleProductResponse } from '@/types/product.types';

type Props = {
  params: Promise<{ category: string; subcategory: string; id: string }>;
};

const getProduct = cache((id: string) =>
  fetchClient<SingleProductResponse>(`/products/${id}`),
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await getProduct(id);

  if ('ok' in res && res.ok === 0) {
    return { title: '상품을 찾을 수 없습니다 | You,Us' };
  }

  const product = (res as SingleProductResponse).item;

  return {
    title: `${product.name} 상품 상세보기 | You,Us`,
    description: `${product.name} 상품 상세보기 | You,Us. ${product.price.toLocaleString()}원`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    subcategory: string;
    id: string;
  }>;
}) {
  const { id } = await params;
  const res = await getProduct(id);

  if ('ok' in res && res.ok === 0) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const product = (res as SingleProductResponse).item;

  return (
    <main className="overflow-x-clip px-5 lg:px-25 lg:py-20">
      <div className="min-w-0 lg:flex lg:gap-[3vw]">
        <div className="w-full py-5 lg:w-2/5 lg:max-w-125 lg:shrink-0 lg:py-[2vw]">
          <ImageGallery images={product.mainImages} />
        </div>
        <div className="min-w-0 flex-1">
          <ProductDetailInfo product={product} />
        </div>
      </div>
      <ProductTabs
        content={product.content}
        replies={
          Array.isArray(product.replies)
            ? product.replies.length
            : product.replies
        }
      />
    </main>
  );
}
