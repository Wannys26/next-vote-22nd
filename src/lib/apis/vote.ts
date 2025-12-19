import { axiosInstance } from '@/lib/apis/axios';
import type {
  VoteListResponse,
  VoteRequest,
  GenericVoteResponse,
  VoteResultResponse,
} from '@/types/vote/dto';

// 후보자 목록 조회 
export const fetchVoteCandidates = async (): Promise<VoteListResponse> => {
  const response = await axiosInstance.get<VoteListResponse>('/api/votes');
  return response.data;
};

// 파트장 투표
export const voteLeader = async (payload: VoteRequest): Promise<GenericVoteResponse> => {
  const response = await axiosInstance.post<GenericVoteResponse>('/api/votes/leader', payload);
  return response.data;
};

// 파트장 투표 결과 조회
export const fetchLeaderResult = async (): Promise<VoteResultResponse> => {
  const response = await axiosInstance.get<VoteResultResponse>('/api/votes/leader-result');
  return response.data;
};

// 데모데이 후보 목록 조회
export const fetchDemodayCandidates = async (): Promise<VoteListResponse> => {
  const response = await axiosInstance.get<VoteListResponse>('/api/votes/demoday');
  return response.data;
};

// 데모데이 투표
export const voteDemoday = async (payload: VoteRequest): Promise<GenericVoteResponse> => {
  const response = await axiosInstance.post<GenericVoteResponse>('/api/votes/demoday', payload);
  return response.data;
};

// 데모데이 투표 결과 조회
export const fetchDemodayResult = async (): Promise<VoteResultResponse> => {
  const response = await axiosInstance.get<VoteResultResponse>('/api/votes/demoday-result');
  return response.data;
};
