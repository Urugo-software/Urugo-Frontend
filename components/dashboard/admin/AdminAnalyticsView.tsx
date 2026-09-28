import { AdminPageHeading } from "./AdminPageHeading";
import { AdminGrowthCharts } from "./AdminGrowthCharts";
import { AdminAnalyticsFacts } from "./AdminAnalyticsFacts";
import { AdminPaymentsChart } from "./AdminPaymentsChart";
import { AdminGeographyPanel } from "./AdminGeographyPanel";

export function AdminAnalyticsView() {
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10">
    <AdminPageHeading title="Analytics" description="Review account growth, property activity, payment volume, and locations." action={<span className="rounded-md bg-brand-tint px-3 py-2 text-[13px] font-medium text-brand">Sample data - read only</span>} />
    <AdminAnalyticsFacts />
    <AdminGrowthCharts />
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]"><AdminPaymentsChart /><AdminGeographyPanel /></div>
  </div></div>;
}
