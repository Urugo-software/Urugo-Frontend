import { PropertyDetailsView } from "@/components/dashboard/landlord/properties/PropertyDetailsView";

export default async function LandlordPropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyDetailsView propertyId={id} />;
}
