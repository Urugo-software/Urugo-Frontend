import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminPageHeading } from "./AdminPageHeading";
import { AdminStatusTag } from "./AdminStatusTag";
import { recentPayments } from "@/data/admin-dashboard-data";

type Transaction = (typeof recentPayments)[number];

export function AdminTransactionDetail({ payment }: { payment: Transaction }) {
  const details = [["Renter", payment.renter], ["Landlord", payment.landlord], ["Property", payment.property], ["Amount", payment.amount], ["Method", payment.method], ["Provider", payment.provider], ["Provider reference", payment.reference]];
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-5xl space-y-6 p-4 pb-16 sm:p-8 md:p-10">
    <AdminPageHeading title={`Transaction ${payment.transactionId}`} description="Read-only sample transaction record and provider details." action={<AdminStatusTag status={payment.status} />} />
    <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="border-b border-line py-4"><CardTitle className="text-[15px] font-semibold">Payment details</CardTitle></CardHeader><CardContent className="grid gap-x-10 sm:grid-cols-2">{details.map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-line py-4 text-sm"><span className="text-body">{label}</span><span className="text-right font-medium text-ink">{value}</span></div>)}</CardContent></Card>
    <Card className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardHeader className="border-b border-line py-4"><CardTitle className="text-[15px] font-semibold">Transaction history</CardTitle></CardHeader><CardContent className="divide-y divide-line px-5"><p className="py-4 text-sm text-body">Created <span className="ml-2 font-medium text-ink">{payment.created}</span></p><p className="py-4 text-sm text-body">Last updated <span className="ml-2 font-medium text-ink">{payment.updated}</span></p></CardContent></Card>
    <Link href="/admin/audit-logs" className="inline-block text-sm font-medium text-brand hover:underline">View audit log</Link>
  </div></div>;
}
