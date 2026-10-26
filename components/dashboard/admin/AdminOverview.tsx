import { CalendarDays } from "lucide-react";
import { AdminPageHeading } from "./AdminPageHeading";
import { AdminMetricGrid } from "./AdminMetricGrid";
import { AdminPaymentsChart } from "./AdminPaymentsChart";
import { AdminGrowthCharts } from "./AdminGrowthCharts";
import { AdminGeographyPanel } from "./AdminGeographyPanel";
import { AdminAttentionPanel } from "./AdminAttentionPanel";
import { AdminRecentPayments } from "./AdminRecentPayments";

export function AdminOverview() {
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10">
    <AdminPageHeading title="Platform overview" description="Monitor rental activity and keep verification, payments, and complaints moving." action={<div className="flex w-fit items-center gap-2"><span className="flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm text-body"><CalendarDays className="size-4" />September 2026</span><span className="rounded-md bg-brand-tint px-3 py-2 text-[13px] font-medium text-brand">Sample data</span></div>} />
    <AdminMetricGrid />
    <AdminGrowthCharts />
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]"><AdminPaymentsChart /><AdminAttentionPanel /></div>
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]"><AdminRecentPayments /><AdminGeographyPanel /></div>
  </div></div>;
}
