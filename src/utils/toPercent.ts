const toPercent = (available: number, total: number) =>
  total > 0 ? Math.round((available / total) * 100) : 0;

export default toPercent;
