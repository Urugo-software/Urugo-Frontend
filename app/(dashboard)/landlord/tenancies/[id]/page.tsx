import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  mockLandlordProperties,
  mockLandlordRenters,
  mockTenancyPayments,
} from "@/data/landlord-data";
import { TenancyHeader } from "@/components/dashboard/landlord/tenancies/TenancyHeader";
import { EndTenancyWorkflow } from "@/components/dashboard/landlord/tenancies/EndTenancyWorkflow";
import { findPropertyForRenter } from "@/utils/property-tenancies";

interface TenancyDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fromProperty?: string | string[] }>;
}

export default async function TenancyDetailPage({
  params,
  searchParams,
}: TenancyDetailPageProps) {
  const [{ id }, { fromProperty }] = await Promise.all([params, searchParams]);
  const renter =
    mockLandlordRenters.find((r) => r.id === id) || mockLandlordRenters[0];

  if (!renter) notFound();

  const property = findPropertyForRenter(renter, mockLandlordProperties);
  const rawFromProperty = Array.isArray(fromProperty) ? fromProperty[0] : fromProperty;
  const fromPropertyId = rawFromProperty?.trim();
  const originProperty = fromPropertyId
    ? mockLandlordProperties.find((item) => item.id === fromPropertyId)
    : undefined;

  const backHref = originProperty
    ? `/landlord/tenancies?property=${encodeURIComponent(originProperty.id)}`
    : "/landlord/tenancies";
  const backLabel = originProperty
    ? `Back to ${originProperty.name}`
    : "Back to Tenancies";

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>

      <TenancyHeader renter={renter} property={property} />

      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-6 py-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
            End Tenancy Workflow
          </h2>
          <p className="mt-1 text-sm font-semibold text-ink sm:text-[15px]">
            Safely close this tenancy — step-by-step verification
          </p>
        </div>
        <div className="p-6">
          <EndTenancyWorkflow
            renter={renter}
            initialPayments={mockTenancyPayments}
          />
        </div>
      </div>
    </main>
  );
}
