import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/common/Loading';
import { Suspense } from 'react';
import LoginForm from '@/components/pages/login/LoginForm';

export const metadata: Metadata = {
  title: '로그인',
  description: 'You,Us 계정에 로그인하세요.',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto flex h-screen w-fit flex-col items-center justify-center">
      <h1 className="sr-only">로그인 페이지</h1>
      <Link href="/" className="mb-15">
        <Image
          src="/icons/LOGO.svg"
          className="w-70"
          alt="유어스"
          width={250}
          height={81}
        />
      </Link>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
