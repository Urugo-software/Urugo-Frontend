import { DisputeDetailsView } from "@/components/dashboard/landlord/blacklist/DisputeDetailsView";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DisputeDetailsView issueId={id} />;
}
