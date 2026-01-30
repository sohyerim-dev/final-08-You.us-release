import MoreButton from '@/components/common/MoreButton'
import ProductCard from '@/components/common/ProductCard'

export default function WishlistPage() {
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
      name: '[에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
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
      name: '[에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
      price: '188,800원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/02.png',
    },
    {
      id: 7,
      name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
      price: '139,650원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/03.png',
    },
    {
      id: 8,
      name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
      price: '51,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/04.png',
    },
    {
      id: 9,
      name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
      price: '135,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/01.png',
    },
    {
      id: 10,
      name: '[에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
      price: '188,800원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/02.png',
    },
    {
      id: 11,
      name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
      price: '139,650원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/03.png',
    },
    {
      id: 12,
      name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
      price: '51,000원',
      rating: '★ 5.0 (10)',
      image: '/images/products/Beauty/04.png',
    },
  ]

  return (
    <>
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-4 lg:flex-row lg:py-10">
        <main className="flex-1">
          <h2 className="text-title-sm font-pretendard mb-3 pl-4 font-bold text-gray-900 lg:mb-6">
            찜한 선물
          </h2>

          <div
            className="grid grid-cols-2 gap-x-4 gap-y-4 p-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-9"
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
          <MoreButton className="mx-auto mt-[35px] mb-[120px]" />
        </main>
      </div>
    </>
  )
}
