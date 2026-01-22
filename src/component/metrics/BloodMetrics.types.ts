export type MetricKey =
  | "testosteroneTotal"
  | "estradiol"
  | "ast"
  | "alt";

export type BloodMetrics = {
  [K in MetricKey]: number | null;
};

export type Tone = "good" | "warn" | "bad";

export type Row = {
  key: MetricKey;
  label: string;
  unit?: string;
  value: number | "N/A";
  min: number;
  max: number;
  percent: number;
  status: {
    tag: string;
    tone: Tone;
  };
};
