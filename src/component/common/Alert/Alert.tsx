import { CancelIcon, AlertIcon } from '@/assets';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type AlertProps = {
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Alert({ children, onClose, className }: AlertProps) {
  return (
    <div
      className={cn(
        'bg-pink flex h-13 w-full items-center justify-between rounded-l px-4',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <AlertIcon className="shrink-0" />
        <div className="text-caption1 text-black">{children}</div>
      </div>
      <button
        onClick={onClose}
        className="text-green-muted cursor-pointer text-gray-400 transition-colors"
      >
        <CancelIcon className="w-3" />
      </button>
    </div>
  );
}
