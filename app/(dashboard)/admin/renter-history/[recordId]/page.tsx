import { AdminRenterHistoryDetailView } from "@/components/dashboard/admin/history/AdminRenterHistoryDetailView";

export default async function AdminRenterHistoryDetailPage({
  params,
}: {
  params: Promise<{ recordId: string }>;
}) {
  const { recordId } = await params;
  return <AdminRenterHistoryDetailView recordId={decodeURIComponent(recordId)} />;
}
