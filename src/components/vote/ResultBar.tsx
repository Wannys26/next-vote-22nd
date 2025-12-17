import type { VoteResultItem } from '@/constants/voteData';

interface ResultBarProps {
  result: VoteResultItem;
  maxVotes: number;
}

export default function ResultBar({ result, maxVotes }: ResultBarProps) {
  const percentage = (result.votes / maxVotes) * 100;

  // 순위별 그라데이션 색상
  const getGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return 'linear-gradient(to right, #319EFF, #6BBBFF)';
      case 2:
        return 'linear-gradient(to right, #6BBBFF, #8BC9FE)';
      case 3:
        return 'linear-gradient(to right, #8BC9FE, #DBEEFF)';
      default:
        return '#EFF1F3';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 이름과 득표수 */}
      <div className="flex justify-between items-center">
        <span className="text-body-1-semibold text-black">
          {result.emoji} {result.name}
        </span>
        <span className="text-body-1-semibold text-blue-600">{result.votes}표</span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: getGradient(result.rank),
          }}
        />
      </div>
    </div>
  );
}
