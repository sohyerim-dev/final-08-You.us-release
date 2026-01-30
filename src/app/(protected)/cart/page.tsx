'use client'

import { useState } from 'react'
import CartList from '@/components/pages/cart/CartList'
import CartEmpty from '@/components/pages/cart/CartEmpty'

export default function CartPage() {
  const [cartItems] = useState([1, 2, 3])

  const hasCartItems = cartItems.length > 0

  return <>{hasCartItems ? <CartList /> : <CartEmpty />}</>
}
