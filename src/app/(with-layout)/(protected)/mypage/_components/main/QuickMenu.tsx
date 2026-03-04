'use client';

import useUserStore from '@/lib/zustand/auth/userStore';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface QuickMenuProps {
  className?: string;
}

export default function QuickMenu({ className }: QuickMenuProps) {
  const { user } = useUserStore();
  const pathname = usePathname();
  // console.log('회원정보1:', user);
  return (
    <div className={className}>
      {/* 빠른 메뉴 - 주문내역, 찜목록, 리뷰 등 링크 */}
      <nav className="hidden lg:flex lg:flex-col" aria-label="마이페이지 메뉴">
        <figure className="flex flex-col items-center gap-5 bg-white p-10">
          <Image
            src={user?.image || '/images/common/basic-profile-img.png'}
            alt="사용자 프로필 이미지"
            width={120}
            height={120}
            className="border-primary h-30 w-30 rounded-(--radius) border-4 object-cover"
          />
          <figcaption className="text-caption font-bold text-gray-900">
            {user?.name}님
          </figcaption>
          <Link href="/mypage" className="text-body-sm text-gray-500">
            마이페이지
          </Link>
        </figure>
        <div className="border-primary flex w-55 justify-center border-y bg-white p-10 text-gray-900">
          <ul className="flex flex-col gap-12">
            <li>
              <p className="text-caption pb-4">나의 정보</p>
              <ul className="*:text-body-sm flex flex-col space-y-2 pl-4 *:before:content-['>']">
                <li>
                  <Link
                    href="/mypage/profile"
                    className={`hover:underline ${pathname === '/mypage/profile' ? 'text-primary' : ''}`}
                  >
                    내 정보
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mypage/wishlist"
                    className={`hover:underline ${pathname === '/mypage/wishlist' ? 'text-primary' : ''}`}
                  >
                    찜한선물보기
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mypage/reviews"
                    className={`hover:underline ${pathname === '/mypage/reviews' ? 'text-primary' : ''}`}
                  >
                    나의 후기
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <p className="text-caption pb-4">주문/배송내역</p>
              <ul className="*:text-body-sm flex flex-col space-y-2 pl-4 *:before:content-['>']">
                <li>
                  <Link
                    href="/mypage/orders"
                    className={`hover:underline ${pathname === '/mypage/orders' ? 'text-primary' : ''}`}
                  >
                    내 주문 보기
                  </Link>
                </li>
                {/* <li>
                  <Link href="/mypage/delivery" className="hover:underline">
                    배송 조회
                  </Link>
                </li> */}
              </ul>
            </li>
            {/* <li>
              <p className="text-caption pb-4">문의하기</p>
              <ul className="*:text-body-sm flex flex-col space-y-2 pl-4 *:before:content-['>']">
                <li>
                  <Link href="/mypage/qna" className="hover:underline">
                    작성한 Q&A
                  </Link>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
