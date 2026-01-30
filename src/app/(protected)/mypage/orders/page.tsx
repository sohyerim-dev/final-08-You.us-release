import MyPageSection from '@/components/pages/mypage/main/MyPageSection'
import OrderList from '@/components/pages/mypage/orders/OrderList'

export default function OrdersPage() {
  return (
    <main className="mt-10 flex w-full flex-col gap-8.5 px-4 pb-8.5 *:text-gray-900 md:px-8 lg:px-12">
      <h1 className="sr-only">주문 내역</h1>

      {/* 전체 주문 내역 리스트 */}
      <section className="flex flex-col gap-2">
        <MyPageSection title={'주문/배송내역'}>
          {/* 주문 내역 카드 컴포넌트 */}
          <OrderList />
        </MyPageSection>
      </section>
    </main>
  )
}
