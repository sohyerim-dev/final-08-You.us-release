import Image from 'next/image';
import Button from '@/components/common/Button';
import { ButtonHTMLAttributes } from 'react';

interface MoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function MoreButton({
  className = '',
  ...props
}: MoreButtonProps) {
  return (
    <Button
      className={`flex flex-row items-center gap-2 ${className}`}
      {...props}
    >
      <Image
        src="/images/common/down-arrow.svg"
        alt=""
        className="my-auto self-center"
        width={12}
        height={6}
      />
      더보기
    </Button>
  );
}
