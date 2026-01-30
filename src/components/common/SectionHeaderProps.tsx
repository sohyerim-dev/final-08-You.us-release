import Link from 'next/link'

// SectionHeader.tsx (또는 CategoryHeader.tsx)
interface SectionHeaderProps {
  title: string
  accentColor?: string // 밑줄 색상 커스터마이징 가능
  id: number | string
}

export default function SectionHeader({
  title,
  accentColor = 'bg-red-500',
  id,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 lg:mb-13">
      <div className="mb-3 flex items-center justify-between lg:mb-4">
        <h2 className="font-pretendard text-title-sm color-gray-900">
          {title}
        </h2>

        {/* 더보기 링크 - 모바일만 */}
        <Link
          href={`/category/${id}`}
          className="text-body-sm shrink-0 text-sm font-bold text-gray-500 lg:hidden"
        >
          {'>'} 더보기
        </Link>
      </div>
      <div className={`h-0.75 w-16 rounded-lg ${accentColor} lg:w-20`}></div>
    </div>
  )
}
