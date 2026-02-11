'use client';

import { useCategoryStore } from '@/lib/zustand/categoryStore';
import type { CategoryCode } from '@/types/categoryCode.type';
import { useEffect, useRef } from 'react';

export default function CategoryInit({
  categories,
}: {
  categories: CategoryCode[];
}) {
  // const initialized = useRef(false);
  // if (!initialized.current) {
  //   useCategoryStore.setState({ categories });
  //   initialized.current = false;
  // }
  // return null;
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCategoryStore.setState({ categories });
      initialized.current = true;
    }
  }, [categories]);

  return null;
}
