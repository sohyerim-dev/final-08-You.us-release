import Button from '@/components/common/Button'
import Link from 'next/link'

export default function ReviewsPage() {
  return (
    <main className="min-h-[500px]">
      <h1>내 문의 목록</h1>
      {/* 내 문의 목록 */}
      <Link href="/mypage/reviews" className="w-75 lg:w-40.5">
        <Button variant="update" className="text-body-sm w-full">
          마이 페이지로 돌아가기
        </Button>
      </Link>
    </main>
  )
}
