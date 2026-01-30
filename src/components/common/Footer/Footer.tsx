import DesktopFooter from './DesktopFooter'

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-200">
      {/* DeskTop */}
      {/* <div className="hidden lg:block"> */}
      <DesktopFooter />
      <div className="bg-primary absolute right-0 bottom-0 left-0 h-6 lg:hidden"></div>
    </footer>
  )
}
