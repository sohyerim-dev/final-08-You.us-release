import { User } from '@/types/user.types';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 로그인한 사용자 정보를 관리하는 스토어의 상태 인터페이스
interface UserStoreState {
  user: User | null;
  autoLogin: boolean;
  setUser: (user: User | null) => void;
  setAutoLogin: (autoLogin: boolean) => void;
  resetUser: () => void;
  setHasHydrated: (state: boolean) => void;
  _hasHydrated: boolean;
}

// 로그인한 사용자 정보를 관리하는 스토어 생성
// StateCreator: Zustand의 유틸리티 타입으로, set 함수의 타입을 자동으로 추론해줌
// 복잡한 타입 정의 없이도 set 함수가 올바른 타입으로 인식됨
const UserStore: StateCreator<UserStoreState> = (set) => ({
  user: null,
  autoLogin: false,
  setUser: (user: User | null) => set({ user }),
  setAutoLogin: (autoLogin: boolean) => set({ autoLogin }),
  resetUser: () => set({ user: null, autoLogin: false }),
  setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
  _hasHydrated: false,
});

// autoLogin 여부에 따라 localStorage 또는 sessionStorage를 동적으로 선택
const getStorage = () => {
  if (typeof window === 'undefined') return sessionStorage;
  try {
    // localStorage에 저장된 user 데이터에서 autoLogin 여부 확인
    const stored = localStorage.getItem('user');
    const parsed = stored ? JSON.parse(stored) : null;
    // autoLogin이 true면 localStorage, 아니면 sessionStorage
    return parsed?.state?.autoLogin ? localStorage : sessionStorage;
  } catch {
    return sessionStorage;
  }
};

const useUserStore = create<UserStoreState>()(
  persist(UserStore, {
    name: 'user',
    storage: createJSONStorage(getStorage),
    // 스토리지에서 데이터를 불러온 직후 호출되는 콜백
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true); // 로그인 정보 복원 완료 플래그를 true로 설정
    },
  }),
);

export default useUserStore;
