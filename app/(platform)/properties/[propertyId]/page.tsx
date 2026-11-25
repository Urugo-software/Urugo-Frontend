import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import PropertyDetails from "@/components/platform/properties/propertyDescription/PropertyDetails";
import { listed_properties, property_details } from "@/data/properties";

interface PropertyPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { propertyId } = await params;
  const property = property_details.find((prop) => prop.id === propertyId);

  if (!property) {
    const t = await getTranslations("properties.meta");
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  return {
    title: `${property.headline} — ${property.location}`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { propertyId } = await params;
  const property = property_details.find((prop) => prop.id === propertyId);

  if (!property) {
    notFound();
  }

  const relatedProperties = listed_properties
    .filter((item) => item.id !== property.id)
    .slice(0, 3);

  return (
    <PropertyDetails
      property={property}
      relatedProperties={relatedProperties}
    />
  );
}
