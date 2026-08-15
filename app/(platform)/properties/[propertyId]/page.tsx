import PropertyDetails from "@/components/platform/properties/propertyDescription/PropertyDetails";
import { property_details } from "@/data/properties";
import { Property } from "@/types/properties";

interface PropertyPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { propertyId } = await params;
  const property: Property | undefined = property_details.find(
    (prop) => prop.id === propertyId,
  );

  if (!property) {
    return <div>Property not found</div>;
  }

  return <PropertyDetails property={property} />;
}
