// 투표 카테고리 타입
export type VoteCategory = 'fe-leader' | 'be-leader' | 'demo-day';

// 투표 카테고리 정보
export interface CategoryInfo {
  id: VoteCategory;
  title: string;
  description: string;
  icon: string;
  candidateCount: string;
  gradient: string;
}

// 후보자 정보
export interface Candidate {
  id: string;
  name: string;
}

// 프로젝트 정보
export interface Project {
  id: string;
  name: string;
}

// 투표 결과 항목
export interface VoteResultItem {
  rank: number;
  name: string;
  votes: number;
  emoji: string;
}

// 투표 결과
export interface VoteResult {
  category: VoteCategory;
  categoryTitle: string;
  results: VoteResultItem[];
  totalVotes: number;
}

// 카테고리 정보
export const categoryData: Record<VoteCategory, CategoryInfo> = {
  'fe-leader': {
    id: 'fe-leader',
    title: 'FE-LEADER',
    description: '프론트엔드 리더를 선택해주세요',
    icon: 'code',
    candidateCount: '10명의 후보',
    gradient: 'linear-gradient(135deg, #319eff 0%, #6bbbff 100%)',
  },
  'be-leader': {
    id: 'be-leader',
    title: 'BE-LEADER',
    description: '백엔드 리더를 선택해주세요',
    icon: 'server',
    candidateCount: '10명의 후보',
    gradient: 'linear-gradient(135deg, #319eff 0%, #6bbbff 100%)',
  },
  'demo-day': {
    id: 'demo-day',
    title: 'DEMO-DAY',
    description: '데모데이 프로젝트를 선택해주세요',
    icon: 'presentation',
    candidateCount: '5개의 프로젝트',
    gradient: 'linear-gradient(180deg, #c9d4ff 0%, #797f99 100%)',
  },
};
