'use client';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './Main-swiper.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function MainBannerSwiper() {
  return (
    <div className="relative my-10.75 h-70 w-full lg:h-125">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className={`${styles.bannerSwiper} min-w-90`}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={500}
      >
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-linear-to-r">
            <Link href="/recommend">
              <Image
                width={1024}
                height={500}
                className="mx-auto hidden md:hidden lg:block"
                alt=""
                src="/images/banners/swiper-image-1-lg.svg"
              />
              <Image
                width={738}
                height={280}
                className="mx-auto hidden md:block lg:hidden"
                alt=""
                src="/images/banners/swiper-image-1-md.svg"
              />
              <Image
                width={360}
                height={280}
                className="mx-auto block md:hidden lg:hidden"
                alt=""
                src="/images/banners/swiper-image-1-mo.svg"
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-linear-to-r">
            <Link href="/products/PC01">
              <Image
                width={1024}
                height={500}
                className="mx-auto hidden md:hidden lg:block"
                alt=""
                src="/images/banners/swiper-image-2-lg.svg"
              />
              <Image
                width={738}
                height={280}
                className="mx-auto hidden md:block lg:hidden"
                alt=""
                src="/images/banners/swiper-image-2-md.svg"
              />
              <Image
                width={360}
                height={280}
                className="mx-auto block md:hidden lg:hidden"
                alt=""
                src="/images/banners/swiper-image-2-mo.svg"
              />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex h-full w-full items-center justify-center bg-[#FEF9ED] bg-linear-to-r">
            <Link href="/products/PC01">
              <Image
                width={1024}
                height={500}
                className="mx-auto hidden md:hidden lg:block"
                alt=""
                src="/images/banners/swiper-image-4-lg.png"
              />
              <Image
                width={738}
                height={280}
                className="mx-auto hidden md:block lg:hidden"
                alt=""
                src="/images/banners/swiper-image-4-md.png"
              />
              <Image
                width={360}
                height={280}
                className="mx-auto block md:hidden lg:hidden"
                alt=""
                src="/images/banners/swiper-image-4-sm.png"
              />
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
