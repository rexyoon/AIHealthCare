import { cn } from '@/utils/cn';
import { InfoIcon } from '@/assets';
import { BADGE_BASE, BADGE_COLOR, COUNT_COLOR, BADGE_COUNT, BADGE_SIZE } from './Badge.styled';
import type { BadgeProp } from './Badge.types';

export default function Badge({ type, children, color, count, percent, size = 'sm' }: BadgeProp) {
  const appliedColor = color ?? 'green';
  const appliedSize = size ?? 'sm';

  const getStatusColor = (rate: number) => {
    const p = Math.max(0, Math.min(100, rate));
    if (p >= 70) return 'green';
    if (p >= 40) return 'yellow';
    if (p >= 10) return 'orange';
    return 'red';
  };

  const label =
    type === 'parkingTag' ? (
      <span className="w-[17ch] min-w-0 truncate text-center">{children}</span>
    ) : type === 'parkingCount' ? (
      <span className="w-[3ch]">{children}</span>
    ) : (
      <>{children}</>
    );

  const content = (
    <>
      {label}
      {type === 'default' && count !== undefined && (
        <span className={cn(BADGE_COUNT, COUNT_COLOR.green, 'ml-1')}>{count}</span>
      )}
      {type === 'parkingTag' && <InfoIcon className="ml-1 h-3 w-3" />}
    </>
  );

  const colorClass =
    type === 'parkingTag'
      ? BADGE_COLOR.beige
      : type === 'parkingCount'
        ? BADGE_COLOR[getStatusColor(percent ?? 0)]
        : BADGE_COLOR[appliedColor];

  const radiusClass = type === 'default' ? 'rounded-l' : 'rounded-[10px]';

  return (
    <span
      className={cn(
        BADGE_BASE,
        BADGE_SIZE[appliedSize],
        colorClass,
        radiusClass,
        type === 'parkingTag' && 'max-w-full overflow-hidden',
      )}
    >
      {content}
    </span>
  );
}
