interface VoteButtonProps {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function VoteButton({ name, isSelected, onClick }: VoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full h-14 rounded-[14px] border transition-all cursor-pointer
        ${
          isSelected
            ? 'bg-blue-600 text-body-1-semibold text-white border-blue-600'
            : 'text-body-1-semibold text-black bg-gray-200 border-gray-400 border hover:border-gray-500'
        }
      `}
    >
      {name}
    </button>
  );
}
