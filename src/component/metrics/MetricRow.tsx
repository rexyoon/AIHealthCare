export type Tone = "good" | "warn" | "bad" | "muted";
type Props = {
  label: string;
  value: string;
  tone?: Tone;
  divider?: boolean;
};
function toneClass(t?: Tone) {
  switch (t) {
    case "good":
      return "text-lime-300";
    case "warn":
      return "text-yellow-300";
    case "bad":
      return "text-red-300";
    default:
      return "text-white/70";
  }
}
function dotClass(t?: Tone) {
  switch (t) {
    case "good":
      return "bg-lime-300";
    case "warn":
      return "bg-yellow-300";
    case "bad":
      return "bg-red-300";
    default:
      return "bg-white/25";
  }
}
export default function MetricRow({ label, value, tone = "muted", divider }: Props) {
  return (
    <div className={["flex items-center justify-between py-3", divider ? "border-b border-white/10" : ""].join(" ")}>
      <div className="text-white/70">{label}</div>

      <div className="flex items-center gap-3">
        <div className={["font-semibold", toneClass(tone)].join(" ")}>{value}</div>
        <div
          className={["h-3 w-3 rounded-full", dotClass(tone)].join(" ")}
          style={{ boxShadow: tone === "good" ? "0 0 10px rgba(190,242,100,0.45)" : "none" }}
        />
      </div>
    </div>
  );
}
