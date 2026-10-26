import { adminMetrics } from "@/data/admin-dashboard-data";
import { AdminMetricCard } from "./AdminMetricCard";

export function AdminMetricGrid() {
  return <section aria-label="Platform summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {adminMetrics.map((metric) => <AdminMetricCard key={metric.label} {...metric} />)}
  </section>;
}
