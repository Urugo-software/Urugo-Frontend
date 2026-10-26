import { AdminDirectory } from "@/data/admin-dashboard-data";
import { AdminPageHeading } from "./AdminPageHeading";
import { AdminDataTable } from "./AdminDataTable";

export function AdminDirectoryView({ page, action }: { page: AdminDirectory; action?: React.ReactNode }) {
  return <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1500px] space-y-6 p-4 pb-16 sm:p-8 md:p-10">
    <AdminPageHeading title={page.title} description={page.description} action={<div className="flex items-center gap-3"><span className="rounded-md bg-brand-tint px-3 py-2 text-[13px] font-medium text-brand">Sample data - read only</span>{action}</div>} />
    <AdminDataTable columns={page.columns} rows={page.rows} filters={page.filters} detailPath={page.detailPath} />
  </div></div>;
}