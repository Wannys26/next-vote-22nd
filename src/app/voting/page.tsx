'use client';

import { useLoginGuard } from '@/hooks/useAuthGuard';
import { useAuthStore } from '@/stores/useAuthStore';
import { categoryData } from '@/constants/voteData';
import CategoryCard from '@/components/vote/CategoryCard';

export default function VoteCategoryPage() {
  useLoginGuard();
  const userInfo = useAuthStore((state) => state.userInfo);

  // 사용자 part에 따라 선택 가능한 카테고리 필터링
  const availableCategories = userInfo?.part
    ? [userInfo.part === 'FRONTEND' ? categoryData['fe-leader'] : categoryData['be-leader'], categoryData['demo-day']]
    : [];

  return (
    <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-4xl py-12">
        {/* 제목 및 설명 */}
        <div className="flex flex-col gap-3 mb-12 text-center">
          <h1 className="text-head-2-bold text-black">투표 카테고리 선택</h1>
          <p className="text-body-2-semibold text-gray-700">투표할 카테고리를 선택해주세요</p>
        </div>

        {/* 카테고리 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}
