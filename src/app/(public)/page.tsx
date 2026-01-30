import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import Main from '@/components/pages/main/Main'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export default async function ThemeTestPage() {
  const cookieStore = await cookies()
  const hasVisited = cookieStore.get('hasVisited')

  if (!hasVisited) {
    redirect('/intro')
  }

  return (
    <div className="mx-auto max-w-[1500px] bg-gray-50">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
