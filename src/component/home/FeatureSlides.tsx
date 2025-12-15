import { useEffect, useRef, useState } from 'react';
import { Image } from '@/component';

type SlideItem = {
  id: string | number;
  src: string;
  title?: string;
  desc?: string;
};

type FeatureSlidesProps = {
  title?: string;
  slides: SlideItem[];
};

export default function FeatureSlides({
  title = 'AI 맞춤 여행지 탐색',
  slides,
}: FeatureSlidesProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = items.findIndex((el) => el === visible.target);
        if (idx !== -1) setActive(idx);
      },
      { root, threshold: [0.6] },
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  const goTo = (idx: number) => {
    itemRefs.current[idx]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
  };

  const scrollByDir = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="px-5 pb-12">
      <h2 className="text-title1 text-green1 pb-3">{title}</h2>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex touch-pan-x snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, idx) => (
            <div
              key={s.id}
              ref={(el: HTMLDivElement | null) => {
                itemRefs.current[idx] = el;
              }}
              className="w-full shrink-0 snap-center items-center justify-center"
            >
              <div className="flex w-full items-center justify-center rounded-2xl">
                <Image
                  src={s.src}
                  alt={s.title ?? ''}
                  className="block max-h-[65%] max-w-[65%] object-contain"
                />
              </div>
              {s.title && <div className="text-body2 text-green1 pt-2">{s.title}</div>}
              {s.desc && <div className="text-caption2 text-green1/70">{s.desc}</div>}
            </div>
          ))}
        </div>

        {/*좌우 화살표(오버레이)*/}
        <button
          aria-label="이전"
          onClick={() => scrollByDir('left')}
          className="text-title5 text-green1 absolute top-1/2 left-1 z-10 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 active:scale-95"
        >
          ‹
        </button>
        <button
          aria-label="다음"
          onClick={() => scrollByDir('right')}
          className="text-title5 text-green1 absolute top-1/2 right-1 z-10 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1.5 shadow-sm ring-1 ring-black/5 active:scale-95"
        >
          ›
        </button>
      </div>

      {/*페이지 도트*/}
      <div className="mt-3 flex items-center justify-center gap-1">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`${idx + 1}번째 슬라이드로 이동`}
            aria-current={active === idx}
            onClick={() => goTo(idx)}
            className={`h-1 w-1 rounded-full transition ${active === idx ? 'bg-green2' : 'bg-gray1'} `}
          />
        ))}
      </div>
    </section>
  );
}
