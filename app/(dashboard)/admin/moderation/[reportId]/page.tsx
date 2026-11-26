import { AdminCaseDetailView } from "@/components/dashboard/admin/cases/AdminCaseDetailView";

export default async function AdminModerationDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = await params;
  return (
    <AdminCaseDetailView
      kind="moderation"
      caseId={decodeURIComponent(reportId)}
    />
  );
}
