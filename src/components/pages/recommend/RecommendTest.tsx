'use client';

type Question = {
  question: string;
  example: string;
};

type Props = {
  step: number;
  questions: readonly Question[];
  onDone: (value: string) => void;
};

import QuestionBox from '@/components/pages/recommend/QuestionBox';

export default function RecommendTest({ step, questions, onDone }: Props) {
  const current = questions[step];
  if (!current) return null;

  return (
    <>
      <h2 className="lg:text-title-lg mt-[5vh] px-4 text-center text-[32px] leading-tight font-bold text-gray-900 sm:text-[36px]">
        AI에게&nbsp;
        <br className="lg:hidden" />
        선물에 대해 말해주세요!
      </h2>
      <QuestionBox
        key={step}
        question={current.question}
        example={current.example}
        autoFocus
        onDone={onDone}
      />
    </>
  );
}
