import { AdminCaseDetailView } from "@/components/dashboard/admin/cases/AdminCaseDetailView";

export default async function AdminComplaintDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = await params;
  return (
    <AdminCaseDetailView
      kind="complaint"
      caseId={decodeURIComponent(caseId)}
    />
  );
}
