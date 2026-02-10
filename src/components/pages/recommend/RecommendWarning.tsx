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
  // 나중에 살릴 거면 추가
  // canProceed?: boolean
  // onProceed?: () => void
};

export default function RecommendWarning({ warnings, onReset }: Props) {
  if (warnings.length === 0) return null;

  return (
    <div className="mt-14 flex w-[80%] flex-col gap-4">
      <p className="text-body-md text-gray-900">
        입력한 답변들끼리 잘 맞지 않는 부분이 있어요. 다시 시도해주세요.
      </p>

      <div className="w-full rounded-lg border border-gray-300 bg-white/60 p-3 text-xs text-gray-900">
        <ul className="list-disc space-y-2 pl-5">
          {warnings.map((w, i) => (
            <li key={`${w.title}-${i}`}>
              <p className="font-semibold">{w.title}</p>
              <p className="mt-1 whitespace-pre-wrap">{w.detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-2 flex gap-2">
        <Button type="button" onClick={onReset} className="leading-4">
          다시 하기
        </Button>

        {/* 나중에 살릴 때만 열어 */}
        {/* {canProceed && onProceed && (
          <button
            type="button"
            className="rounded-lg bg-gray-900 px-4 py-2 text-gray-50"
            onClick={onProceed}
          >
            그대로 진행하기
          </button>
        )} */}
      </div>
    </div>
  );
}
