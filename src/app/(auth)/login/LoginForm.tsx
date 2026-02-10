'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { login } from '@/lib/api/users';
import useUserStore from '@/lib/zustand/auth/userStore';
import { mergeLocalCartToServer } from '@/lib/zustand/cartStore';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI;

export default function LoginForm() {
  const [autoLogin, setAutoLogin] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });

  const setUser = useUserStore((state) => state.setUser);
  const setAutoLoginStore = useUserStore((state) => state.setAutoLogin);
  const [userState, formAction, isPending] = useActionState(login, null);
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

  useEffect(() => {
    if (!userState) return;

    if (userState.ok) {
      const handleLoginSuccess = async () => {
        setUser({
          _id: userState.item._id,
          email: userState.item.email,
          name: userState.item.name,
          image: userState.item.image,
          phone: userState.item.phone,
          address: userState.item.address,
          token: {
            accessToken: userState.item.token?.accessToken || '',
            refreshToken: userState.item.token?.refreshToken || '',
          },
        });
        setAutoLoginStore(autoLogin);

        if (autoLogin && userState.item.token?.refreshToken) {
          localStorage.setItem(
            'refreshToken',
            userState.item.token.refreshToken,
          );
        }

        await mergeLocalCartToServer();

        toast.success(`${userState.item.name}님 로그인이 완료되었습니다.`);
        router.replace(redirect || '/');
      };

      handleLoginSuccess();
    } else {
      toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  }, [userState, router, redirect, setUser, setAutoLoginStore, autoLogin]);

  const validateEmail = (email: string) => {
    if (!email) {
      return '이메일을 입력해주세요.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return '비밀번호를 입력해주세요.';
    }
    if (password.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    }
    return '';
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, email: true }));
    const error = validateEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched((prev) => ({ ...prev, password: true }));
    const error = validatePassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (touched.email) {
      const error = validateEmail(e.target.value);
      setErrors((prev) => ({ ...prev, email: error }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (touched.password) {
      const error = validatePassword(e.target.value);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleNaverLogin = () => {
    const state = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('naver_state', state);

    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get('redirect') || '/';
    sessionStorage.setItem('redirect_after_login', redirectPath);

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI!)}&state=${state}`;

    window.location.href = naverAuthUrl;
  };

  return (
    <form action={formAction} className="flex w-fit flex-col">
      <Input
        placeholder="아이디"
        label="아이디"
        className="w-75 lg:w-82.5"
        id="email"
        type="email"
        autoComplete="email"
        name="email"
        labelClassName="sr-only"
        onBlur={handleEmailBlur}
        onChange={handleEmailChange}
      />
      <p className="text-error text-[14px]">
        {touched.email && errors.email}
        {userState?.ok === 0 && userState.errors?.email?.msg}
      </p>
      <Input
        label="비밀번호"
        id="password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="패스워드"
        className="mt-button-y w-75 lg:w-82.5"
        labelClassName="sr-only"
        onBlur={handlePasswordBlur}
        onChange={handlePasswordChange}
      />
      <p className="text-error text-[14px]">
        {touched.password && errors.password}
        {userState?.ok === 0 && userState.errors?.password?.msg}
      </p>
      <div className="mt-2.5 flex w-full items-center justify-between">
        <div className="flex items-center">
          <input
            id="auto-login"
            type="checkbox"
            name="autoLogin"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            className="peer h-button-y w-button-y checked:bg-primary checked:border-primary appearance-none rounded-[10px] border-2 border-gray-500 bg-gray-50 outline-gray-900 focus:outline-1"
          />
          <svg
            className="h-button-y w-button-y pointer-events-none absolute hidden text-white peer-checked:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <label htmlFor="auto-login" className="ms-1.25 text-gray-900">
            자동 로그인
          </label>
        </div>

        <Link
          href="/signup"
          className="font-bold text-gray-900 underline outline-gray-900 focus:outline-1"
        >
          회원가입
        </Link>
      </div>
      <Button
        type="submit"
        className="border-primary text-primary hover:bg-primary mt-10 w-full border bg-white outline-none hover:text-white focus:border-gray-900"
        disabled={isPending}
      >
        로그인
      </Button>
      <Button
        onClick={handleNaverLogin}
        disabled={isPending}
        className="mt-button-y px-button-x py-button-y w-full cursor-pointer rounded-lg border border-[#03C75A] bg-white text-center font-bold text-[#02B350] transition-colors outline-none hover:bg-[#03C75A] hover:text-[white] focus:border-gray-900"
      >
        네이버 로그인
      </Button>
    </form>
  );
}
