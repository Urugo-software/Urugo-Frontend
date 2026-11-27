import type { BackendPublicProperty } from "@/api/property.api";
import type { Property } from "@/types/properties";
import { getInitials } from "@/utils/initials";

export interface RelatedPublicProperty {
  id: string;
  image: string;
  headline: string;
  location: string;
  price: string;
  currency: string;
  period: string;
}

function getHeadline(property: BackendPublicProperty): string {
  return property.title || `${property.property_type} in ${property.district}`;
}

export function toPropertyDetailsModel(raw: BackendPublicProperty): Property {
  const headline = getHeadline(raw);
  const landlordName = raw.contact?.landlord?.name || "Property owner";
  const landlordPhone = raw.contact?.landlord?.phoneNumber || "";
  const initialMonths = raw.initialPaymentMonths ?? 1;
  const initialPrice =
    raw.initialPaymentPrice && raw.initialPaymentPrice > 0
      ? raw.initialPaymentPrice
      : raw.monthlyRent * initialMonths;
  const amenityNames = new Set<string>(raw.amenities ?? []);

  if (raw.hasWifi) amenityNames.add("WiFi");
  if (raw.hasParking) amenityNames.add("Private Parking");
  if (raw.includesWater) amenityNames.add("Water Included");
  if (raw.includesElectricity) amenityNames.add("Electricity Included");
  if (raw.securityIncluded) amenityNames.add("24/7 Security");

  const photos = raw.property_photos?.length
    ? raw.property_photos
    : ["/assets/home/im1.webp"];

  return {
    id: raw.id,
    headline,
    ownerName: landlordName,
    price: raw.monthlyRent.toLocaleString(),
    currency: "RWF",
    period: "month",
    location: [raw.address, raw.sector, raw.district, raw.city]
      .filter(Boolean)
      .join(", "),
    district: raw.district,
    sector: raw.sector ?? "",
    beds: raw.bedrooms ?? 0,
    baths: raw.bathrooms ?? 0,
    parking: Boolean(raw.hasParking),
    isVerified: false,
    availabilityStatus: raw.status === "AVAILABLE" ? "available" : "unavailable",
    description: raw.description || "",
    images: photos.map((url, index) => ({
      id: `${raw.id}-img-${index}`,
      image: url,
      alt: `${headline} photo ${index + 1}`,
    })),
    amenities: Array.from(amenityNames).map((name, index) => ({
      id: `${raw.id}-am-${index}`,
      name,
      icon: "check",
    })),
    moveInCosts: [
      { label: `Initial rent (${initialMonths} mo)`, amount: initialPrice },
    ],
    recurringCosts: [
      {
        label: "Monthly rent",
        amount: raw.monthlyRent,
        payer: "TENANT",
        isEstimated: false,
      },
    ],
    landlord: {
      id: raw.id,
      name: landlordName,
      initials: getInitials(landlordName) || "UR",
      phone: landlordPhone,
      whatsapp: landlordPhone,
      isVerified: false,
    },
    availableFrom: "Immediately",
  };
}

export function toRelatedPublicProperty(
  raw: BackendPublicProperty,
): RelatedPublicProperty {
  return {
    id: raw.id,
    image: raw.property_photos?.[0] ?? "/assets/home/im1.webp",
    headline: getHeadline(raw),
    location: [raw.address, raw.sector, raw.district].filter(Boolean).join(", "),
    price: raw.monthlyRent.toLocaleString(),
    currency: "RWF",
    period: "month",
  };
}

export function toPropertyMetadata(raw: BackendPublicProperty) {
  const headline = getHeadline(raw);
  return {
    title: `${headline} — ${raw.district}`,
    description: raw.description || headline,
  };
}
