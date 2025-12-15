import { cn } from '@/utils/cn';
import { SendIcon, ExploreIcon } from '@/assets';

type Props = {
  label: '출발지' | '테마';
  value?: string;
  placeholder?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function LabeledInput({
  label,
  value,
  placeholder,
  onClick,
  className,
  disabled = false,
}: Props) {
  const Icon = label === '출발지' ? SendIcon : ExploreIcon;

  return (
    <div className={cn('mb-9', className)}>
      <div className="text-title1 mb-1 px-1">{label}</div>
      <div
        className={cn('relative w-full rounded-l py-3', 'flex items-center gap-3')}
        onClick={!disabled ? onClick : undefined}
      >
        <Icon className="absolute top-1/2 left-3 w-6 -translate-y-1/2" />
        <input
          type="text"
          readOnly
          inputMode="none"
          value={value ?? ''}
          placeholder={placeholder}
          onClick={!disabled ? onClick : undefined}
          disabled={disabled}
          className={cn(
            'w-full rounded-l border border-black py-2 pr-3 pl-[42px]',
            'text-caption3',
            value ? 'text-black' : 'text-gray1',
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          )}
        />
      </div>
    </div>
  );
}
