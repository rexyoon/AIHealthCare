type Props = {
  /** 0 ~ 1 사이 진행도 */
  progress: number;
  className?: string;
};

export default function ProgressBar({ progress, className }: Props) {
  const pct = Math.max(0, Math.min(1, progress)) * 100;

  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full bg-gray-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] ${className ?? ''}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
    >
      <div
        className="h-full rounded-full bg-[#7da453] transition-[width] duration-400 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
