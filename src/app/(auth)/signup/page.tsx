import SignupForm from '@/components/pages/signup/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '회원가입',
  description: 'You,Us 계정을 만들어보세요.',
};

export default function SignupPage() {
  return (
    <div className="flex w-full flex-col items-center bg-gray-50">
      <h1 className="text-title-lg mt-20">회원가입</h1>
      <SignupForm />
    </div>
  );
}
