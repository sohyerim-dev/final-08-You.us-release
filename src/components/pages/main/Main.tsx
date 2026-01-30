'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import styles from './Main-swiper.module.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade' // Fade CSS 추가!
import ProductCard from '@/components/common/ProductCard'
import SectionHeader from '@/components/common/SectionHeaderProps'

export default function Main() {
  const productCategories = [
    {
      id: 1,
      title: '식품 카테고리 인기 상품',
      products: [
        {
          id: 1,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=1',
        },
        {
          id: 2,
          name: '상품명: [에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
          price: '188,800원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=2',
        },
        {
          id: 3,
          name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
          price: '139,650원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=3',
        },
        {
          id: 4,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=4',
        },
        {
          id: 5,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=4',
        },
        {
          id: 6,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=4',
        },
        {
          id: 7,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=9',
        },
        {
          id: 8,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=9',
        },
      ],
    },
    {
      id: 2,
      title: '뷰티 카테고리 인기 상품',
      products: [
        {
          id: 5,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=5',
        },
        {
          id: 6,
          name: '상품명: [에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
          price: '188,800원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=6',
        },
        {
          id: 7,
          name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
          price: '139,650원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=7',
        },
        {
          id: 8,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=8',
        },
        {
          id: 9,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=9',
        },
        {
          id: 10,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=9',
        },
      ],
    },
    {
      id: 3,
      title: '생활용품 카테고리 인기 상품',
      products: [
        {
          id: 9,
          name: '[설화수] New 자음 2종 세트 (자음수EX, 자음유액EX)',
          price: '135,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=9',
        },
        {
          id: 10,
          name: '상품명: [에스티 로더] 갈색병 세럼 75ml(+디럭스 5종 증정)',
          price: '188,800원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=10',
        },
        {
          id: 11,
          name: '[산타마리아노벨라] 프리지아 바디워시&바디로션 기프트 세트',
          price: '139,650원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=11',
        },
        {
          id: 12,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=12',
        },
        {
          id: 13,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=12',
        },
        {
          id: 14,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=12',
        },
        {
          id: 15,
          name: '[페라가모] 세뇨리나 미스테리오사 EDP 향수 30ml',
          price: '51,000원',
          rating: '★ 5.0 (10)',
          image: 'https://picsum.photos/400/400?random=12',
        },
      ],
    },
  ]

  return (
    <main className="">
      {/* 메인 배너 스와이퍼 */}
      <div className="relative my-[43px] h-[280px] w-full lg:h-[500px]">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          className={`${styles.bannerSwiper} min-w-[360px]`}
          effect="fade" // Fade 효과 적용
          fadeEffect={{
            crossFade: true,
          }}
          speed={500}
        >
          <SwiperSlide>
            <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-blue-500 to-purple-600">
              <div className="text-center text-white">
                <h2 className="text- mb-4 font-bold lg:text-5xl">
                  신년 특별 이벤트
                </h2>
                <p className="mb-6 text-lg lg:text-2xl">
                  전 상품 최대 30% 할인
                </p>
                <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                  지금 확인 →
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-amber-500 to-orange-600">
              <div className="text-center text-white">
                <h2 className="mb-4 text-3xl font-bold lg:text-5xl">
                  특가 세일
                </h2>
                <p className="mb-6 text-lg lg:text-2xl">오늘만 특별한 가격</p>
                <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                  지금 확인 →
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-green-500 to-teal-600">
              <div className="text-center text-white">
                <h2 className="mb-4 text-sm font-bold lg:text-5xl">
                  신상품 출시
                </h2>
                <p className="mb-6 text-lg lg:text-2xl">최신 트렌드 상품</p>
                <button className="rounded-full bg-red-500 px-8 py-3 font-bold text-white hover:bg-red-600">
                  지금 확인 →
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-8 lg:mb-[60px]">
        {/* 카테고리별 상품 섹션 반복 */}
        {productCategories.map((category) => (
          <div key={category.id} className="mb-12 lg:mb-16">
            <div className="mb-6 lg:mb-13">
              <SectionHeader title={category.title} id={category.id} />
            </div>

            {/* 모바일 */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:hidden">
              {category.products.slice(0, 4).map((product) => (
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

            {/* 데스크톱 */}
            <div className="hidden lg:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={4}
                navigation={true}
                slidesPerGroup={4}
                className={styles.productSwiper}
                loop={true}
              >
                {category.products.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
