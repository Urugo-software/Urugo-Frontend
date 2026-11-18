import { PropertyDetailsForm } from "@/components/dashboard/landlord/properties/PropertyDetailsForm";

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailsForm propertyId={id} />;
}
