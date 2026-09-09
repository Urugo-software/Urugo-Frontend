import Link from "next/link";
import { notFound } from "next/navigation";
import { mockRentalIssues } from "@/data/landlord-data";
import { DisputeDetailsView } from "@/components/dashboard/landlord/blacklist/DisputeDetailsView";
import { ArrowLeft } from "lucide-react";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = mockRentalIssues.find((i) => i.id === id) || mockRentalIssues[0];

  if (!issue) notFound();

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      <div>
        <Link
          href="/landlord/blacklist-check"
          className="inline-flex items-center gap-2 text-sm font-semibold text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blacklist & History Check
        </Link>
      </div>

      <DisputeDetailsView issue={issue} />
    </main>
  );
}
