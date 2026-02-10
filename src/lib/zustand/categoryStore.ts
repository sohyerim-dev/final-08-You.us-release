import { CategoryCode } from '@/types/categoryCode.type';
import { create } from 'zustand';

interface CategoryStoreState {
  categories: CategoryCode[];
}

export const useCategoryStore = create<CategoryStoreState>((set) => ({
  categories: [],
  setCategories: (categories: CategoryCode[]) => set({ categories }),
}));
