'use client'

import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import MoreButton from '@/components/common/MoreButton'
import ProductCard from '@/components/common/ProductCard'
import Link from 'next/link'

export default function ProductSort() {
  const products = [
    {
      id: 1,
      name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
      price: '135,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/01.png',
    },
    {
      id: 2,
      name: '상품명: [에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
      price: '188,800원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/02.png',
    },
    {
      id: 3,
      name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
      price: '139,650원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/03.png',
    },
    {
      id: 4,
      name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
      price: '51,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/04.png',
    },
    {
      id: 5,
      name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
      price: '135,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/01.png',
    },
    {
      id: 6,
      name: '상품명: [에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
      price: '188,800원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/02.png',
    },
    {
      id: 7,
      name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
      price: '139,650원',
      rating: '★5.0 (10)',
      image: '/images/products/Beauty/03.png',
    },
    {
      id: 8,
      name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
      price: '51,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/04.png',
    },
  ]

  return (
    <>
      <Header />
      <main className="w-full bg-gray-50 py-8">
        <div className="px-4">
          <nav aria-label="breadcrumb" className="mb-6 ml-4 lg:mb-8 lg:ml-3">
            <ol className="text-body-sm flex items-center gap-1 text-gray-900">
              <li>
                <Link
                  href="/"
                  className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  홈
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="text-gray-900">&gt;</span>
              </li>
              <li>
                <Link
                  href="/category/beauty"
                  className="text-body-md hover:text-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                >
                  뷰티
                </Link>
              </li>
              <li aria-hidden="true">
                <span className="text-gray-900">&gt;</span>
              </li>
              <li>
                <span
                  className="text-body-md text-gray-900"
                  aria-current="page"
                >
                  화장품
                </span>
              </li>
            </ol>
          </nav>

          {/* 필터 탭 - 높은가격순, 낮은가격순, 평점많은순, 리뷰많은순 */}
          <div className="mb-6 flex items-center gap-1 pb-4 lg:mb-[45px]">
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              높은가격순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              낮은가격순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              평점많은순
            </button>
            <button className="text-body-md cursor-pointer rounded px-3 py-1.5 text-gray-500 hover:text-gray-900">
              리뷰많은순
            </button>
          </div>

          {/* 카테고리 제목 */}
          <h1 className="text-title-sm font-pretendard mb-8 font-bold text-gray-900">
            화장품 카테고리
          </h1>

          {/* 상품 그리드 */}
          <div
            className="mb-[100px] grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="상품 목록"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        </div>
        <MoreButton className="mx-auto mb-[150px]" />
      </main>
      <Footer />
    </>
  )
}
