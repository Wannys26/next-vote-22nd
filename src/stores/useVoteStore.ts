import { create } from 'zustand';
import type { VoteCategory } from '@/constants/voteData';

interface VoteSelection {
  category: VoteCategory;
  selectedId: number;
  selectedName: string;
}

interface VoteStore {
  // 현재 선택한 항목 (투표 페이지에서 사용)
  currentSelection: {
    category: VoteCategory | null;
    selectedId: number | null;
  };

  // 투표 완료 목록 (카테고리별로 투표한 내역 저장)
  votedCategories: Record<VoteCategory, VoteSelection | null>;

  // 현재 선택 항목 설정
  setCurrentSelection: (category: VoteCategory, selectedId: number) => void;

  // 현재 선택 항목 초기화
  clearCurrentSelection: () => void;

  // 투표 제출 (투표 완료 목록에 추가)
  submitVote: (category: VoteCategory, selectedId: number, selectedName: string) => void;

  // 특정 카테고리에 이미 투표했는지 확인
  hasVoted: (category: VoteCategory) => boolean;

  // 특정 카테고리의 투표 정보 가져오기
  getVote: (category: VoteCategory) => VoteSelection | null;

  // 모든 투표 초기화 (테스트용)
  resetAllVotes: () => void;
}

export const useVoteStore = create<VoteStore>((set, get) => ({
  currentSelection: {
    category: null,
    selectedId: null,
  },

  votedCategories: {
    'fe-leader': null,
    'be-leader': null,
    'demo-day': null,
  },

  setCurrentSelection: (category, selectedId) =>
    set({
      currentSelection: { category, selectedId },
    }),

  clearCurrentSelection: () =>
    set({
      currentSelection: { category: null, selectedId: null },
    }),

  submitVote: (category, selectedId, selectedName) =>
    set((state) => ({
      votedCategories: {
        ...state.votedCategories,
        [category]: {
          category,
          selectedId,
          selectedName,
        },
      },
      currentSelection: { category: null, selectedId: null },
    })),

  hasVoted: (category) => {
    const state = get();
    return state.votedCategories[category] !== null;
  },

  getVote: (category) => {
    const state = get();
    return state.votedCategories[category];
  },

  resetAllVotes: () =>
    set({
      votedCategories: {
        'fe-leader': null,
        'be-leader': null,
        'demo-day': null,
      },
      currentSelection: { category: null, selectedId: null },
    }),
}));
