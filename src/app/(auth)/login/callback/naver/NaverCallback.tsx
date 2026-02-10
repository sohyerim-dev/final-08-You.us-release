'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getNaverToken } from '@/lib/api/auth';
import useUserStore from '@/lib/zustand/auth/userStore';
import { mergeLocalCartToServer } from '@/lib/zustand/cartStore';
import { toast } from 'react-toastify';

export default function NaverCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const errorParam = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (errorParam) {
        toast.error(errorDescription || '로그인에 실패했습니다.');
        setError(errorDescription || '로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      if (!code) {
        toast.error('로그인에 실패했습니다.');
        setError('로그인에 실패했습니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      const savedState = sessionStorage.getItem('naver_state');
      if (state !== savedState) {
        toast.error('잘못된 요청입니다.');
        setError('잘못된 요청입니다.');
        setTimeout(() => router.push('/login'), 2000);
        return;
      }

      try {
        const result = await getNaverToken(code);

        if (result.ok && result.user) {
          setUser(result.user);

          sessionStorage.removeItem('naver_state');

          await mergeLocalCartToServer();

          const redirectPath =
            sessionStorage.getItem('redirect_after_login') || '/';
          sessionStorage.removeItem('redirect_after_login');

          toast.success(`${result.user.name}님 로그인이 완료되었습니다.`);
          router.push(redirectPath);
        } else {
          const msg = result.message || '로그인에 실패했습니다.';
          toast.error(msg);
          setError(msg);
          setTimeout(() => router.push('/login'), 2000);
        }
      } catch (error) {
        console.error('네이버 로그인 오류:', error);
        toast.error('로그인 중 오류가 발생했습니다.');
        setError('로그인 중 오류가 발생했습니다.');
        setTimeout(() => router.push('/login'), 2000);
      }
    };

    handleCallback();
  }, [searchParams, router, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {error ? (
          <>
            <p className="text-lg text-red-500">{error}</p>
            <p className="mt-2 text-sm text-gray-500">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </>
        ) : (
          <p className="text-lg">네이버 로그인 중...</p>
        )}
      </div>
    </div>
  );
}
