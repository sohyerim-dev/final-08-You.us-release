export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen min-w-90 bg-gray-50 lg:max-w-375">
      {/* AuthGuard, 사용자 정보 표시 */}
      <main>{children}</main>
    </div>
  );
}
