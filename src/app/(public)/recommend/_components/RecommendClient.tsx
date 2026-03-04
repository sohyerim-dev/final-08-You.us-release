'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { Answer } from '@/types/aitest.types';
import { validateAnswers } from '@/lib/openai/validateAnswers';
import RecommendLoading from '@/app/(public)/recommend/_components/RecommendLoading';
import RecommendTest from '@/app/(public)/recommend/_components/RecommendTest';
import RecommendError from '@/app/(public)/recommend/_components/RecommendError';
import RecommendWarning from '@/app/(public)/recommend/_components/RecommendWarning';
import { LogoLayout } from '@/app/(public)/recommend/_components/LogoLayout';
import fetchClient from '@/lib/api/fetchClient';

const QUESTIONS = [
  {
    question: '누구를 위한 선물인가요?',
    options: [
      '부모님',
      '선생님/교수님',
      '연인/배우자',
      '친구',
      '직장 동료/상사',
      '자녀/조카',
      '기타',
    ],
  },
  {
    question: '선물하는 상대의 성별은 무엇인가요?',
    options: ['남성', '여성', '상관없음'],
  },
  {
    question: '선물 상대의 연령대는?',
    options: ['10대 이하', '20대', '30대', '40대', '50대', '60대 이상', '기타'],
  },
  {
    question: '무엇을 위한 선물인가요?',
    options: [
      '생일',
      '감사 선물',
      '명절',
      '집들이/이사',
      '결혼/기념일',
      '기타',
    ],
  },
  {
    question: '원하는 가격대는?',
    options: [
      '1만원 이하',
      '1~3만원',
      '3~5만원',
      '5~10만원',
      '10만원대',
      '20만원 이상',
      '기타',
    ],
  },
  {
    question: '어떤 선물을 하고 싶나요?',
    options: [
      '실용적인 선물',
      '감동적인 선물',
      '가벼운 선물',
      '고급스러운 선물',
      '귀여운 선물',
      '기타',
    ],
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

  const handleBack = () => {
    if (step === null) {
      setStep(QUESTIONS.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  if (step === null) {
    return (
      <LogoLayout>
        {warnings.length > 0 && !proceedAnyway && (
          <RecommendWarning
            warnings={warnings}
            onReset={resetAll}
            onBack={handleBack}
          />
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
      <RecommendTest
        step={step}
        questions={QUESTIONS}
        onDone={handleDone}
        onBack={handleBack}
        currentAnswer={answers[step]?.value}
      />
    </LogoLayout>
  );
}
