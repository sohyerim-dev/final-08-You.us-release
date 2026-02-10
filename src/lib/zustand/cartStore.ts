import fetchClient from '@/lib/api/fetchClient';
import { CartListResponse } from '@/types/cart.types';
import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

// 장바구니 아이템 1개의 타입 (API POST /carts body와 동일한 구조)
export interface LocalCartItem {
  product_id: number;
  quantity: number;
  color?: string;
  size?: string;
}

// 아이템 식별용 타입 (product_id + 옵션)
interface ItemIdentifier {
  product_id: number;
  color?: string;
  size?: string;
}

interface CartStoreState {
  // 비로그인용 로컬 장바구니
  items: LocalCartItem[];
  addItem: (item: LocalCartItem) => void;
  updateItem: (
    identifier: ItemIdentifier,
    newData: Partial<LocalCartItem>,
  ) => void;
  removeItem: (identifier: ItemIdentifier) => void;
  clearCart: () => void;
  // 로그인용 서버 장바구니 수량
  serverCartCount: number;
  setServerCartCount: (count: number) => void;
}

const isSameItem = (a: ItemIdentifier, b: ItemIdentifier): boolean => {
  if (a.product_id !== b.product_id) return false;
  if (a.color && b.color && a.color !== b.color) return false;
  if (a.size && b.size && a.size !== b.size) return false;
  return true;
};

const CartStore: StateCreator<CartStoreState> = (set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existingIndex = state.items.findIndex((el) => isSameItem(el, item));

      if (existingIndex !== -1) {
        //중복되는 요소
        const existing = state.items[existingIndex]!;

        //장바구니 배열 복사 (원본 수정 방지)
        const updated = [...state.items];
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + item.quantity,
        };
        return { items: updated };
      }

      return { items: [...state.items, item] };
    }),

  // 아이템 수정 (옵션, 수량 변경)
  updateItem: (identifier, newData) =>
    set((state) => {
      const index = state.items.findIndex((el) => isSameItem(el, identifier));
      if (index === -1) return state;

      //장바구니 배열 복사 (원본 수정 방지)
      const updated = [...state.items];
      updated[index] = { ...updated[index]!, ...newData };
      return { items: updated };
    }),

  // 아이템 삭제
  removeItem: (identifier) =>
    set((state) => ({
      items: state.items.filter((el) => !isSameItem(el, identifier)),
    })),

  clearCart: () => set({ items: [] }),
  serverCartCount: 0,
  setServerCartCount: (count) => set({ serverCartCount: count }),
});

export const useCartStore = create<CartStoreState>()(
  persist(CartStore, {
    name: 'guestCart',
  }),
);

// 서버 장바구니 수량 조회 (로그인 상태일 때)
export const fetchServerCartCount = async () => {
  try {
    const res = await fetchClient<CartListResponse>('/carts');
    const count = res.item?.length ?? 0;
    useCartStore.getState().setServerCartCount(count);
  } catch {
    useCartStore.getState().setServerCartCount(0);
  }
};

// 로그인 시 로컬 장바구니를 서버에 병합하고 비우기
export const mergeLocalCartToServer = async () => {
  const { items, clearCart } = useCartStore.getState();

  if (items.length === 0) return;

  try {
    // API 형식에 맞게 변환: _id로 변경, products로 감싸기
    const products = items.map((item) => ({
      _id: Number(item.product_id),
      quantity: Number(item.quantity),
      ...(item.color && { color: item.color }),
      ...(item.size && { size: item.size }),
    }));

    await fetchClient('/carts', {
      method: 'PUT',
      body: JSON.stringify({ products }),
    });
    clearCart();
  } catch (error) {
    alert(`장바구니 병합 실패: ${error}`);
  }
};
