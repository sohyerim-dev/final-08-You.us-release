export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      {/* 중앙 정렬, 미니멀 헤더 */}
      <main className="w-full">{children}</main>
    </div>
  )
}
