import type { Member } from '@/types/member';
import RoleIcon from '@/svgs/common/role.svg';
import UniIcon from '@/svgs/common/uni.svg';

interface MemberCardProps {
  member: Member;
  index: number;
  part: 'FRONTEND' | 'BACKEND';
}

const PROFILE_COLOR_CLASSES = [
  'bg-blue-600',
  'bg-blue-500',
  'bg-blue-400',
  'bg-blue-300',
  'bg-gray-500',
  'bg-gray-600',
  'bg-gray-700',
  'bg-gray-800',
];

export default function MemberCard({ member, index, part }: MemberCardProps) {
  const profileColorClass = PROFILE_COLOR_CLASSES[index % PROFILE_COLOR_CLASSES.length];

  return (
  <div className="bg-white border border-gray-400 rounded-2xl p-6 transition-all h-full flex flex-col">
      {/* 프로필 아이콘 */}
      <div className="flex justify-center mb-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${profileColorClass}`}>
          <span className="text-body-1-semibold text-white">{member.name.charAt(0)}</span>
        </div>
      </div>

      <h3 className="text-head-4-bold text-center mb-2 text-black">{member.name}</h3>
      <p className="text-body-2-semibold text-center mb-6 text-blue-600">{member.team}</p>
      
      <div className="border-t border-gray-400 mb-4" />
      
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-2 text-body-3-regular text-gray-800">
          <RoleIcon className="w-4 h-4" />
          <span>{part === 'FRONTEND' ? 'Frontend Developer' : 'Backend Developer'}</span>
        </div>
        <div className="flex items-center gap-2 text-body-3-regular text-gray-800">
          <UniIcon className="w-4 h-4" />
          <span>{member.university}</span>
        </div>
      </div>
    </div>
  );
}
