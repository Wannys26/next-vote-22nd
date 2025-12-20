import Link from 'next/link';
import type { CategoryInfo } from '@/constants/voteData';
import Image from 'next/image';

interface CategoryCardProps {
  category: CategoryInfo;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/voting/${category.id}`}>
      <div className="bg-white border border-gray-400 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
        {/* 아이콘 */}
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center mb-6 mx-auto"
          style={{
            background:
              category.id === 'demo-day'
                ? 'linear-gradient(180deg, #C9D4FF 0%, #797F99 100%)'
                : 'linear-gradient(135deg, #319EFF 0%, #6BBBFF 100%)',
          }}
        >
          <div className="w-12 h-12 relative">
            <Image
              src={`/assets/${
                category.id === 'fe-leader' ? 'leaderIcon' : category.id === 'be-leader' ? 'leaderIcon' : 'demoDayIcon'
              }.svg`}
              alt={category.title}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-head-3-bold text-center mb-4 text-black">{category.title}</h3>

        {/* 설명 */}
        <p className="text-body-2-semibold text-center mb-6 text-gray-700">{category.description}</p>

        {/* 후보/프로젝트 수 */}
        <div className="bg-blue-100 rounded-[14px] px-4 py-2 mt-auto mx-auto">
          <span className="text-body-2-semibold text-blue-600">{category.candidateCount}</span>
        </div>
      </div>
    </Link>
  );
}
