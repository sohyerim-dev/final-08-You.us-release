import Link from 'next/link'
import { ReactNode } from 'react'

interface MyPageSectionProps {
  title: string
  moreHref?: string
  children: ReactNode
}

export default function MyPageSection({
  title,
  moreHref,
  children,
}: MyPageSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between pb-1">
        <h2 className="lg:text-caption text-body-lg font-bold">{title}</h2>

        {moreHref && (
          <Link href={moreHref} className="text-body-sm text-gray-500">
            <span className="sr-only">{title} 더보기</span>
            <span aria-hidden="true">&gt;</span> 더보기
          </Link>
        )}
      </div>

      <div>{children}</div>
    </section>
  )
}
