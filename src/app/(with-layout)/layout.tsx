import CategoryInit from '@/app/CategoryInit';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import getCategoryCode from '@/lib/api/codes';

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
