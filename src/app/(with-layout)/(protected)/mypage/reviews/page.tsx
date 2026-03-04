'use client';

import Button from '@/components/ui/Button';
import MyPageSection from '@/app/(with-layout)/(protected)/mypage/_components/main/MyPageSection';
import ReviewCard from '@/app/(with-layout)/(protected)/mypage/_components/reviews/ReviewCard';
import { getMyReviews } from '@/lib/api/mypage';
import { ReviewItem } from '@/types/review.types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';
import Pagination from '@/components/ui/Pagination';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchReviews = async () => {
      setIsLoading(true);
      const data = await getMyReviews(currentPage);
      setReviews(data.item ?? []);
      setTotalPages(data.pagination?.totalPages ?? 1);
      setIsLoading(false);
    };
    fetchReviews();
  }, [currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h2 className="sr-only">나의 후기</h2>

      {/* 나의 후기 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title="나의 후기">
          {!reviews || reviews.length === 0 ? (
            <li className="flex min-h-50 items-center justify-center text-gray-400">
              작성하신 리뷰가 없습니다.
            </li>
          ) : (
            <ul className="flex flex-col gap-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  type="written"
                  reviewId={review._id}
                  productId={review.product._id}
                  imageSrc={review.product.image.path}
                  imageAlt={review.product.name}
                  name={review.product.name}
                  price=""
                  rating={review.rating}
                  createdAt={review.createdAt}
                />
              ))}
            </ul>
          )}
        </MyPageSection>
        <div className="m-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        {/* 마이페이지로 돌아가는 버튼 */}
        <Link href="/mypage" className="w-75 lg:w-full">
          <Button variant="update" className="text-body-sm mb-5 w-full">
            마이페이지로 돌아가기
          </Button>
        </Link>
      </section>
    </div>
  );
}
