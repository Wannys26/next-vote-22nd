export interface VoteCandidate {
  candidateName: string;
  candidateId: number;
}

export interface VoteListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: VoteCandidate[];
}

export interface VoteRequest {
  candidateId: number;
}

export interface GenericVoteResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string | null;
}

export interface VoteResultCandidate {
  candidateName: string;
  voteCount: number;
}

export interface VoteResult {
  candidateList: VoteResultCandidate[];
  totalVoteCount: number;
}

export interface VoteResultResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: VoteResult;
}
