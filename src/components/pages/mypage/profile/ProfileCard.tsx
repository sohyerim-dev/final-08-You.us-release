import useUserStore from '@/lib/zustand/auth/userStore';
import Image from 'next/image';

export default function ProfileCard() {
  const { user } = useUserStore();

  return (
    <div className="border-primary flex items-center gap-3 border-y bg-white p-5 px-3 lg:gap-3">
      <Image
        src={user?.image || '/images/common/basic-profile-img.png'}
        alt="사용자 프로필 이미지"
        width={70}
        height={70}
        className="border-primary ml-2 h-17.5 w-17.5 shrink-0 rounded-(--radius) border-4 object-cover lg:hidden"
      />
      <div className="*lg:text-body-md *:text-body-sm flex flex-col gap-1 px-3 py-1 *:flex *:gap-4 lg:gap-3">
        <p>
          <span className="shrink-0">이름</span>
          <span>|</span>
          <span className="line-clamp-1">
            {user?.name || '이름을 추가해주세요'}
          </span>
        </p>
        <p>
          <span className="shrink-0">전화</span>
          <span>|</span>
          <span className="line-clamp-1">
            {user?.phone || '연락처를 추가해주세요'}
          </span>
        </p>
        <p>
          <span className="shrink-0">주소</span>
          <span>|</span>
          <span className="line-clamp-1">
            {user?.address?.streetAddress || '주소를 추가해주세요'}
          </span>
        </p>
      </div>
    </div>
  );
}
