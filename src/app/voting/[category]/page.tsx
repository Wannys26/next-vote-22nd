'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { useLoginGuard } from '@/hooks/useAuthGuard';
import { usePartGuard } from '@/hooks/usePartGuard';
import { useVoteStore } from '@/stores/useVoteStore';
import { categoryData, type VoteCategory } from '@/constants/voteData';
import type { VoteCandidate } from '@/types/vote/dto';
import VoteButton from '@/components/vote/VoteButton';
import BackButton from '@/components/vote/BackButton';
import {
  useFetchLeaderCandidatesQuery,
  useFetchDemodayCandidatesQuery,
  useVoteLeaderMutation,
  useVoteDemodayMutation,
} from '@/hooks/vote/useVote';
import { useIsMutating } from '@tanstack/react-query';

export default function VotingPage() {
  useLoginGuard();
  const router = useRouter();
  const params = useParams();
  const category = params.category as VoteCategory;

  usePartGuard(category);

  const { setCurrentSelection, submitVote } = useVoteStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 카테고리 정보 가져오기
  const categoryInfo = categoryData[category];

  // 데이터 쿼리 및 뮤테이션 훅 설정
  const isLeader = category === 'fe-leader' || category === 'be-leader';
  const leaderQuery = useFetchLeaderCandidatesQuery({ enabled: isLeader });
  const demodayQuery = useFetchDemodayCandidatesQuery({ enabled: category === 'demo-day' });

  const leaderMutation = useVoteLeaderMutation();
  const demodayMutation = useVoteDemodayMutation();
  const leaderMutating = useIsMutating({ mutationKey: ['votes', 'leader', 'vote'] }) > 0;
  const demodayMutating = useIsMutating({ mutationKey: ['votes', 'demoday', 'vote'] }) > 0;
  const isMutating = leaderMutating || demodayMutating;

  type LegacyCandidate = { id: string; name: string };
  type CandidateItem = VoteCandidate | LegacyCandidate;

  const candidates: CandidateItem[] = isLeader ? (leaderQuery.data?.result ?? []) : (demodayQuery.data?.result ?? []);
  const isError = isLeader ? !!leaderQuery.error : !!demodayQuery.error;

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
  const handleSelect = (id: number) => {
    setSelectedId(id);
    setCurrentSelection(category, id);
  };

  // 투표하기 버튼 핸들러
  const handleSubmitVote = () => {
    if (!selectedId) return;

    const selectedCandidate = candidates.find((c: CandidateItem) => ('candidateId' in c ? c.candidateId === selectedId : Number(c.id) === selectedId));
    if (!selectedCandidate) return;

    const payload = { candidateId: selectedId };

    const onSuccess = () => {
      const selectedName = 'candidateName' in selectedCandidate ? selectedCandidate.candidateName : 'name' in selectedCandidate ? selectedCandidate.name : '';
      submitVote(category, selectedId, selectedName);
      router.push(`/voting/${category}/result`);
    };

    const onError = (error: unknown) => {
      const err = error as { response?: { data?: { message?: string }; status?: number }; message?: string };
      const serverMsg = err?.response?.data?.message || err?.message;
      const status = err?.response?.status;

      if (status === 409) {
        window.alert('이미 투표를 완료했습니다. 중복 투표는 불가능합니다.');
      } else if (serverMsg) {
        window.alert(String(serverMsg));
      } else {
        window.alert('투표 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    if (isLeader) {
      leaderMutation.mutate(payload, { onSuccess, onError });
    } else {
      demodayMutation.mutate(payload, { onSuccess, onError });
    }
  };

  return (
    <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-4xl py-12">
      <div className="bg-white border border-gray-400 rounded-2xl shadow-lg p-8">
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
                {isError ? (
                  <div>데이터를 불러오지 못했습니다.</div>
                ) : (
                  candidates.length > 0 &&
                  candidates.map((candidate: CandidateItem) => {
                    const key = 'candidateId' in candidate ? candidate.candidateId : candidate.id;
                    const name = 'candidateName' in candidate ? candidate.candidateName : candidate.name;
                    const idNumber = 'candidateId' in candidate ? candidate.candidateId : Number(candidate.id);
                    return (
                      <VoteButton
                        key={key}
                        name={name}
                        isSelected={selectedId === idNumber}
                        onClick={() => handleSelect(idNumber)}
                      />
                    );
                  })
                )}
              </div>
          </div>

          {/* 투표하기 버튼 */}
          {(() => {
            const disabled = !selectedId || isMutating;
            return (
              <button
                onClick={handleSubmitVote}
                disabled={disabled}
                className={`
                  w-full h-14 rounded-xl text-body-1-semibold text-white transition-all
                  ${disabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 cursor-pointer'}
                `}
              >
                투표하기
              </button>
            );
          })()}
        </div>
      </div>
    </main>
  );
}
