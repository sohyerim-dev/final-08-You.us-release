'use client';

import ReviewForm from '@/components/pages/mypage/reviews/ReviewForm';
import { getOrderDetail } from '@/lib/api/checkout';
import Loading from '@/components/common/Loading';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewCreatePage() {
  const { orderId, productId } = useParams<{
    orderId: string;
    productId: string;
  }>();

  const [productInfo, setProductInfo] = useState<{
    imageSrc: string;
    imageAlt: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await getOrderDetail(orderId);
      const product = data.item.products.find(
        (p) => p._id === Number(productId),
      );
      if (product) {
        setProductInfo({
          imageSrc: product.image?.path ?? '',
          imageAlt: product.name,
          name: product.name,
        });
      }
    };
    fetchOrder();
  }, [orderId, productId]);

  if (!productInfo) return <Loading />;

  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 md:px-8 lg:px-12">
      <h1 className="sr-only">후기 작성</h1>
      <ReviewForm
        mode="create"
        productInfo={{
          ...productInfo,
          orderId: Number(orderId),
          productId: Number(productId),
        }}
      />
    </main>
  );
}
