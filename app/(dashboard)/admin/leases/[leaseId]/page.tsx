import { AdminLeaseDetailView } from "@/components/dashboard/admin/leases/AdminLeaseDetailView";

export default async function AdminLeaseDetailPage({
  params,
}: {
  params: Promise<{ leaseId: string }>;
}) {
  const { leaseId } = await params;
  return <AdminLeaseDetailView leaseId={decodeURIComponent(leaseId)} />;
}
