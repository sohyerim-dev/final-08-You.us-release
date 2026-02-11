import Button from '@/components/common/Button';
import Link from 'next/link';

export default function ReviewsPage() {
  return (
    <main className="min-h-[500px]">
      <h1>배송 현황</h1>
      {/* 배송 현황 정보 */}
      <Link href="/mypage/orders" className="w-75 lg:w-40.5">
        <Button tabIndex={-1} variant="update" className="text-body-sm w-full">
          목록으로 돌아가기
        </Button>
      </Link>
    </main>
  );
}
