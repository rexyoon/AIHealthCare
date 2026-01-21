type Props = {
  values: number[];  // 0~100
  height?: number;   // px
  barWidth?: number; // px
};

export default function MiniBarChart({ values, height = 110, barWidth = 12 }: Props) {
  const bars = values.slice(0, 4);

  return (
    <div className="flex flex-1 items-end justify-end gap-3" style={{ height }}>
      {bars.map((v, i) => {
        const h = Math.max(12, Math.min(height, (v / 100) * height));
        const isLast = i === bars.length - 1;
        return (
          <div
            key={i}
            className={[
              "rounded-full",
              isLast ? "bg-lime-300" : "bg-white/18",
            ].join(" ")}
            style={{
              width: barWidth,
              height: h,
              boxShadow: isLast ? "0 0 14px rgba(190,242,100,0.35)" : "none",
            }}
          />
        );
      })}
    </div>
  );
}
