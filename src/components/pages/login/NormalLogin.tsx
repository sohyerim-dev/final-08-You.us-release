import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import type { LoginProps } from '@/types/login.types'
import Image from 'next/image'
import Link from 'next/link'

export default function NormalLogin({ handleLoginType }: LoginProps) {
  return (
    <div className="container mx-auto flex h-screen w-fit flex-col items-center justify-center">
      <h1 className="sr-only">로그인 페이지</h1>
      <Image
        src="/icons/LOGO.svg"
        className="mb-15 w-70"
        alt="유어스"
        width={250}
        height={81}
      />

      <Input placeholder="아이디" className="mb-button-y w-75 lg:w-82.5" />
      <Input placeholder="패스워드" className="w-75 lg:w-82.5" />
      <div className="mt-2.5 flex w-full items-center justify-between">
        <div className="flex items-center">
          <input
            id="auto-login"
            type="checkbox"
            className="h-button-y w-button-y appearance-none rounded-[10px] border-2 border-gray-500 bg-gray-50"
          />
          <label htmlFor="auto-login" className="ms-1.25 text-gray-900">
            자동 로그인
          </label>
        </div>

        <button className="text-gray-900 underline" onClick={handleLoginType}>
          소셜 로그인
        </button>
      </div>
      <Button className="mt-10 w-full">로그인</Button>
      <Link
        className="bg-primary mt-button-y hover:bg-primary-hover px-button-x py-button-y w-full cursor-pointer rounded-lg text-center font-bold text-gray-50 transition-colors"
        href="/signup"
      >
        회원가입
      </Link>
    </div>
  )
}
