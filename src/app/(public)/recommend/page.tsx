'use client'

import { useEffect, useState } from 'react'
import type { Answer, RecommendResult } from '@/types/aitest.types'
import { validateAnswers } from '@/lib/openai/validateAnswers'
import RecommendLoading from '@/components/pages/recommend/RecommendLoading'
import RecommendTest from '@/components/pages/recommend/RecommendTest'
import RecommendError from '@/components/pages/recommend/RecommendError'
import RecommendResultView from '@/components/pages/recommend/RecommendResult'
import RecommendWarning from '@/components/pages/recommend/RecommendWarning'
import { LogoLayout } from '@/components/pages/recommend/LogoLayout'

const QUESTIONS = [
  {
    question: '누구를 위한 선물인가요?',
    example: '(예시: 선생님, 친구의 부모님)',
  },
  {
    question: '선물 상대의 연령대는?',
    example: '(예시: 50대, 6살)',
  },
  {
    question: '무엇을 위한 선물인가요?',
    example: '(예시: 생일, 스승의날, 감사 선물)',
  },
  {
    question: '원하는 가격대는?',
    example: '(예시: 3만원 ~ 5만원, 10만원대)',
  },
  {
    question: '어떤 선물을 하고 싶나요?',
    example: '(예시: 마음이 담긴 선물, 실용적인 선물, 가벼운 선물 등)',
  },
] as const

const GENERIC_ERROR_MESSAGE =
  '추천 답변을 생성하던 중 오류가 발생했어요. 다시 시도해주세요.'

export default function RecommendPage() {
  const [step, setStep] = useState<number | null>(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<RecommendResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 완료 후 경고 화면을 띄울지 제어
  const [proceedAnyway, setProceedAnyway] = useState(false)

  const answerValues = answers.map((a) => a?.value ?? '')

  // ✅ step === null(모두 입력 완료)일 때만 경고 계산
  const warnings = step === null ? validateAnswers(answerValues) : []

  const resetAll = () => {
    setStep(0)
    setAnswers([])
    setIsLoading(false)
    setResult(null)
    setError(null)
    setProceedAnyway(false)
  }

  // ✅ 마지막 질문까지 완료되면(API 호출)
  useEffect(() => {
    const run = async () => {
      if (step !== null) return
      if (isLoading) return
      if (answers.length < QUESTIONS.length) return
      if (result || error) return

      // 경고가 있는데, 사용자가 "그대로 진행"을 누르지 않았다면 호출 금지
      // (현재 UI에 "그대로 진행하기" 버튼이 없어서 사실상 경고면 항상 여기서 멈춤)
      if (warnings.length > 0 && !proceedAnyway) return

      setIsLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: answerValues }),
        })

        if (!res.ok) {
          throw new Error('API_ERROR')
        }

        const data = (await res.json()) as unknown

        // ✅ 결과 shape 방어: 반드시 { tags: ... } 이어야만 성공 처리
        if (!data || typeof data !== 'object' || !('tags' in data)) {
          throw new Error('INVALID_RESULT')
        }

        setResult(data as RecommendResult)
      } catch {
        setError(GENERIC_ERROR_MESSAGE)
      } finally {
        setIsLoading(false)
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    proceedAnyway,
    warnings.length,
    answers.length,
    isLoading,
    result,
    error,
  ])

  const handleDone = (value: string) => {
    if (step === null) return

    const current = QUESTIONS[step]
    if (!current) return

    const trimmed = value.trim()
    if (!trimmed) return

    setAnswers((prev) => {
      const next = [...prev]
      next[step] = { question: current.question, value: trimmed }
      return next
    })

    const isLast = step === QUESTIONS.length - 1
    setStep(isLast ? null : step + 1)
  }

  // ================== Done Screen ==================
  if (step === null) {
    // ✅ 결과 화면: 로고 없음 (나중에 헤더/푸터 붙일 예정)
    if (
      (warnings.length === 0 || proceedAnyway) &&
      !isLoading &&
      !error &&
      result
    ) {
      return (
        <RecommendResultView
          result={result}
          answers={answers}
          onReset={resetAll}
        />
      )
    }

    // 경고/로딩/에러 화면: 로고 있음
    return (
      <LogoLayout>
        {/* 1) 경고 */}
        {warnings.length > 0 && !proceedAnyway && (
          <RecommendWarning warnings={warnings} onReset={resetAll} />
        )}

        {/* 2) 로딩 */}
        {(warnings.length === 0 || proceedAnyway) && isLoading && (
          <RecommendLoading />
        )}

        {/* 3) 에러 */}
        {(warnings.length === 0 || proceedAnyway) && !isLoading && error && (
          <RecommendError message={GENERIC_ERROR_MESSAGE} onReset={resetAll} />
        )}
      </LogoLayout>
    )
  }

  // ================== Test Screen ==================
  return (
    <LogoLayout>
      <RecommendTest step={step} questions={QUESTIONS} onDone={handleDone} />
    </LogoLayout>
  )
}
