'use client';

import { useRef, useState } from 'react';
import ProductDetailContent from '@/components/pages/product-detail/ProductTap/ProductDetailContent';
import ProductReviews from '@/components/pages/product-detail/ProductTap/ProductReviews/ProductReviews';
import ProductInquiry from '@/components/pages/product-detail/ProductTap/ProductInquiry';
import RelatedProducts from '@/components/pages/product-detail/ProductTap/RelatedProducts';

export default function ProductTabs({
  content,
  replies,
}: {
  content: string;
  replies: number;
}) {
  const [activeTab, setActiveTab] = useState('detail');
  const tabRef = useRef<HTMLDivElement>(null);

  const scrollToTab = () => {
    tabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const tabs = [
    { id: 'detail', label: '상세정보' },
    { id: 'review', label: '후기', count: replies },
    // { id: 'inquiry', label: '상품문의' },
    // { id: 'related', label: '관련상품' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':
        return <ProductDetailContent content={content} />;
      case 'review':
        return <ProductReviews />;
      case 'inquiry':
        return <ProductInquiry />;
      case 'related':
        return <RelatedProducts />;
      default:
        return null;
    }
  };

  return (
    <>
      <div ref={tabRef} className="mt-20" />
      <div className="sticky top-0 z-10 flex gap-2 bg-white">
        <div
          role="tablist"
          className="flex h-[70px] w-full items-center justify-around gap-6 border-b p-0 lg:justify-between lg:gap-1.5 lg:rounded lg:border-b-0 lg:bg-gray-300 lg:p-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => {
                setActiveTab(tab.id);
                scrollToTab();
              }}
              className={`cursor-pointer pb-3 text-sm font-medium transition-colors lg:flex-1 lg:rounded lg:px-6 lg:py-4 lg:pb-4 lg:text-base ${
                activeTab === tab.id
                  ? 'border-primary text-primary border-b-3 lg:border-b-0 lg:bg-gray-50'
                  : 'text-gray-500 md:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count != null && (
                <span className="ml-1 text-sm">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" id={`tabpanel-${activeTab}`} className="mt-6">
        {renderTabContent()}
      </div>
    </>
  );
}
