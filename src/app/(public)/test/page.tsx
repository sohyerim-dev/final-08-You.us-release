// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'
'use client'
import Button from '@/components/common/Button'
import Footer from '@/components/common/Footer/Footer'
import Header from '@/components/common/Header/Header'
import Input from '@/components/common/Input'
import Pagination from '@/components/common/Pagination'
import Image from 'next/image'

export default function ThemeTestPage() {
  // const cookieStore = await cookies()
  // const hasVisited = cookieStore.get('hasVisited')

  // if (!hasVisited) {
  //   redirect('/intro')
  // }

  return (
    <>
      <Header />
      <main className="space-y-12 p-10">
        <section className="space-y-4">
          <h2 className="text-title-md">🎨 Colors</h2>

          <div className="flex flex-wrap gap-4">
            <ColorBox name="primary" className="bg-primary text-white" />
            <ColorBox
              name="primary-hover"
              className="bg-primary-hover text-white"
            />
            <ColorBox name="error" className="bg-error text-white" />
            <ColorBox name="success" className="bg-success text-white" />

            <ColorBox
              name="gray-50"
              className="border bg-gray-50 text-gray-900"
            />
            <ColorBox name="gray-100" className="bg-gray-100 text-gray-900" />
            <ColorBox name="gray-300" className="bg-gray-300 text-gray-900" />
            <ColorBox name="gray-500" className="bg-gray-500 text-white" />
            <ColorBox name="gray-900" className="bg-gray-900 text-white" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-title-md">🔠 Font Sizes</h2>

          <p className="text-title-lg font-bold">Title Large</p>
          <p className="text-title-md font-bold">Title Medium</p>
          <p className="text-title-sm">Title Small</p>

          <p className="text-body-lg">Body Large</p>
          <p className="text-body-md">Body Medium</p>
          <p className="text-body-sm">Body Small</p>

          <p className="text-button">Button Text</p>
          <p className="text-caption">Caption Text</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-title-md">◼ Border Radius</h2>

          <div className="flex gap-4">
            <RadiusBox label="radius" className="bg-primary rounded" />
            <RadiusBox label="radius-lg" className="bg-primary rounded-lg" />
            <RadiusBox
              label="radius-full"
              className="bg-primary rounded-full"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-title-md">🅰 Font Family</h2>

          <p className="font-noto text-body-md">
            Noto Sans KR 폰트가 적용된 텍스트입니다.
          </p>
          <p className="font-pretendard text-body-md">
            pretendard 폰트가 적용된 텍스트입니다.
          </p>
          <Button
            onClick={() => console.log('test')}
            disabled={false}
            variant="primary"
          >
            로그인
          </Button>
          <Image src="/icons/LOGO.svg" alt="아이콘"></Image>
          <button className="radius-sm border">test</button>
          <Input type="text" placeholder="나는 지금 테스트 중이잖아" />
          <input type="text" placeholder="나는 지금 테스트 중이잖아" />
          <Pagination
            currentPage={3}
            totalPages={12}
            onPageChange={(page) => {
              console.log(page)
            }}
          ></Pagination>
        </section>
      </main>
      <Button
        variant="update"
        className="text-body-sm border-2 border-blue-500 hover:bg-gray-200"
      >
        답변완료
      </Button>
      <Button
        variant="update"
        className="text-body-sm border-2 border-blue-500 hover:bg-gray-200"
      >
        답변완료
      </Button>
      <Button className="text-body-sm bg-primary-hover hover:bg-primary">
        후기쓰기
      </Button>
      <Footer />
    </>
  )
}

function ColorBox({ name, className }: { name: string; className: string }) {
  return (
    <div
      className={`flex h-20 w-28 items-center justify-center rounded text-sm ${className}`}
    >
      {name}
    </div>
  )
}

function RadiusBox({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`h-20 w-28 ${className} flex items-center justify-center text-white`}
    >
      {label}
    </div>
  )
}
