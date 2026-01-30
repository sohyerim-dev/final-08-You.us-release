import Image from 'next/image'
import Link from 'next/link'

interface MobileHeaderProps {
  onMenuOpen: () => void
  isOpen: boolean
}

export default function MobileHeader({
  onMenuOpen,
  isOpen,
}: MobileHeaderProps) {
  return (
    <div className="relative flex h-20 min-w-[360px] items-center justify-between bg-gray-50 px-7">
      <button
        onClick={onMenuOpen}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0 1H23.565" stroke="#212121" strokeWidth="2" />
          <path d="M0 8H23.565" stroke="#212121" strokeWidth="2" />
          <path d="M0 15H23.565" stroke="#212121" strokeWidth="2" />
        </svg>
      </button>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2">
        <Image
          src="/icons/LOGO.svg"
          alt="You,Us 로고"
          width={120}
          height={32}
          className="h-8 w-auto"
        />
      </Link>

      <nav aria-label="빠른 메뉴">
        <ul className="flex gap-4">
          <li>
            <Link href="/mypage">
              <Image
                src="/icons/User.svg"
                alt="마이페이지"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <Image
                src="/icons/Basket.svg"
                alt="장바구니"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
