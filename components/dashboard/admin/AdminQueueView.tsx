import { Card, CardContent } from "@/components/ui/card";
import { adminDirectories } from "@/data/admin-dashboard-data";
import { AdminPageHeading } from "./AdminPageHeading";
import { AdminStatusTag } from "./AdminStatusTag";

const layout = {
  "property-verification": { primary: "title", secondary: "id", fields: ["landlord", "location", "submitted", "documents", "status"] },
  complaints: { primary: "subject", secondary: "category", fields: ["reporter", "property", "created", "assignee", "status"] },
  moderation: { primary: "type", secondary: "report", fields: ["target", "reportedBy", "created", "status"] },
  notifications: { primary: "title", secondary: "audience", fields: ["channel", "sent", "delivery", "created"] },
} as const;
const labels: Record<string, string> = { id: "Property ID", landlord: "Landlord", location: "Location", submitted: "Submitted", documents: "Documents", reporter: "Reported by", property: "Property", created: "Received", assignee: "Assigned to", target: "Reported item", reportedBy: "Reported by", channel: "Channel", sent: "Recipients", delivery: "Delivery" };

export function AdminQueueView({ kind, action }: { kind: keyof typeof layout; action?: React.ReactNode }) {
  const page = adminDirectories[kind];
  const view = layout[kind];
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10"><AdminPageHeading title={page.title} description={page.description} action={<div className="flex items-center gap-3"><span className="rounded-md bg-brand-tint px-3 py-2 text-[13px] font-medium text-brand">Sample data - read only</span>{action}</div>} /><div className="grid gap-4 xl:grid-cols-2">{page.rows.map((row, index) => <Card key={`${row[view.primary]}-${index}`} className="gap-0 rounded-lg py-0 shadow-xs ring-line"><CardContent className="p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[13px] font-medium text-brand">{row[view.secondary]}</p><h2 className="mt-1 text-[17px] font-semibold text-ink">{row[view.primary]}</h2></div>{row.status && <AdminStatusTag status={row.status} />}</div><div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-4">{view.fields.filter((field) => field !== "status").map((field) => <div key={field}><p className="text-[13px] text-body">{labels[field] || field}</p><p className="mt-1 text-sm font-medium text-ink">{row[field] || "-"}</p></div>)}</div></CardContent></Card>)}</div></div></div>;
}