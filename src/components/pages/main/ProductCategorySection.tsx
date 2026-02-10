'use client';

import ProductCard from '@/components/common/ProductCard';
import SectionHeader from '@/components/common/SectionHeaderProps';
import { ProductItem } from '@/types/product.types';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Main-swiper.module.css';

interface ProductCategorySectionProps {
  categoryName: string;
  products: ProductItem[];
}

export default function ProductCategorySection({
  categoryName,
  products,
}: ProductCategorySectionProps) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="mb-6 lg:mb-13">
        <SectionHeader
          title={categoryName}
          mainCategory={products[0]?.extra.category[0] ?? ''}
        />
      </div>

      {/* 모바일 */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:hidden">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.mainImages[0]?.path || ''}
            name={product.name}
            price={`${product.price.toLocaleString()}`}
            rating={product.rating ?? 0}
            replies={
              typeof product.replies === 'number'
                ? product.replies
                : product.replies.length
            }
            mainCategory={product.extra.category[0] ?? ''}
            subCategory={product.extra.category[1] ?? ''}
          />
        ))}
      </div>

      {/* 데스크톱 */}
      <div className="hidden overflow-hidden lg:block">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={4}
          navigation={true}
          slidesPerGroup={4}
          className={styles.productSwiper}
          loop={products.length > 4}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                id={product._id}
                image={product.mainImages[0]?.path || ''}
                name={product.name}
                price={`${product.price.toLocaleString()}`}
                rating={product.rating ?? 0}
                replies={
                  typeof product.replies === 'number'
                    ? product.replies
                    : product.replies.length
                }
                mainCategory={product.extra.category[0] ?? ''}
                subCategory={product.extra.category[1] ?? ''}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
