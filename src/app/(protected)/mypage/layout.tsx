import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import QuickMenu from '@/components/pages/mypage/main/QuickMenu'

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto bg-gray-50">
      <Header />
      <main className="mx-auto w-full px-7.5 lg:flex lg:max-w-375 lg:min-w-5xl lg:gap-32.5">
        <QuickMenu className="hidden lg:block lg:shrink-0" />
        <div className="w-full lg:max-w-255 lg:min-w-0 lg:flex-1">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
