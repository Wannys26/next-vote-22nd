'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { useAuthStore } from '@/stores/useAuthStore';

export const useLoginGuard = (redirectTo: string = '/login') => {
  const router = useRouter();
  const { accessToken, isAuthChecked, userInfo, clearAuth } = useAuthStore();

  useEffect(() => {
    if (!isAuthChecked) return;

    // 1. accessToken이 없는 경우
    if (!accessToken) {
      router.replace(redirectTo);
      return;
    }

    // 2. accessToken은 있지만 userInfo가 없는 경우
    if (!userInfo) {
      console.warn('userInfo 없음: 강제 로그아웃');
      clearAuth();
      router.replace(redirectTo);
      return;
    }
  }, [accessToken, userInfo, isAuthChecked, clearAuth, router, redirectTo]);
};

export const useGuestGuard = (redirectTo: string = '/') => {
  const router = useRouter();
  const { accessToken, isAuthChecked } = useAuthStore();

  useEffect(() => {
    if (!isAuthChecked) return;
    if (accessToken) {
      router.replace(redirectTo);
    }
  }, [accessToken, isAuthChecked, router, redirectTo]);
};
