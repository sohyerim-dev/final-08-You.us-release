'use client';

import { useCategoryStore } from '@/lib/zustand/categoryStore';
import type { CategoryCode } from '@/types/categoryCode.type';
import { useRef } from 'react';

export default function CategoryInit({
  categories,
}: {
  categories: CategoryCode[];
}) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useCategoryStore.setState({ categories });
    initialized.current = false;
  }
  return null;
}
