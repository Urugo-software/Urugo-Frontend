import Link from "next/link";
import { notFound } from "next/navigation";
import { mockLandlordRenters, mockRentalIssues } from "@/data/landlord-data";
import { RenterDetailHeader } from "@/components/dashboard/landlord/renters/RenterDetailHeader";
import { RenterHistorySummary } from "@/components/dashboard/landlord/renters/RenterHistorySummary";
import { ArrowLeft } from "lucide-react";

export default async function RenterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const renter = mockLandlordRenters.find((r) => r.id === id) || mockLandlordRenters[0];

  if (!renter) notFound();

  const renterIssues = mockRentalIssues.filter((i) => i.renterName === renter.name);

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      <div>
        <Link
          href="/landlord/renters"
          className="inline-flex items-center gap-2 text-sm font-semibold text-faint hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Renters
        </Link>
      </div>

      <RenterDetailHeader renter={renter} />
      <RenterHistorySummary issues={renterIssues} />
    </main>
  );
}
