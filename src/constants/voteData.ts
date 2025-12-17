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

// FE 파트장 후보자 목록
export const feLeaderCandidates: Candidate[] = [
  { id: 'fe-1', name: '정윤지' },
  { id: 'fe-2', name: '손주완' },
  { id: 'fe-3', name: '김윤성' },
  { id: 'fe-4', name: '백승선' },
  { id: 'fe-5', name: '윤성훈' },
  { id: 'fe-6', name: '신용섭' },
  { id: 'fe-7', name: '이채연' },
  { id: 'fe-8', name: '장자윤' },
  { id: 'fe-9', name: '조성아' },
  { id: 'fe-10', name: '최무헌' },
];

// BE 파트장 후보자 목록
export const beLeaderCandidates: Candidate[] = [
  { id: 'be-1', name: '이연호' },
  { id: 'be-2', name: '이준영' },
  { id: 'be-3', name: '변호영' },
  { id: 'be-4', name: '이윤지' },
  { id: 'be-5', name: '배승식' },
  { id: 'be-6', name: '신혁' },
  { id: 'be-7', name: '이지원' },
  { id: 'be-8', name: '변하영' },
  { id: 'be-9', name: '서가영' },
  { id: 'be-10', name: '이수아' },
];

// 데모데이 프로젝트 목록
export const demoDayProjects: Project[] = [
  { id: 'project-1', name: 'MODELLY' },
  { id: 'project-2', name: 'STORIX' },
  { id: 'project-3', name: 'CATCHUP' },
  { id: 'project-4', name: 'DIGGINDIE' },
  { id: 'project-5', name: 'MENUAL' },
];

// 카테고리별 후보자/프로젝트 가져오기
export const getCandidates = (category: VoteCategory): Candidate[] | Project[] => {
  switch (category) {
    case 'fe-leader':
      return feLeaderCandidates;
    case 'be-leader':
      return beLeaderCandidates;
    case 'demo-day':
      return demoDayProjects;
    default:
      return [];
  }
};

// 더미 투표 결과 데이터
export const dummyVoteResults: Record<VoteCategory, VoteResult> = {
  'fe-leader': {
    category: 'fe-leader',
    categoryTitle: 'FE-LEADER',
    results: [
      { rank: 1, name: '정윤지', votes: 6, emoji: '🥇' },
      { rank: 2, name: '손주완', votes: 3, emoji: '🥈' },
      { rank: 3, name: '백승선', votes: 1, emoji: '🥉' },
    ],
    totalVotes: 10,
  },
  'be-leader': {
    category: 'be-leader',
    categoryTitle: 'BE-LEADER',
    results: [
      { rank: 1, name: '이연호', votes: 7, emoji: '🥇' },
      { rank: 2, name: '이준영', votes: 2, emoji: '🥈' },
      { rank: 3, name: '변호영', votes: 1, emoji: '🥉' },
    ],
    totalVotes: 10,
  },
  'demo-day': {
    category: 'demo-day',
    categoryTitle: 'DEMO-DAY',
    results: [
      { rank: 1, name: 'MODELLY', votes: 5, emoji: '🥇' },
      { rank: 2, name: 'STORIX', votes: 3, emoji: '🥈' },
      { rank: 3, name: 'CATCHUP', votes: 2, emoji: '🥉' },
    ],
    totalVotes: 10,
  },
};

// 투표 결과 가져오기
export const getVoteResult = (category: VoteCategory): VoteResult => {
  return dummyVoteResults[category];
};
