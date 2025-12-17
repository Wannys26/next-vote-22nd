'use client';

import { useState } from 'react';
import { useLoginGuard } from '@/hooks/useAuthGuard';
import { frontendMembers, backendMembers } from '@/constants/memberData';
import type { MemberPart } from '@/types/member';
import MemberCard from '@/components/members/MemberCard';

const MembersPage = () => {
  useLoginGuard();
  const [selectedPart, setSelectedPart] = useState<MemberPart>('FRONTEND');

  const members = selectedPart === 'FRONTEND' ? frontendMembers : backendMembers;

  return (
    <main className="min-h-screen gradient-radial flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-6xl py-12">
        {/* 제목 및 설명 */}
        <div className="flex flex-col gap-3 mb-8 text-center">
          <h1 className="text-head-2-bold text-black">멤버</h1>
          <p className="text-body-2-semibold text-gray-700">모든 팀 멤버의 프로필을 확인하세요</p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedPart('FRONTEND')}
            className={`
              w-full md:w-[216px] md:h-[50px] px-8 py-3 rounded-[14px] text-body-1-semibold transition-all cursor-pointer
              ${
                selectedPart === 'FRONTEND'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            FRONT-END
          </button>
          <button
            onClick={() => setSelectedPart('BACKEND')}
            className={`
              w-full md:w-[216px] md:h-[50px] px-8 py-3 rounded-[14px] text-body-1-semibold transition-all cursor-pointer
              ${
                selectedPart === 'BACKEND'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            BACK-END
          </button>
        </div>

        {/* 멤버 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} part={selectedPart} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MembersPage;
