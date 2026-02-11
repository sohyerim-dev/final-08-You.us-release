'use client';

import Button from '@/components/common/Button';

type Warning = {
  title: string;
  detail: string;
  level: 'soft' | 'hard';
};

type Props = {
  warnings: Warning[];
  onReset: () => void;
};

export default function RecommendWarning({ warnings, onReset }: Props) {
  if (warnings.length === 0) return null;

  return (
    <div className="mt-14 flex w-[90%] max-w-2xl flex-col gap-6">
      <div className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <svg
            className="text-primary h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-title-sm text-gray-900">
          입력한 답변들끼리 잘 맞지 않는 부분이 있어요.
          <br />
          다시 시도해주세요.
        </h2>
      </div>

      <div className="space-y-3">
        {warnings.map((w, i) => (
          <div
            key={`${w.title}-${i}`}
            className="bg-primary/5 border-primary/20 rounded-xl border p-4"
          >
            <div className="flex gap-3">
              <div className="text-primary mt-0.5 shrink-0">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-body-sm font-semibold text-gray-900">
                  {w.title}
                </p>
                <p className="text-caption mt-1 whitespace-pre-wrap text-gray-700">
                  {w.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" onClick={onReset} className="w-full leading-4">
        다시 하기
      </Button>
    </div>
  );
}
