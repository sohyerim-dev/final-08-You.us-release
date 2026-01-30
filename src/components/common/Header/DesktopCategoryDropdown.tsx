import Link from 'next/link'
import { categories, categoryData } from './Header'
import SmallCategory from './SmallCategory'
import Image from 'next/image'

export default function DesktopCategoryDropdown() {
  return (
    <nav aria-label="상품 카테고리" className="relative border-gray-200">
      <div className="flex justify-between px-4">
        <div className="group w-[60%]">
          <ul className="flex h-11 flex-wrap items-center justify-between gap-3 overflow-x-auto">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/products`}
                  className="hover:text-primary text-body-sm font-medium text-gray-700 transition-colors"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          <SmallCategory categories={categories} categoryData={categoryData} />
        </div>

        <ul className="flex gap-6" aria-label="빠른 메뉴">
          <li>
            <Link href="/mypage" className="block">
              <Image
                src="/icons/User.svg"
                alt="마이페이지"
                width={120}
                height={32}
                className="h-10 w-auto"
              />
            </Link>
          </li>
          <li>
            <Link href="/cart" className="block">
              <Image
                src="/icons/Basket.svg"
                alt="장바구니"
                width={120}
                height={32}
                className="h-10 w-auto"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
