import Image from 'next/image';
import Link from 'next/link';

export const LogoLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen w-full flex-col items-center bg-[#F3E7E9] px-4 pt-15 sm:px-6 sm:pt-10 lg:pt-[10vh]">
    <h1 className="sr-only">선물 추천 테스트 페이지</h1>
    <Link
      href="/"
      className="box-content w-48 sm:w-56 md:w-64 lg:w-65 lg:self-start lg:pl-35"
    >
      <Image
        src="/icons/LOGO.svg"
        alt="유어스"
        width={250}
        height={81}
        priority
      />
    </Link>
    {children}
  </div>
);
