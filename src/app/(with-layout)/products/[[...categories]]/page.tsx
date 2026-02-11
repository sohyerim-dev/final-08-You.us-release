import type { Metadata } from 'next';
import ProductListClient from '@/components/pages/products/ProductListClient';

type Props = {
  params: Promise<{ categories?: string[] }>;
};

const CATEGORY_NAMES: Record<string, string> = {
  PC01: '식품',
  PC02: '상품권',
  PC03: '뷰티',
  PC04: '주얼리',
  PC05: '패션잡화',
  PC06: '인테리어',
  PC07: '문구',
  PC08: '가전·디지털',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categories } = await params;

  console.log('category', categories);
  const category = categories?.[0];
  const categoryName = category ? CATEGORY_NAMES[category] || category : '전체';

  return {
    title: `${categoryName} 상품 목록 | You,Us`,
    description: `You,Us의 ${categoryName} 카테고리 상품을 둘러보세요.`,
  };
}

export default function ProductsPage({ params }: Props) {
  return <ProductListClient params={params} />;
}
