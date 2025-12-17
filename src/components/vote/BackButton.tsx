import Link from 'next/link';
import Image from 'next/image';

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = '카테고리 선택으로 돌아가기' }: BackButtonProps) {
  return (
    <Link href={href} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
      <div className="w-5 h-5 relative">
        <Image src="/assets/back.svg" alt="back" fill className="object-contain" />
      </div>
      <span className="text-body-2-semibold text-gray-700">{label}</span>
    </Link>
  );
}
