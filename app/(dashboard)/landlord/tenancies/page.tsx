import {
  mockLandlordProperties,
  mockLandlordRenters,
} from "@/data/landlord-data";
import { TenanciesPortfolioView } from "@/components/dashboard/landlord/tenancies/TenanciesPortfolioView";
import { PropertyTenanciesView } from "@/components/dashboard/landlord/tenancies/property-view";

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
    <TenanciesPortfolioView
      renters={mockLandlordRenters}
      properties={mockLandlordProperties}
    />
  );
}
