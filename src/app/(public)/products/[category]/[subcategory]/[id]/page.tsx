import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import ProductDatail from '@/components/pages/product-detail/ProductDetail'

export default function ProductDatailPage() {
  return (
    <div className="mx-auto max-w-[1500px] min-w-[360px]">
      <Header />
      <ProductDatail />
      <Footer />
    </div>
  )
}
