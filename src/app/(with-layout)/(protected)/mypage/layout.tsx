import MypageLayoutClient from './MypageLayoutClient';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '주문 내역과 회원 정보를 관리하세요.',
  robots: { index: false, follow: false },
};

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MypageLayoutClient>{children}</MypageLayoutClient>;
}
