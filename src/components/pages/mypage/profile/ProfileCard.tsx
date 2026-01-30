import Image from 'next/image'

export default function ProfileCard() {
  return (
    <div className="border-primary flex items-center gap-3 border-y bg-white p-5 px-3 lg:gap-3">
      <Image
        src="/images/common/basic-profile-img.png"
        alt="사용자 프로필 이미지"
        width={70}
        height={70}
        className="border-primary ml-2 rounded-(--radius) border-4 lg:hidden"
      />
      <div className="*lg:text-body-md *:text-body-sm flex flex-col gap-1 px-3 py-1 *:flex *:gap-4 lg:gap-3">
        <p>
          <span className="shrink-0">이름</span>
          <span>|</span>
          <span className="line-clamp-1">홍길동</span>
        </p>
        <p>
          <span className="shrink-0">전화</span>
          <span>|</span>
          <span className="line-clamp-1">010-1234-5678</span>
        </p>
        <p>
          <span className="shrink-0">주소</span>
          <span>|</span>
          <span className="line-clamp-1">서울특별시 강남구 테헤란로 123</span>
        </p>
      </div>
    </div>
  )
}
