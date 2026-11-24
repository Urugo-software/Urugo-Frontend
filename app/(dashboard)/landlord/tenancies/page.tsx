import {
  mockLandlordProperties,
  mockLandlordRenters,
} from "@/data/landlord-data";
import { TenancyListCard } from "@/components/dashboard/landlord/tenancies/TenancyListCard";
import { PropertyTenanciesView } from "@/components/dashboard/landlord/tenancies/property-view";
import { findPropertyForRenter } from "@/utils/property-tenancies";

interface LandlordTenanciesPageProps {
  searchParams: Promise<{ property?: string | string[] }>;
}

export default async function LandlordTenanciesPage({
  searchParams,
}: LandlordTenanciesPageProps) {
  const { property } = await searchParams;
  const rawPropertyId = Array.isArray(property) ? property[0] : property;
  const propertyId = rawPropertyId?.trim();

  if (propertyId) {
    return <PropertyTenanciesView propertyId={propertyId} />;
  }

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">
          Tenancy Management
        </h1>
        <p className="mt-1.5 text-sm text-body sm:text-[15px]">
          Manage active lease contracts, review rental obligations, and safely
          process end-of-tenancy closures.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mockLandlordRenters.map((renter) => (
          <TenancyListCard
            key={renter.id}
            renter={renter}
            property={findPropertyForRenter(renter, mockLandlordProperties)}
          />
        ))}
      </div>
    </main>
  );
}
