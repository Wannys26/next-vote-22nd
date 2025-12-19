"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchVoteCandidates,
  voteLeader,
  fetchLeaderResult,
  fetchDemodayCandidates,
  voteDemoday,
  fetchDemodayResult,
} from '@/lib/apis/vote';

// 후보 목록 조회 (파트장)
export const useFetchLeaderCandidatesQuery = (options?: object) =>
  useQuery({
    queryKey: ['votes', 'leader', 'candidates'],
    queryFn: fetchVoteCandidates,
    ...options,
  });

// 파트장 투표 제출
export const useVoteLeaderMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: voteLeader,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['votes', 'leader', 'candidates'] as const });
        qc.invalidateQueries({ queryKey: ['votes', 'leader', 'result'] as const });
    },
  });
};

// 파트장 투표 결과 조회
export const useFetchLeaderResultQuery = (options?: object) =>
  useQuery({
    queryKey: ['votes', 'leader', 'result'],
    queryFn: fetchLeaderResult,
    ...options,
  });

// 데모데이 후보 목록 조회
export const useFetchDemodayCandidatesQuery = (options?: object) =>
  useQuery({
    queryKey: ['votes', 'demoday', 'candidates'],
    queryFn: fetchDemodayCandidates,
    ...options,
  });

// 데모데이 투표 제출
export const useVoteDemodayMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: voteDemoday,
    onSuccess: () => {
        qc.invalidateQueries({ queryKey: ['votes', 'demoday', 'candidates'] as const });
        qc.invalidateQueries({ queryKey: ['votes', 'demoday', 'result'] as const });
    },
  });
};

// 데모데이 결과 조회
export const useFetchDemodayResultQuery = (options?: object) =>
  useQuery({
    queryKey: ['votes', 'demoday', 'result'],
    queryFn: fetchDemodayResult,
    ...options,
  });
