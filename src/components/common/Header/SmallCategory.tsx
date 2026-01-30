import Link from 'next/link'
import type { Category, categoryData as CategoryDataType } from './Header'

interface SmallCategoryProps {
  categories: Category[]
  categoryData: typeof CategoryDataType
}

export default function SmallCategory({
  categories,
  categoryData,
}: SmallCategoryProps) {
  return (
    <div
      role="menu"
      aria-label="상세 카테고리"
      className="absolute top-full left-0 z-50 hidden w-full bg-gray-100 shadow-lg group-hover:block"
    >
      <div className="px-6 py-5">
        <div className="flex flex-wrap gap-7">
          {categories.map((category) => (
            <div
              key={category}
              className="hover:bg-category w-[14%] rounded p-7 transition-colors"
            >
              <h2 className="text-primary mb-4 border-b-2 pb-2 pl-1.5 font-bold">
                {category}
              </h2>
              <ul className="space-y-2">
                {categoryData[category]?.map((subCategory) => (
                  <li key={subCategory}>
                    <Link
                      href={`/products`}
                      className="hover:text-primary before:bg-primary text-body-sm relative inline-block text-gray-700 transition-colors before:absolute before:top-1/2 before:-left-4 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-100"
                    >
                      {subCategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
