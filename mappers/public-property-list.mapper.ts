import type { PublicPropertyListParams, BackendPublicProperty } from "@/api/property.api";
import type { PropertyListingCardProps } from "@/types";
import type { PublicPropertyFilters } from "@/utils/public-properties";

const ITEMS_PER_PAGE = 6;

export function toPublicPropertyQueryParams(
  filters: PublicPropertyFilters,
  page: number,
): PublicPropertyListParams {
  const params: PublicPropertyListParams = { page, limit: ITEMS_PER_PAGE };
  const search = filters.search.trim();
  if (search) params.search = search;

  const district = filters.district.trim();
  if (district && district.toLowerCase() !== "all districts") {
    params.district = district.toUpperCase();
  }
  if (filters.minPrice !== null) params.minRent = filters.minPrice;
  if (filters.maxPrice !== null) params.maxRent = filters.maxPrice;

  if (filters.bedrooms === "Studio") params.property_type = "STUDIO";
  else if (filters.bedrooms === "3+") params.minBedrooms = 3;
  else if (filters.bedrooms !== "Any") {
    const bedrooms = Number(filters.bedrooms);
    if (Number.isInteger(bedrooms) && bedrooms >= 0) params.bedrooms = bedrooms;
  }

  for (const amenity of filters.amenities) {
    const key = amenity.trim().toLowerCase();
    if (key === "wifi") params.hasWifi = true;
    else if (key === "parking") params.hasParking = true;
    else if (key === "water") params.includesWater = true;
    else if (key === "security") params.securityIncluded = true;
  }

  if (filters.sort === "price_asc") {
    params.sortBy = "rent";
    params.sortOrder = "asc";
  } else if (filters.sort === "price_desc") {
    params.sortBy = "rent";
    params.sortOrder = "desc";
  } else {
    params.sortBy = "newest";
  }

  return params;
}

export function toPropertyListingCardProps(
  property: BackendPublicProperty,
  index: number,
): PropertyListingCardProps & { index: number } {
  return {
    id: property.id,
    index,
    image: property.property_photos?.[0] ?? "/assets/home/im1.webp",
    headline: property.title || `${property.property_type} in ${property.district}`,
    ownerName: "Property owner",
    price: property.monthlyRent.toLocaleString(),
    currency: "RWF",
    period: "month",
    location: [property.address, property.sector, property.district]
      .filter(Boolean)
      .join(", "),
    beds: property.bedrooms ?? 0,
    baths: property.bathrooms ?? 0,
    parking: Boolean(property.hasParking),
    isVerified: false,
    availabilityStatus:
      property.status === "AVAILABLE" ? "Available" : property.status,
  };
}
