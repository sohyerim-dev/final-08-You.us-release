import { Metadata } from 'next';
import CartPageClient from '@/components/pages/cart/CartPageClient';

export const metadata: Metadata = {
  title: '장바구니',
  description: '장바구니에 담긴 상품을 확인하세요.',
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartPageClient />;
}
