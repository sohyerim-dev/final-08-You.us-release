'use client';

import Button from '@/components/common/Button';

type Props = {
  message: string;
  onReset: () => void;
};

export default function RecommendError({ message, onReset }: Props) {
  return (
    <div className="mt-14 flex w-[80%] flex-col gap-4">
      <p className="text-body-md text-gray-900">{message}</p>
      <Button type="button" onClick={onReset} className="leading-4">
        다시 하기
      </Button>
    </div>
  );
}
