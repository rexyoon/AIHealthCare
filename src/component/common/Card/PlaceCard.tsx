import { Badge } from '@/component';
import { HeartFillIcon, CancelIcon, ImageIcon } from '@/assets';

type PlaceCardProps = {
  imgUrl?: string;
  title: string;
  theme: string;
  quietLevel: number | boolean;
  likeCount: number;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
};

export default function PlaceCard({
  imgUrl,
  title,
  theme,
  quietLevel,
  likeCount,
  showRemoveButton,
  onRemove,
  onClick,
}: PlaceCardProps) {
  const showCount = typeof quietLevel === 'number' && quietLevel !== -1;

  return (
    <div
      onClick={onClick}
      className="bg-yellow2 flex h-19 w-full max-w-[430px] cursor-pointer items-stretch overflow-hidden rounded-[10px] px-3 py-2 transition-all hover:scale-[1.01] hover:shadow-md active:scale-95"
    >
      <div className="bg-gray1 relative h-full w-15 shrink-0 overflow-hidden rounded-[5px]">
        {imgUrl ? (
          <img src={imgUrl} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="ml-4 flex min-w-0 flex-1 flex-col">
        <p className="text-caption4 line-clamp-2 min-h-[40px] leading-5">{title}</p>
        <div className="flex min-w-0 shrink-0 flex-nowrap gap-2 overflow-hidden pr-10">
          <Badge type="default" color="green" {...(showCount ? { count: quietLevel } : {})}>
            {showCount ? '한적함' : '정보없음'}
          </Badge>

          <Badge type="default" color="red">
            <span className="block max-w-[16ch] truncate">{theme}</span>
          </Badge>
        </div>
      </div>

      <div className="flex h-full flex-col items-end justify-between">
        {showRemoveButton ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            className="cursor-pointer px-1 py-1"
          >
            <CancelIcon className="h-3 w-3 text-black" />
          </button>
        ) : (
          <div className="h-4 w-3" />
        )}

        <div className="text-caption5 flex items-center gap-[3px]">
          <HeartFillIcon className="h-3 w-3" />
          <span className="w-[3ch] leading-none whitespace-nowrap tabular-nums">
            {likeCount > 99 ? '99+' : likeCount}
          </span>
        </div>
      </div>
    </div>
  );
}
