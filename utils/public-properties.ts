export interface PublicPropertyFilterable {
  id: string;
  headline: string;
  ownerName: string;
  price: string;
  location: string;
  district?: string;
  sector?: string;
  beds: number;
  baths: number;
  parking?: boolean;
  amenities?: string[];
  isVerified: boolean;
}

export type PublicPropertySort = "default" | "price_asc" | "price_desc";

export interface PublicPropertyFilters {
  search: string;
  district: string;
  minPrice: number | null;
  maxPrice: number | null;
  bedrooms: string;
  amenities: string[];
  sort: PublicPropertySort;
}

export const DEFAULT_PUBLIC_FILTERS: PublicPropertyFilters = {
  search: "",
  district: "All districts",
  minPrice: null,
  maxPrice: null,
  bedrooms: "Any",
  amenities: [],
  sort: "default",
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface GalleryPreviewMeta {
  total: number;
  visibleCount: number;
  extraCount: number;
  hasExtra: boolean;
}

export function parseNumericPrice(price: string | number): number {
  if (typeof price === "number") return Number.isFinite(price) ? price : 0;
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export function matchesBedroomsFilter(
  beds: number,
  bedroomsFilter: string,
): boolean {
  if (!bedroomsFilter || bedroomsFilter === "Any") return true;
  if (bedroomsFilter === "Studio") return beds <= 1;
  if (bedroomsFilter === "3+") return beds >= 3;
  const target = Number(bedroomsFilter);
  return Number.isNaN(target) ? true : beds === target;
}

export function filterPublicProperties<T extends PublicPropertyFilterable>(
  properties: readonly T[],
  filters: PublicPropertyFilters,
): T[] {
  const query = filters.search.trim().toLowerCase();
  const district = filters.district.trim().toLowerCase();
  const hasDistrict =
    Boolean(district) && district !== "all districts" && district !== "all";

  const filtered = properties.filter((item) => {
    if (query) {
      const haystack = [
        item.headline,
        item.location,
        item.district ?? "",
        item.sector ?? "",
        item.ownerName,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (hasDistrict) {
      const locHaystack =
        `${item.district ?? ""} ${item.sector ?? ""} ${item.location}`.toLowerCase();
      if (!locHaystack.includes(district)) return false;
    }

    const monthlyPrice = parseNumericPrice(item.price);
    if (filters.minPrice !== null && monthlyPrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== null && monthlyPrice > filters.maxPrice) {
      return false;
    }

    if (!matchesBedroomsFilter(item.beds, filters.bedrooms)) {
      return false;
    }

    if (filters.amenities.length > 0) {
      const itemAmenities = (item.amenities ?? []).map((a) => a.toLowerCase());
      for (const req of filters.amenities) {
        const key = req.toLowerCase();
        if (key === "parking") {
          const hasParking =
            Boolean(item.parking) ||
            itemAmenities.some((a) => a.includes("parking"));
          if (!hasParking) return false;
        } else {
          const token = key.replace(" incl.", "").trim();
          const hasMatch = itemAmenities.some((a) => a.includes(token));
          if (!hasMatch) return false;
        }
      }
    }

    return true;
  });

  if (filters.sort === "price_asc") {
    return [...filtered].sort(
      (a, b) => parseNumericPrice(a.price) - parseNumericPrice(b.price),
    );
  }
  if (filters.sort === "price_desc") {
    return [...filtered].sort(
      (a, b) => parseNumericPrice(b.price) - parseNumericPrice(a.price),
    );
  }
  return filtered;
}

export function buildPropertyBreadcrumbs(input: {
  district?: string;
  sector?: string;
  headline: string;
}): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: "Properties", href: "/properties" },
  ];

  const district = input.district?.trim();
  const sector = input.sector?.trim();

  if (district) {
    items.push({
      label: district,
      href: `/properties?district=${encodeURIComponent(district)}`,
    });
  }

  if (sector && sector.toLowerCase() !== district?.toLowerCase()) {
    items.push({
      label: sector,
      href: `/properties?search=${encodeURIComponent(sector)}`,
    });
  }

  items.push({ label: input.headline });
  return items;
}

export function getGalleryPreviewMeta(
  totalImages: number,
  maxVisible = 3,
): GalleryPreviewMeta {
  const total = Math.max(0, totalImages);
  const visibleCount = Math.min(total, Math.max(1, maxVisible));
  const extraCount = Math.max(0, total - visibleCount);
  return {
    total,
    visibleCount,
    extraCount,
    hasExtra: extraCount > 0,
  };
}
