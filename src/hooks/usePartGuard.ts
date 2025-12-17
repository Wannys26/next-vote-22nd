'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import type { VoteCategory } from '@/constants/voteData';

export const usePartGuard = (category: VoteCategory) => {
  const router = useRouter();
  const userInfo = useAuthStore((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) return;

    const isAccessDenied =
      (userInfo.part === 'FRONTEND' && category === 'be-leader') ||
      (userInfo.part === 'BACKEND' && category === 'fe-leader');

    if (isAccessDenied) {
      console.warn(`권한 없음: ${userInfo.part} 유저는 ${category}에 접근할 수 없습니다`);
      router.replace('/voting');
    }
  }, [userInfo, category, router]);
};
