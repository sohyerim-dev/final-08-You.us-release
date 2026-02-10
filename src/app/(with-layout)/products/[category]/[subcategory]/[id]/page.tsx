import ImageGallery from '@/components/pages/product-detail/ImageGallery';
import ProductDetailInfo from '@/components/pages/product-detail/ProductDetailInfo';
import ProductTabs from '@/components/pages/product-detail/ProductTabs';
import fetchClient from '@/lib/api/fetchClient';
import { SingleProductResponse } from '@/types/product.types';

// page.tsx
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    subcategory: string;
    id: string;
  }>;
}) {
  //상품 id
  const { id } = await params;

  //상품정보
  const res = await fetchClient<SingleProductResponse>(`/products/${id}`);

  // 에러 체크
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
