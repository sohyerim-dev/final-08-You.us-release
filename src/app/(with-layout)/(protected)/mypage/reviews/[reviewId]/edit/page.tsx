'use client';

import ReviewForm from '@/app/(with-layout)/(protected)/mypage/_components/reviews/ReviewForm';
import { getReviewById } from '@/lib/api/mypage';
import { ReviewItem } from '@/types/review.types';
import Loading from '@/components/ui/Loading';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewEditPage() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<ReviewItem | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const data = await getReviewById(reviewId);
      setReview(data.item);
    };
    fetchReview();
  }, [reviewId]);

  if (!review) return <Loading />;

  return (
    <div className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 md:px-8 lg:px-12">
      <h2 className="sr-only">후기 수정</h2>
      <ReviewForm
        mode="edit"
        reviewId={reviewId}
        productInfo={{
          imageSrc: review.product.image.path,
          imageAlt: `${review.product.name}`,
          name: review.product.name,
        }}
        createdAt={review.createdAt}
        initialData={{
          rating: review.rating,
          content: review.content,
          images: review.extra.images,
        }}
      />
    </div>
  );
}
