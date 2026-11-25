import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPropertyBreadcrumbs,
  DEFAULT_PUBLIC_FILTERS,
  filterPublicProperties,
  getGalleryPreviewMeta,
  parseNumericPrice,
} from "../utils/public-properties.ts";
import { isActivePath } from "../lib/utils.ts";

const SAMPLE_PROPERTIES = [
  {
    id: "0001",
    headline: "Cozy Studio Apartment",
    ownerName: "Eric N.",
    price: "100,000",
    location: "Kacyiru, Kigali",
    district: "Gasabo",
    sector: "Kacyiru",
    beds: 1,
    baths: 1,
    parking: false,
    amenities: ["Water included", "WiFi included", "24/7 security"],
    isVerified: true,
  },
  {
    id: "0002",
    headline: "Spacious 3BR House",
    ownerName: "Jean Claude M.",
    price: "300,000",
    location: "Nyarutarama, Kigali",
    district: "Gasabo",
    sector: "Nyarutarama",
    beds: 3,
    baths: 2,
    parking: true,
    amenities: ["Private parking", "Water included", "WiFi included"],
    isVerified: true,
  },
  {
    id: "0003",
    headline: "Furnished 1BR Apartment",
    ownerName: "Alice U.",
    price: "200,000",
    location: "Kicukiro, Kigali",
    district: "Kicukiro",
    sector: "Kicukiro",
    beds: 1,
    baths: 1,
    parking: false,
    amenities: ["Water included", "24/7 security"],
    isVerified: true,
  },
  {
    id: "0005",
    headline: "2BR Garden Apartment",
    ownerName: "Diane A.",
    price: "250,000",
    location: "Kimironko, Kigali",
    district: "Gasabo",
    sector: "Kimironko",
    beds: 2,
    baths: 2,
    parking: true,
    amenities: ["Private parking", "24/7 security"],
    isVerified: false,
  },
];

test("parseNumericPrice handles formatted strings and numbers safely", () => {
  assert.equal(parseNumericPrice("100,000"), 100000);
  assert.equal(parseNumericPrice("500000"), 500000);
  assert.equal(parseNumericPrice(250000), 250000);
  assert.equal(parseNumericPrice(""), 0);
});

test("filterPublicProperties supports search, district, price range, bedrooms, multi-amenities, and sorting", () => {
  const bySearch = filterPublicProperties(SAMPLE_PROPERTIES, {
    ...DEFAULT_PUBLIC_FILTERS,
    search: "kimironko",
  });
  assert.deepEqual(
    bySearch.map((p) => p.id),
    ["0005"],
  );

  const byDistrictAndPrice = filterPublicProperties(SAMPLE_PROPERTIES, {
    ...DEFAULT_PUBLIC_FILTERS,
    district: "Gasabo",
    minPrice: 150000,
    maxPrice: 300000,
    sort: "price_asc",
  });
  assert.deepEqual(
    byDistrictAndPrice.map((p) => p.id),
    ["0005", "0002"],
  );

  const byMultiAmenities = filterPublicProperties(SAMPLE_PROPERTIES, {
    ...DEFAULT_PUBLIC_FILTERS,
    amenities: ["Parking", "WiFi"],
  });
  assert.deepEqual(
    byMultiAmenities.map((p) => p.id),
    ["0002"],
  );

  const byBedrooms3Plus = filterPublicProperties(SAMPLE_PROPERTIES, {
    ...DEFAULT_PUBLIC_FILTERS,
    bedrooms: "3+",
  });
  assert.deepEqual(
    byBedrooms3Plus.map((p) => p.id),
    ["0002"],
  );

  const sortedDesc = filterPublicProperties(SAMPLE_PROPERTIES, {
    ...DEFAULT_PUBLIC_FILTERS,
    sort: "price_desc",
  });
  assert.deepEqual(
    sortedDesc.map((p) => p.id),
    ["0002", "0005", "0003", "0001"],
  );
});

test("buildPropertyBreadcrumbs links district/sector and deduplicates identical names", () => {
  const distinct = buildPropertyBreadcrumbs({
    district: "Gasabo",
    sector: "Kacyiru",
    headline: "Cozy Studio Apartment",
  });
  assert.deepEqual(distinct, [
    { label: "Properties", href: "/properties" },
    { label: "Gasabo", href: "/properties?district=Gasabo" },
    { label: "Kacyiru", href: "/properties?search=Kacyiru" },
    { label: "Cozy Studio Apartment" },
  ]);

  const sameDistrictAndSector = buildPropertyBreadcrumbs({
    district: "Kicukiro",
    sector: "Kicukiro",
    headline: "Furnished 1BR Apartment",
  });
  assert.deepEqual(sameDistrictAndSector, [
    { label: "Properties", href: "/properties" },
    { label: "Kicukiro", href: "/properties?district=Kicukiro" },
    { label: "Furnished 1BR Apartment" },
  ]);
});

test("getGalleryPreviewMeta accurately calculates +N remaining photo counts", () => {
  assert.deepEqual(getGalleryPreviewMeta(0), {
    total: 0,
    visibleCount: 0,
    extraCount: 0,
    hasExtra: false,
  });
  assert.deepEqual(getGalleryPreviewMeta(2), {
    total: 2,
    visibleCount: 2,
    extraCount: 0,
    hasExtra: false,
  });
  assert.deepEqual(getGalleryPreviewMeta(3), {
    total: 3,
    visibleCount: 3,
    extraCount: 0,
    hasExtra: false,
  });
  assert.deepEqual(getGalleryPreviewMeta(5), {
    total: 5,
    visibleCount: 3,
    extraCount: 2,
    hasExtra: true,
  });
  assert.deepEqual(getGalleryPreviewMeta(8), {
    total: 8,
    visibleCount: 3,
    extraCount: 5,
    hasExtra: true,
  });
});

test("isActivePath matches exact home path and nested public routes", () => {
  assert.equal(isActivePath("/", "/"), true);
  assert.equal(isActivePath("/properties", "/"), false);
  assert.equal(isActivePath("/properties", "/properties"), true);
  assert.equal(isActivePath("/properties/0001", "/properties"), true);
  assert.equal(isActivePath("/features", "/properties"), false);
});
