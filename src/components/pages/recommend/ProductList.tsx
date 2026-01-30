'use client'

import ProductCard from '@/components/pages/recommend/ProductCard'

export default function ProductList() {
  return (
    <ul className="gap-button-y flex w-full flex-row">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ul>
  )
}
