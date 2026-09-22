import Link from "next/link";
import { notFound } from "next/navigation";
import { mockLandlordRenters, mockTenancyPayments } from "@/data/landlord-data";
import { TenancyHeader } from "@/components/dashboard/landlord/tenancies/TenancyHeader";
import { EndTenancyWorkflow } from "@/components/dashboard/landlord/tenancies/EndTenancyWorkflow";
import { ArrowLeft } from "lucide-react";

export default async function TenancyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const renter = mockLandlordRenters.find((r) => r.id === id) || mockLandlordRenters[0];

  if (!renter) notFound();

  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      <div>
        <Link
          href="/landlord/tenancies"
          className="inline-flex items-center gap-2 text-sm font-semibold text-faint hover:text-ink transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tenancies
        </Link>
      </div>

      <TenancyHeader renter={renter} />

      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-6 py-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
            End Tenancy Workflow
          </h2>
          <p className="mt-1 text-sm sm:text-[15px] font-semibold text-ink">
            Safely close this tenancy — step-by-step verification
          </p>
        </div>
        <div className="p-6">
          <EndTenancyWorkflow renter={renter} initialPayments={mockTenancyPayments} />
        </div>
      </div>
    </main>
  );
}
