'use client';

type Question = {
  question: string;
  options?: readonly string[];
};

type Props = {
  step: number;
  questions: readonly Question[];
  onDone: (value: string) => void;
  onBack: () => void;
  currentAnswer?: string;
};

import QuestionBox from '@/app/(public)/recommend/_components/QuestionBox';

export default function RecommendTest({
  step,
  questions,
  onDone,
  onBack,
  currentAnswer,
}: Props) {
  const current = questions[step];
  if (!current) return null;

  const total = questions.length;

  return (
    <>
      <div className="mt-[5vh] flex w-[calc(100%-2rem)] items-center justify-between sm:w-[90%] md:w-[85%] lg:w-135">
        <button
          type="button"
          onClick={onBack}
          className={[
            'flex items-center gap-1.5 rounded-full border px-3 py-1.5',
            'text-sm font-medium transition',
            'border-primary/40 text-primary hover:bg-primary/10',
            step === 0 ? 'invisible' : '',
          ].join(' ')}
          aria-label="이전 질문으로"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          이전
        </button>

        <span className="text-sm font-medium text-gray-400">
          {step + 1} / {total}
        </span>

        {/* 우측 균형 여백 */}
        <span className="w-14" />
      </div>

      <QuestionBox
        key={step}
        question={current.question}
        options={current.options}
        initialValue={currentAnswer}
        autoFocus
        onDone={onDone}
      />
    </>
  );
}
