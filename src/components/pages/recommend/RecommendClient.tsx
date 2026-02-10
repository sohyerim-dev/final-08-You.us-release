'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Answer } from '@/types/aitest.types';
import { validateAnswers } from '@/lib/openai/validateAnswers';
import RecommendLoading from '@/components/pages/recommend/RecommendLoading';
import RecommendTest from '@/components/pages/recommend/RecommendTest';
import RecommendError from '@/components/pages/recommend/RecommendError';
import RecommendWarning from '@/components/pages/recommend/RecommendWarning';
import { LogoLayout } from '@/components/pages/recommend/LogoLayout';
import fetchClient from '@/lib/api/fetchClient';

const QUESTIONS = [
  {
    question: '누구를 위한 선물인가요?',
    example: '(예시: 선생님, 친구의 부모님)',
  },
  {
    question: '선물하는 상대의 성별은 무엇인가요?',
    example: '(예시: 남성, 여성, 상관없음)',
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
] as const;

const GENERIC_ERROR_MESSAGE =
  '추천 답변을 생성하던 중 오류가 발생했어요. 다시 시도해주세요.';

export default function RecommendClient() {
  const router = useRouter();
  const [step, setStep] = useState<number | null>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [proceedAnyway, setProceedAnyway] = useState(false);
  const hasFetched = useRef(false);

  const answerValues = answers.map((a) => a?.value ?? '');

  const warnings = step === null ? validateAnswers(answerValues) : [];

  const resetAll = () => {
    setStep(0);
    setAnswers([]);
    setIsLoading(false);
    setError(null);
    setProceedAnyway(false);
    hasFetched.current = false;
    sessionStorage.removeItem('recommend_data');
  };

  useEffect(() => {
    const run = async () => {
      if (step !== null) return;
      if (hasFetched.current) return;
      if (isLoading) return;
      if (answers.length < QUESTIONS.length) return;

      if (warnings.length > 0 && !proceedAnyway) return;

      hasFetched.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchClient('/api/recommend', {
          method: 'POST',
          body: JSON.stringify({ answers: answerValues }),
        });

        if (!data || typeof data !== 'object' || !('tags' in data)) {
          throw new Error('INVALID_RESULT');
        }

        sessionStorage.setItem(
          'recommend_data',
          JSON.stringify({ result: data, answers }),
        );

        router.push('/recommend/result');
      } catch {
        setError(GENERIC_ERROR_MESSAGE);
        hasFetched.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, [
    step,
    proceedAnyway,
    warnings.length,
    answers.length,
    isLoading,
    answerValues,
    answers,
    router,
  ]);

  const handleDone = (value: string) => {
    if (step === null) return;

    const current = QUESTIONS[step];
    if (!current) return;

    const trimmed = value.trim();
    if (!trimmed) return;

    setAnswers((prev) => {
      const next = [...prev];
      next[step] = { question: current.question, value: trimmed };
      return next;
    });

    const isLast = step === QUESTIONS.length - 1;
    setStep(isLast ? null : step + 1);
  };

  if (step === null) {
    return (
      <LogoLayout>
        {warnings.length > 0 && !proceedAnyway && (
          <RecommendWarning warnings={warnings} onReset={resetAll} />
        )}

        {(warnings.length === 0 || proceedAnyway) && isLoading && (
          <RecommendLoading />
        )}

        {(warnings.length === 0 || proceedAnyway) && !isLoading && error && (
          <RecommendError message={GENERIC_ERROR_MESSAGE} onReset={resetAll} />
        )}
      </LogoLayout>
    );
  }

  return (
    <LogoLayout>
      <RecommendTest step={step} questions={QUESTIONS} onDone={handleDone} />
    </LogoLayout>
  );
}
