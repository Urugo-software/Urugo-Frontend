import { AdminApprovalDetailView } from "@/components/dashboard/admin/approvals/AdminApprovalDetailView";

export default async function AdminApprovalDetailPage({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;
  return <AdminApprovalDetailView requestId={decodeURIComponent(requestId)} />;
}
