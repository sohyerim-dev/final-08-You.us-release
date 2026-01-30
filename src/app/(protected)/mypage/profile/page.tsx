import Button from '@/components/common/Button'
import Image from 'next/image'

export default function ProfilePage() {
  return (
    <section>
      <h1 className="sr-only">내 정보 수정</h1>
      <h2 className="lg:text-title-sm text-body-sm mt-5 mb-2.5 lg:mt-28.5">
        내 정보
      </h2>
      <div className="border-primary py-button-y px-button-y flex w-42 flex-row items-center gap-3 border-y bg-white lg:w-104.5 lg:gap-[40px] lg:px-11.25 lg:py-[40px]">
        <figure className="h-12.5 w-12.5 overflow-hidden rounded-lg border-2 border-gray-500 lg:h-34.25 lg:w-34.25 lg:rounded-[100px] lg:border-4">
          <Image
            width={137}
            height={137}
            src="/images/common/basic-profile-img.png"
            alt="프로필 이미지"
          />
        </figure>
        <div className="flex flex-col gap-2.5 lg:gap-8.75">
          <h3 className="lg:text-body-lg text-[12px]">프로필 이미지</h3>
          <Button className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]">
            변경하기
          </Button>
        </div>
      </div>
      <ul className="border-primary mt-7.5 mb-7.5 border-y bg-gray-50 lg:mb-63">
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[40px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            이름
          </dt>
          <span aria-hidden="true">|</span>
          <dd className="lg:text-body-md pl-7.5 text-[12px]">홍길동</dd>
          <Button className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]">
            변경하기
          </Button>
        </li>
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[40px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            연락처
          </dt>
          <span aria-hidden="true">|</span>
          <dd className="lg:text-body-md pl-7.5 text-[12px]">010-1234-5678</dd>
          <Button className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]">
            변경하기
          </Button>
        </li>
        <li className="py-button-y flex flex-row items-center border-b border-gray-300 lg:py-[40px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            주소
          </dt>
          <span aria-hidden="true">|</span>
          <dd className="lg:text-body-md pl-7.5 text-[12px]">
            서울특별시 종로구 계동길 52, 1층
          </dd>
          <Button className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]">
            변경하기
          </Button>
        </li>
        <li className="py-button-y flex flex-row items-center lg:py-[40px]">
          <dt className="lg:text-body-md w-14 text-center text-[12px] lg:w-25">
            이메일
          </dt>
          <span aria-hidden="true">|</span>
          <dd className="lg:text-body-md pl-7.5 text-[12px]">imgd@naver.com</dd>
          <Button className="bg-gary-50 border-primary text-primary lg:text-button px-button-y lg:py-button-y lg:px-button-x ml-auto rounded-[5px] border py-1.25 text-[12px] hover:text-gray-50 lg:rounded-[10px]">
            변경하기
          </Button>
        </li>
      </ul>
    </section>
  )
}
