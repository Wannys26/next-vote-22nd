'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { useLoginGuard } from '@/hooks/useAuthGuard';
import { usePartGuard } from '@/hooks/usePartGuard';
import { useVoteStore } from '@/stores/useVoteStore';
import { getCandidates, categoryData, type VoteCategory } from '@/constants/voteData';
import VoteButton from '@/components/vote/VoteButton';
import BackButton from '@/components/vote/BackButton';

export default function VotingPage() {
  useLoginGuard();
  const router = useRouter();
  const params = useParams();
  const category = params.category as VoteCategory;

  usePartGuard(category);

  const { setCurrentSelection, currentSelection, submitVote } = useVoteStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 카테고리 정보 가져오기
  const categoryInfo = categoryData[category];
  const candidates = getCandidates(category);

  // 유효하지 않은 카테고리인 경우
  if (!categoryInfo || !candidates) {
    return (
      <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-head-2-bold text-black mb-4">잘못된 접근입니다</h1>
          <BackButton href="/voting" label="카테고리 선택으로 돌아가기" />
        </div>
      </main>
    );
  }

  // 후보자/프로젝트 선택 핸들러
  const handleSelect = (id: string) => {
    setSelectedId(id);
    setCurrentSelection(category, id);
  };

  // 투표하기 버튼 핸들러
  const handleSubmitVote = () => {
    if (!selectedId) return;

    const selectedCandidate = candidates.find((c) => c.id === selectedId);
    if (!selectedCandidate) return;

    submitVote(category, selectedId, selectedCandidate.name);
    router.push(`/voting/${category}/result`);
  };

  return (
    <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-4xl py-12">
        <div className="bg-white border border-gray-400 rounded-[16px] shadow-lg p-8">
          {/* 뒤로가기 버튼 */}
          <div className="mb-6">
            <BackButton href="/voting" />
          </div>

          {/* 제목 */}
          <div className="text-center mb-4">
            <h1 className="text-head-2-bold text-black">{categoryInfo.title} 투표</h1>
          </div>

          {/* 설명 */}
          <div className="text-center mb-10">
            <p className="text-body-2-semibold text-gray-700">원하는 옵션을 선택하고 투표해주세요</p>
          </div>

          {/* 후보자/프로젝트 선택 섹션 */}
          <div className="mb-8">
            <h3 className="text-head-4-semibold text-black mb-4">
              {category === 'demo-day' ? '프로젝트 선택' : '멤버 선택'}
            </h3>

            {/* 후보자/프로젝트 버튼 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {candidates.map((candidate) => (
                <VoteButton
                  key={candidate.id}
                  name={candidate.name}
                  isSelected={selectedId === candidate.id}
                  onClick={() => handleSelect(candidate.id)}
                />
              ))}
            </div>
          </div>

          {/* 투표하기 버튼 */}
          <button
            onClick={handleSubmitVote}
            disabled={!selectedId}
            className={`
              w-full h-14 rounded-[14px] text-body-1-semibold text-white transition-all
              ${selectedId ? 'bg-blue-600 hover:bg-blue-500 cursor-pointer' : 'bg-gray-500 cursor-not-allowed'}
            `}
          >
            투표하기
          </button>
        </div>
      </div>
    </main>
  );
}
