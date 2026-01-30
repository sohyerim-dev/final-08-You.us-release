import Link from 'next/link'
import Button from '../Button'
import Image from 'next/image'

export default function DesktopFooter() {
  return (
    <div className="px-5 py-4 lg:py-8">
      <div className="flex items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <div className="hidden rounded-xl border-2 border-gray-200 bg-white p-3.5 shadow-sm lg:block">
            <Image
              src="/icons/LOGO.svg"
              alt="로고 사진"
              width={135}
              height={40}
            />
          </div>

          <div className="flex flex-col gap-1 lg:gap-5">
            <div className="mb-6 flex items-center justify-start gap-1 text-[10px] lg:text-xs">
              {['회사소개', '이용약관', '개인정보처리방침', '분쟁사항'].map(
                (link, index) => (
                  <div key={index}>
                    <Link
                      href="#"
                      className="font-medium text-gray-700 transition-colors active:text-rose-600"
                    >
                      {link}
                    </Link>
                    {index < 3 && (
                      <span className="mx-0.5 text-gray-400">|</span>
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="mb-5 space-y-1.5 text-[10px] text-gray-600 lg:text-xs">
              <div>
                <span className="text-body-sm font-semibold text-gray-800">
                  COMPANY
                </span>{' '}
                COMPANY(주)유앤어스 | 대표이사 : 소혜림
              </div>

              <div>사업자등록번호: 105-813-5526</div>

              <div>OWNER: 소대표 TEL: 070-1234-5678</div>

              <div>개인정보보호책임자 : 한정아</div>

              <div>
                서울 마포구 강변북로 141 5층 5호 2동(목해동, 서울센터) |
                고객센터번호 1577 문의
              </div>

              <div>호스팅 사업자 - 김여경 (Vercell 책임자)</div>
            </div>

            <div className="mb-6 space-y-1 text-[10px] text-gray-500 lg:text-xs">
              <p>고객지원주소 : 서울특별시 마포구 you.us플러스 2호</p>
              <p>
                유어스(주) 사이트는 고객을 위한 정성을 다하며 응답하고 있습니다
                궁금한 사항은 고객지원센터에 연락주세요
              </p>
            </div>
          </div>
        </div>
        <Link
          href={'https://m.epost.go.kr/'}
          className="ml-2 hidden shrink-0 lg:block"
        >
          <Button className="h-12.5">우체국 조회하기</Button>
        </Link>
      </div>
      <div className="mb-6 border-t border-gray-200 pt-4 pb-1 text-center lg:mb-0">
        <p className="text-xs text-gray-500">
          Copyright © 2026{' '}
          <span className="font-semibold text-gray-700">you,Us</span> All rights
          reserved.
        </p>
      </div>
    </div>
  )
}
