import { useMemo } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  min?: number;
  max?: number;
  step?: number;
  value: number | null;
  onChange: (v: number) => void;
  className?: string;
};

export default function DistanceSlider({
  min = 0,
  max = 50,
  step = 1,
  value,
  onChange,
  className,
}: Props) {
  const safeValue = value ?? min;
  const percent = useMemo(
    () => Math.round(((safeValue - min) / (max - min)) * 100),
    [safeValue, min, max],
  );
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-baseline justify-between">
        <span className="text-title1 text-green1">거리(km)</span>
        <span className="text-title1 text-green1">
          {value === null ? `N km` : `${safeValue}km`}
        </span>
      </div>
      <div className="text-caption4 text-green1 mt-3 flex justify-between">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      <div className="relative h-6">
        <div className="bg-gray2 pointer-events-none absolute top-1/2 right-0 left-0 h-2 -translate-y-1/2 rounded-full" />
        <div
          className="bg-yellow1 pointer-events-none absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full"
          style={{ width: `${percent}%` }}
        />
        {/*노브*/}
        <div
          className="pointer-events-none absolute top-1/2 -translate-y-1/2"
          style={{ left: `calc(${percent}% - 10px)` }}
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-[0_3px_5px_rgba(0,0,0,0.25)] ring-2 ring-white">
            <span className="bg-yellow1 block h-2.5 w-2.5 rounded-full" />
          </div>
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="거리 (km)"
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}
