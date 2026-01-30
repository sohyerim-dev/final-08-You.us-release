import ImageGallery from '@/components/pages/product-detail/ImageGallery'
import ProductDetailInfo from '@/components/pages/product-detail/ProductDetailInfo'
import ProductTabs from './ProductTabs'

export default function ProductDatail() {
  return (
    <>
      <main className="overflow-hidden px-5 lg:px-[100px] lg:py-20">
        <div className="min-w-0 lg:flex lg:gap-[3vw]">
          <div className="w-full py-5 lg:w-2/5 lg:max-w-125 lg:shrink-0 lg:py-[2vw]">
            <ImageGallery />
          </div>
          <div className="min-w-0 flex-1">
            <ProductDetailInfo />
          </div>
        </div>
        <ProductTabs />
      </main>
    </>
  )
}
