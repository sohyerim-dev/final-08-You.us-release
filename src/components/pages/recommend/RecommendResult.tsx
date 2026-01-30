'use client'

import Button from '@/components/common/Button'
import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import MoreButton from '@/components/common/MoreButton'
import ProductList from '@/components/pages/recommend/ProductList'
// import Footer from '@/components/common/Footer'
// import Header from '@/components/common/Header'
import type {
  Answer,
  RecommendResult as RecommendResultType,
} from '@/types/aitest.types'

type Props = {
  result: RecommendResultType
  answers: Answer[]
  onReset: () => void
}

export default function RecommendResultView({
  result,
  answers,
  onReset,
}: Props) {
  const a = (i: number) => answers[i]?.value?.trim() ?? ''

  // '선물' 단어 제거 + 공백 정리
  const stripGiftWord = (text: string) => text.replace(/\s*선물\s*/g, '').trim()

  // 혹시라도 빈 값이면 렌더 자체를 안 하거나, 대체 문구
  const isAllFilled = [0, 1, 2, 3, 4].every((i) => a(i))
  if (!isAllFilled) return null

  console.log('대답', JSON.stringify(answers, null, 2))
  console.log('반환', JSON.stringify(result, null, 2))

  return (
    <div className="mx-auto max-w-375 min-w-5xl bg-gray-50">
      <Header />
      <section className="mx-auto mt-15 flex max-w-375 min-w-256.25 flex-col items-center gap-4 px-2.5">
        <h2 className="text-title-md">AI가 추천한 선물은 바로!!</h2>
        <h3 className="text-title-sm text-gary-900 w-fit border-b-3 border-gray-900">
          ({stripGiftWord(a(1))}) ({stripGiftWord(a(0))})에게 선물하기 좋은 (
          {stripGiftWord(a(4))}) ({stripGiftWord(a(3))}) ({stripGiftWord(a(2))})
          선물
        </h3>
        <Button type="button" className="mb-15 leading-4" onClick={onReset}>
          다시 하기
        </Button>
        <ProductList />
        <MoreButton className="mt-15 mb-8.75">더보기</MoreButton>
      </section>
      <Footer />
    </div>
  )
}
