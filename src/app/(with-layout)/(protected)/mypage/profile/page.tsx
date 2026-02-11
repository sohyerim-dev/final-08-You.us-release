'use client';

import Button from '@/components/common/Button';
import ProfileForm from '@/components/pages/mypage/profile/ProfileForm';
import useUserStore from '@/lib/zustand/auth/userStore';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useUserStore();
  console.log('회원정보2:', user);

  if (!user) {
    return (
      <div className="mx-auto flex max-w-[1500px] gap-10 px-4 lg:flex-row lg:py-10">
        <div className="flex-1">
          <p className="text-center text-gray-500">로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1500px] gap-10 px-4 lg:flex-row lg:py-10">
        <div className="flex-1">
          <h1 className="sr-only">내 정보 수정</h1>
          <h2 className="text-title-sm font-pretendard mb-3 pl-4 font-bold text-gray-900 lg:mb-6">
            내 정보
          </h2>
          <ProfileForm user={user} />
          {/* 마이페이지로 돌아가는 버튼 */}
          <Link href="/mypage" className="w-75 lg:w-full">
            <Button variant="update" className="text-body-sm mb-5 w-full">
              마이페이지로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
