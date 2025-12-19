'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useLoginGuard } from '@/hooks/useAuthGuard';
import { usePartGuard } from '@/hooks/usePartGuard';
import { categoryData, type VoteCategory } from '@/constants/voteData';
import ResultBar from '@/components/vote/ResultBar';
import {
  useFetchLeaderResultQuery,
  useFetchDemodayResultQuery,
} from '@/hooks/vote/useVote';

export default function VotingResultPage() {
  useLoginGuard();
  const params = useParams();
  const router = useRouter();
  const category = params.category as VoteCategory;

  usePartGuard(category);

  const categoryInfo = categoryData[category];

  const isLeader = category === 'fe-leader' || category === 'be-leader';
  const leaderResultQuery = useFetchLeaderResultQuery({ enabled: isLeader });
  const demodayResultQuery = useFetchDemodayResultQuery({ enabled: category === 'demo-day' });

  const apiResult = isLeader ? leaderResultQuery.data?.result : demodayResultQuery.data?.result;
  const isError = isLeader ? !!leaderResultQuery.error : !!demodayResultQuery.error;

  const voteResult = useMemo(() => {
    if (!apiResult) return null;

    const list = (apiResult.candidateList ?? [])
      .slice()
      .sort((a, b) => b.voteCount - a.voteCount)
      .map((item, idx) => ({ rank: idx + 1, name: item.candidateName, votes: item.voteCount, emoji: idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '' }));

    return {
      results: list,
      totalVotes: apiResult.totalVoteCount ?? list.reduce((s, r) => s + r.votes, 0),
    };
  }, [apiResult]);

  // 유효하지 않은 카테고리인 경우
  if (!categoryInfo) {
    return (
      <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-head-2-bold text-black mb-4">잘못된 접근입니다</h1>
          <button
            onClick={() => router.push('/voting')}
            className="bg-blue-600 text-white px-6 py-3 rounded-[14px] text-body-1-semibold hover:bg-blue-500"
          >
            카테고리 선택으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  // 데이터 로딩 실패 또는 결과가 없는 경우
  if (isError || !voteResult) {
    return (
      <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-head-2-bold text-black mb-4">데이터를 불러오지 못했습니다.</h1>
          <button
            onClick={() => router.push('/voting')}
            className="bg-blue-600 text-white px-6 py-3 rounded-[14px] text-body-1-semibold hover:bg-blue-500"
          >
            카테고리 선택으로 돌아가기
          </button>
        </div>
      </main>
    );
  }

  const maxVotes = Math.max(...voteResult.results.map((r) => r.votes));

  return (
    <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-2xl py-12 flex flex-col gap-10">
        {/* 제목 및 설명 */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-head-2-bold text-black">투표 결과</h1>
          <p className="text-body-2-semibold text-gray-700">{categoryInfo.title} 카테고리의 Top 3 결과입니다</p>
        </div>

        {/* 결과 컨테이너 */}
        <div className="bg-white border border-gray-400 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          {/* 카테고리 제목 */}
          <div className="border-b border-gray-400 pb-4">
            <h2 className="text-head-4-bold text-black text-center">{categoryInfo.title}</h2>
          </div>

          {/* Top 3 결과 */}
          <div className="flex flex-col gap-6">
            {voteResult.results.map((result) => (
              <ResultBar key={result.rank} result={result} maxVotes={maxVotes} />
            ))}
          </div>

          {/* 총 투표 수 */}
          <div className="border-t border-gray-400 pt-4 flex justify-between items-center">
            <span className="text-body-2-semibold text-gray-700">총 투표 수</span>
            <span className="text-body-1-semibold text-black">{voteResult.totalVotes}표</span>
          </div>
        </div>

        {/* 메인으로 돌아가기 버튼 */}
        <button
          onClick={() => router.push('/')}
          className="w-full h-14 rounded-[14px] bg-blue-600 text-body-1-semibold text-white hover:bg-blue-500 transition-all cursor-pointer"
        >
          메인으로 돌아가기
        </button>
      </div>
    </main>
  );
}
