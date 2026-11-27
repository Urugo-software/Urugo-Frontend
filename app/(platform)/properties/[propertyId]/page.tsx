import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import PropertyDetails from "@/components/platform/properties/propertyDescription/PropertyDetails";
import {
  getPublicPropertyMetadata,
  getPublicPropertyPageData,
} from "@/services/public-property.service";

interface PropertyPageProps {
  params: Promise<{
    propertyId: string;
  }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { propertyId } = await params;
  const property = await getPublicPropertyMetadata(propertyId);

  if (!property) {
    const t = await getTranslations("properties.meta");
    return {
      title: t("notFoundTitle"),
      description: t("notFoundDescription"),
    };
  }

  return property;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { propertyId } = await params;
  const propertyPage = await getPublicPropertyPageData(propertyId);

  if (!propertyPage) notFound();

  return (
    <PropertyDetails
      property={propertyPage.property}
      relatedProperties={propertyPage.relatedProperties}
    />
  );
}
