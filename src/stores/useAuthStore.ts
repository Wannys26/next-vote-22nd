import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  userId: number;
  name: string;
  part: 'FRONTEND' | 'BACKEND';
  team: 'MODELLY' | 'STORIX' | 'CATCHUP' | 'DIGGINDIE' | 'MENUAL';
}

interface AuthStore {
  accessToken: string;
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  userInfo: UserInfo | null;
  hasHydrated: boolean;

  setAccessToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  clearAuth: () => void;
  setAuthChecked: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: '',
      isLoggedIn: false,
      isAuthChecked: false,
      userInfo: null,
      hasHydrated: false,

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoggedIn: true,
        }),

      setUserInfo: (userInfo) =>
        set({
          userInfo,
        }),

      clearAuth: () =>
        set({
          accessToken: '',
          isLoggedIn: false,
          isAuthChecked: true,
          userInfo: null,
        }),

      setAuthChecked: () => set({ isAuthChecked: true }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        userInfo: state.userInfo, // userInfo만 localStorage에 저장
      }),
      onRehydrateStorage: () => (state) => {
        // Hydration 완료 시 플래그 설정
        if (state) {
          state.hasHydrated = true;
        }
      },
    },
  ),
);
