import {
  fetchPublicPropertyPageById,
  fetchRelatedPublicProperties,
} from "@/api/property.api";
import {
  toPropertyDetailsModel,
  toPropertyMetadata,
  toRelatedPublicProperty,
} from "@/mappers/public-property.mapper";

export async function getPublicPropertyMetadata(propertyId: string) {
  const property = await fetchPublicPropertyPageById(propertyId);
  return property ? toPropertyMetadata(property) : null;
}
export async function getPublicPropertyPageData(propertyId: string) {
  const backendProperty = await fetchPublicPropertyPageById(propertyId);
  if (!backendProperty) return null;

  const relatedProperties = await fetchRelatedPublicProperties(
    backendProperty.district,
  );

  return {
    property: toPropertyDetailsModel(backendProperty),
    relatedProperties: relatedProperties
      .filter((item) => item.id !== backendProperty.id)
      .slice(0, 3)
      .map(toRelatedPublicProperty),
  };
}
