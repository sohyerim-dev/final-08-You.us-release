import ProductSummary from '@/components/pages/mypage/main/ProductSummary'
import OrderButtons from '@/components/pages/mypage/orders/OrderButtons'
import OrderStatusHeader from '@/components/pages/mypage/orders/OrderStatusHeader'

export default function OrderItem({
  id,
  item: {
    status,
    date,
    imageSrc,
    imageAlt,
    name,
    price,
    deliveryStatus,
    reviewStatus,
    scope,
  },
}: {
  id: number
  item: {
    status: 'SHIPPING' | 'DELIVERED'
    date: string
    imageSrc: string
    imageAlt: string
    name: string
    price: number | string
    deliveryStatus: 'SHIPPING' | 'DELIVERED'
    reviewStatus: 'NONE' | 'WRITTEN'
    scope: { rating: number } | null
  }
}) {
  return (
    <li>
      <OrderStatusHeader status={status} date={date} />
      <div className="border-primary ml-3 flex flex-col lg:flex-row lg:justify-between">
        <ProductSummary
          key={id}
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          name={name}
          price={price}
          scope={scope}
          deliveryStatus={deliveryStatus}
          reviewStatus={reviewStatus}
        />
        <OrderButtons
          deliveryStatus={deliveryStatus}
          reviewStatus={reviewStatus}
        />
      </div>
    </li>
  )
}
