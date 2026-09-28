import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentPayments } from "@/data/admin-dashboard-data";
import { AdminStatusTag } from "./AdminStatusTag";

export function AdminRecentPayments() {
  return <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line">
    <CardHeader className="flex flex-row items-center justify-between border-b border-line py-4">
      <div><CardTitle className="text-[15px] font-semibold">Recent payments</CardTitle><p className="mt-1 text-sm leading-5 text-body">Latest rent submissions across the platform</p></div>
      <Link href="/admin/payments" className="text-sm font-medium text-brand hover:underline">All payments</Link>
    </CardHeader>
    <CardContent className="overflow-x-auto p-0"><table className="w-full min-w-[680px] text-left">
      <thead className="bg-surface text-[13px] font-medium text-body"><tr>{["Renter", "Property / unit", "Amount", "Method", "Status"].map((h) => <th key={h} className="px-5 py-3">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-line">{recentPayments.map((p) => <tr key={p.renter} className="text-sm"><td className="px-5 py-4 font-medium text-ink">{p.renter}</td><td className="px-5 py-4 text-body">{p.property}</td><td className="px-5 py-4 font-medium text-ink">{p.amount}</td><td className="px-5 py-4 text-body">{p.method}</td><td className="px-5 py-4"><AdminStatusTag status={p.status} /></td></tr>)}</tbody>
    </table></CardContent>
  </Card>;
}
