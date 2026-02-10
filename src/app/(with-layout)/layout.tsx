import CategoryInit from '@/app/CategoryInit';
import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import getCategoryCode from '@/lib/api/cods';

export default async function WithLayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categoryRes = await getCategoryCode();
  const categories =
    'item' in categoryRes ? categoryRes.item.nested.productCategory.codes : [];
  return (
    <div className="mx-auto max-w-375 min-w-90">
      <CategoryInit categories={categories} />
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
