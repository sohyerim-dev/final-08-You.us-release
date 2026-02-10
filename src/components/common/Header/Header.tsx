import DesktopHeader from '@/components/common/Header/DesktopHeader';
import MobileContainer from '@/components/common/Header/MobileContainer';

export default function Header() {
  //캐싱 관리로 인한 컴포넌트 분리

  return (
    <header className="border-gray-200">
      <h1 className="sr-only">취향에 맞는 선물을 추천해주는 서비스</h1>

      <div className="w-full">
        {/* Mobile */}
        <div className="lg:hidden">
          <MobileContainer />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopHeader />
        </div>
      </div>
    </header>
  );
}
