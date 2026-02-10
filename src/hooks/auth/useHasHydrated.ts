import useUserStore from '@/lib/zustand/auth/userStore';
import { useSyncExternalStore } from 'react';

// Zustand persist가 sessionStorage에서 복원 완료했는지 확인
export default function useHasHydrated() {
  return useSyncExternalStore(
    (cb) => useUserStore.persist.onFinishHydration(cb),
    () => useUserStore.persist.hasHydrated(),
    () => false,
  );
}
