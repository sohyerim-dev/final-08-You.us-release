import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <div className="min-h-[500px]">
      <h2>후기 상세 보기</h2>
      {/* 후기 상세 정보 */}
      <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
        <Button variant="update" className="text-body-sm w-full">
          목록으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
