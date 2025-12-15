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
        w-full h-14 rounded-[14px] border transition-all
        text-body-1-semibold text-black
        ${
          isSelected
            ? 'bg-gray-200 border-blue-600 border-2'
            : 'bg-gray-200 border-gray-400 border hover:border-gray-500'
        }
      `}
    >
      {name}
    </button>
  );
}
