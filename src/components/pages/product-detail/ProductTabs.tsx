'use client'

import { useState } from 'react'
import ProductDetailContent from '@/components/pages/product-detail/ProductTap/ProductDetailContent'
import ProductReviews from '@/components/pages/product-detail/ProductTap/ProductReviews/ProductReviews'
import ProductInquiry from '@/components/pages/product-detail/ProductTap/ProductInquiry'
import RelatedProducts from '@/components/pages/product-detail/ProductTap/RelatedProducts'

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('detail')

  const tabs = [
    { id: 'detail', label: '상세정보' },
    { id: 'review', label: '후기', count: '1,000' },
    { id: 'inquiry', label: '상품문의' },
    { id: 'related', label: '관련상품' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'detail':
        return <ProductDetailContent />
      case 'review':
        return <ProductReviews />
      case 'inquiry':
        return <ProductInquiry />
      case 'related':
        return <RelatedProducts />
      default:
        return null
    }
  }

  return (
    <>
      <div className="mt-20 flex gap-2">
        <div
          role="tablist"
          className="flex h-[70px] w-full items-center justify-between gap-6 border-b p-0 lg:gap-1.5 lg:rounded lg:border-b-0 lg:bg-gray-300 lg:p-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer pb-3 text-sm font-medium transition-colors lg:flex-1 lg:rounded lg:px-6 lg:py-4 lg:pb-4 lg:text-base ${
                activeTab === tab.id
                  ? 'border-primary text-primary border-b-3 lg:border-b-0 lg:bg-gray-50'
                  : 'text-gray-500 md:text-gray-700'
              }`}
            >
              {tab.label}
              {tab.count && <span className="ml-1 text-sm">({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" id={`tabpanel-${activeTab}`} className="mt-6">
        {renderTabContent()}
      </div>
    </>
  )
}
