import { useEffect, useState } from "react";
import BloodMetricsTable from "../../component/metrics/BloodMetricsTable";
import type { BloodMetrics } from "../../component/metrics/BloodMetrics.types";

export default function HealthMetricsDashboard() {
  const [metrics, setMetrics] = useState<BloodMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blood-metrics/1")
      .then((res) => res.json())
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!metrics) return <div>No metrics</div>;

  return (
    <div>
      <BloodMetricsTable metrics={metrics} />
    </div>
  );
}
