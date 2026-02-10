import Link from 'next/link';
import type { CategoryCode } from '@/types/categoryCode.type';

interface SmallCategoryProps {
  categories: CategoryCode[];
}

export default function SmallCategory({ categories }: SmallCategoryProps) {
  return (
    <div
      role="menu"
      aria-label="상세 카테고리"
      className="absolute top-full left-0 z-50 hidden w-full rounded bg-gray-50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:block"
    >
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-4">
          {categories
            ?.filter((category) => category.code !== 'PC00')
            .map((category) => (
              <div
                key={category.code}
                className="hover:bg-category rounded p-4 transition-colors"
              >
                <h2 className="text-primary mb-2 border-b-2 pb-1.5 pl-1 text-sm font-bold">
                  {category.value}
                </h2>
                <ul className="space-y-1 pl-5">
                  {category.sub?.map((subCategory) => (
                    <li key={subCategory.code}>
                      <Link
                        href={`/products/${category.code}/${subCategory.code}`}
                        className="hover:text-primary before:bg-primary text-body-sm relative inline-block text-gray-700 transition-colors before:absolute before:top-1/2 before:-left-4 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:opacity-0 before:transition-opacity before:content-[''] hover:before:opacity-100"
                      >
                        {subCategory.value}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
