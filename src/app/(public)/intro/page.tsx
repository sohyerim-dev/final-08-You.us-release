import styles from '@/app/(public)/intro/page.module.css';
import Image from 'next/image';
import type { Metadata } from 'next';
import IntroActions from '@/components/pages/intro/IntroActions';

export const metadata: Metadata = {
  title: 'Intro - 소개',
  description: 'You,Us 선물 추천 서비스를 소개합니다.',
};

export default function IntroPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center overflow-hidden bg-[#F3E7E9] pt-35 lg:justify-center lg:pt-0">
      <h1 className="sr-only">인트로 페이지</h1>
      <h2
        className={`color-gray-900 text-title-md lg:text-title-lg ${styles.content}`}
      >
        선물 추천 쇼핑몰
      </h2>
      <Image
        src="/icons/LOGO.svg"
        className={`w-72.5 lg:w-112.5 ${styles.logo}`}
        width="450"
        height="146"
        alt="유어스"
      />
      <div className={`mt-6 flex flex-col items-center ${styles.content}`}>
        <h3 className="text-[1.5rem] font-bold md:text-[3rem]">
          선물 고르기 힘들 때,
        </h3>
        <h3 className="text-[1.5rem] font-bold md:text-[3rem]">
          AI에게 선물 추천받자!
        </h3>
        <IntroActions />
      </div>
    </div>
  );
}
