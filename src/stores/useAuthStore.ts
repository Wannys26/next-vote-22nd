import { create } from 'zustand';

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

  setAccessToken: (token: string) => void;
  setUserInfo: (userInfo: UserInfo) => void;
  clearAuth: () => void;
  setAuthChecked: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: '',
  isLoggedIn: false,
  isAuthChecked: false,
  userInfo: null,

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
}));
