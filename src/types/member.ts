// 멤버 타입
export type MemberPart = 'FRONTEND' | 'BACKEND';
export type TeamName = 'MODELLY' | 'STORIX' | 'CATCHUP' | 'DIGGINDIE' | 'MENUAL';

// 멤버 정보
export interface Member {
  id: string;
  name: string;
  team: TeamName;
  part: MemberPart;
  university: string;
}
