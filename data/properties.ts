import { Property } from "@/types/properties";
import prop1 from "../public/assets/home/prop1.jpg";
import prop2 from "../public/assets/home/prop2.jpg";
import prop3 from "../public/assets/home/prop3.jpg";
import prop4 from "../public/assets/home/prop4.jpg";
import prop5 from "../public/assets/home/prop5.jpg";

export const listed_properties = [
  {
    id: "0001",
    image: prop1,
    headline: "Cozy Studio Apartment",
    ownerName: "Eric N.",
    price: "100,000",
    currency: "RWF",
    period: "month",
    location: "Kacyiru, Kigali",
    beds: 1,
    baths: 1,
    parking: false,
    isVerified: true,
    availabilityStatus: "available",
  },
  {
    id: "0002",
    image: prop2,
    headline: "Spacious 3BR House",
    ownerName: "Jean Claude M.",
    price: "300,000",
    currency: "RWF",
    period: "month",
    location: "Nyarutarama, Kigali",
    beds: 3,
    baths: 2,
    parking: true,
    isVerified: true,
    availabilityStatus: "available",
  },
  {
    id: "0003",
    image: prop3,
    headline: "Furnished 1BR Apartment",
    ownerName: "Alice U.",
    price: "200,000",
    currency: "RWF",
    period: "month",
    location: "Kicukiro, Kigali",
    beds: 1,
    baths: 1,
    parking: false,
    isVerified: true,
    availabilityStatus: "available",
  },
  {
    id: "0004",
    image: prop4,
    headline: "Modern 4BR Villa",
    ownerName: "Patrick M.",
    price: "500,000",
    currency: "RWF",
    period: "month",
    location: "Gacuriro, Kigali",
    beds: 4,
    baths: 3,
    parking: true,
    isVerified: true,
    availabilityStatus: "available",
  },
  {
    id: "0005",
    image: prop5,
    headline: "Modern 4BR Villa",
    ownerName: "Diane A.",
    price: "500,000",
    currency: "RWF",
    period: "month",
    location: "Gacuriro, Kigali",
    beds: 4,
    baths: 3,
    parking: true,
    isVerified: false,
    availabilityStatus: "available",
  },
];

export const propertyLocations = [
  { id: "1", name: "All districts" },

  // Kigali City
  { id: "2", name: "Gasabo" },
  { id: "3", name: "Kicukiro" },
  { id: "4", name: "Nyarugenge" },

  // Eastern Province
  { id: "5", name: "Bugesera" },
  { id: "6", name: "Gatsibo" },
  { id: "7", name: "Kayonza" },
  { id: "8", name: "Kirehe" },
  { id: "9", name: "Ngoma" },
  { id: "10", name: "Nyagatare" },
  { id: "11", name: "Rwamagana" },

  // Northern Province
  { id: "12", name: "Burera" },
  { id: "13", name: "Gakenke" },
  { id: "14", name: "Gicumbi" },
  { id: "15", name: "Musanze" },
  { id: "16", name: "Rulindo" },

  // Southern Province
  { id: "17", name: "Gisagara" },
  { id: "18", name: "Huye" },
  { id: "19", name: "Kamonyi" },
  { id: "20", name: "Muhanga" },
  { id: "21", name: "Nyamagabe" },
  { id: "22", name: "Nyanza" },
  { id: "23", name: "Nyaruguru" },
  { id: "24", name: "Ruhango" },

  // Western Province
  { id: "25", name: "Karongi" },
  { id: "26", name: "Ngororero" },
  { id: "27", name: "Nyabihu" },
  { id: "28", name: "Nyamasheke" },
  { id: "29", name: "Rubavu" },
  { id: "30", name: "Rusizi" },
  { id: "31", name: "Rutsiro" },
];
export const sortOptions = [
  { id: "1", name: "Recently saved " },
  { id: "2", name: "Price — low to high " },
  { id: "3", name: "Highest rated " },
];

export const property_details: Property[] = [
  {
    id: "0001",
    headline: "Cozy Studio Apartment",
    ownerName: "Eric N.",

    price: "100000",
    currency: "RWF",
    period: "month",

    location: "Kacyiru, Kigali",
    district: "Gasabo",
    sector: "Kacyiru",

    beds: 1,
    baths: 1,
    parking: false,

    isVerified: true,
    availabilityStatus: "available",

    description:
      "A cozy studio apartment in Kacyiru, offering a comfortable living space in a convenient and accessible neighborhood.",

    images: [
      {
        id: "0001-1",
        image: prop1,
        alt: "Cozy studio apartment",
      },
      {
        id: "0001-2",
        image: prop1,
        alt: "Studio apartment interior",
      },
      {
        id: "0001-3",
        image: prop1,
        alt: "Studio apartment living area",
      },
    ],

    amenities: [
      {
        id: "amenity-1",
        name: "Water included",
        icon: "water",
      },
      {
        id: "amenity-2",
        name: "WiFi included",
        icon: "wifi",
      },
      {
        id: "amenity-3",
        name: "24/7 security",
        icon: "security",
      },
      {
        id: "amenity-4",
        name: "Laundry area",
        icon: "laundry",
      },
    ],

    moveInCosts: [
      {
        label: "Rent upfront (3 months)",
        amount: 900000,
      },
      {
        label: "Security deposit",
        amount: 300000,
      },
    ],

    recurringCosts: [
      {
        label: "Rent",
        amount: 300000,
        payer: "TENANT",
        isEstimated: false,
      },
      {
        label: "Electricity",
        amount: 25000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Water",
        amount: 10000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Security",
        amount: 5000,
        payer: "LANDLORD",
        isEstimated: false,
      },
      {
        label: "Internet",
        amount: 15000,
        payer: "TENANT",
        isEstimated: false,
      },
    ],

    landlord: {
      id: "landlord-0001",
      name: "Eric N.",
      initials: "EN",
      phone: "+250 788 123 456",
      whatsapp: "+250 788 123 456",
      isVerified: true,
    },

    availableFrom: "Immediately",
  },

  {
    id: "0002",
    headline: "Spacious 3BR House",
    ownerName: "Jean Claude M.",

    price: "300000",
    currency: "RWF",
    period: "month",

    location: "Nyarutarama, Kigali",
    district: "Gasabo",
    sector: "Nyarutarama",

    beds: 3,
    baths: 2,
    parking: true,

    isVerified: true,
    availabilityStatus: "available",

    description:
      "A spacious 3-bedroom house located in Nyarutarama, Kigali. The property offers a comfortable living space in a convenient and secure neighborhood.",

    images: [
      {
        id: "0002-1",
        image: prop2,
        alt: "Spacious 3BR house",
      },
      {
        id: "0002-2",
        image: prop2,
        alt: "Spacious 3BR house interior",
      },
      {
        id: "0002-3",
        image: prop2,
        alt: "Spacious 3BR house exterior",
      },
    ],

    amenities: [
      {
        id: "amenity-1",
        name: "Private parking",
        icon: "parking",
      },
      {
        id: "amenity-2",
        name: "Water included",
        icon: "water",
      },
      {
        id: "amenity-3",
        name: "24/7 security",
        icon: "security",
      },
      {
        id: "amenity-4",
        name: "WiFi included",
        icon: "wifi",
      },
      {
        id: "amenity-5",
        name: "Spacious living room",
        icon: "living-room",
      },
      {
        id: "amenity-6",
        name: "Laundry area",
        icon: "laundry",
      },
    ],

    moveInCosts: [
      {
        label: "Rent upfront (3 months)",
        amount: 900000,
      },
      {
        label: "Security deposit",
        amount: 300000,
      },
    ],

    recurringCosts: [
      {
        label: "Rent",
        amount: 300000,
        payer: "TENANT",
        isEstimated: false,
      },
      {
        label: "Electricity",
        amount: 25000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Water",
        amount: 10000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Security",
        amount: 5000,
        payer: "LANDLORD",
        isEstimated: false,
      },
      {
        label: "Internet",
        amount: 15000,
        payer: "TENANT",
        isEstimated: false,
      },
    ],

    landlord: {
      id: "landlord-0002",
      name: "Jean Claude M.",
      initials: "JM",
      phone: "+250 788 234 567",
      whatsapp: "+250 788 234 567",
      isVerified: true,
    },

    availableFrom: "Immediately",
  },

  {
    id: "0003",
    headline: "Furnished 1BR Apartment",
    ownerName: "Alice U.",

    price: "200000",
    currency: "RWF",
    period: "month",

    location: "Kicukiro, Kigali",
    district: "Kicukiro",
    sector: "Kicukiro",

    beds: 1,
    baths: 1,
    parking: false,

    isVerified: true,
    availabilityStatus: "available",

    description:
      "A furnished one-bedroom apartment in Kicukiro with a comfortable interior and essential amenities, suitable for someone looking for a ready-to-move-in home.",

    images: [
      {
        id: "0003-1",
        image: prop3,
        alt: "Furnished 1BR apartment",
      },
      {
        id: "0003-2",
        image: prop3,
        alt: "Furnished apartment interior",
      },
      {
        id: "0003-3",
        image: prop3,
        alt: "Furnished apartment living room",
      },
    ],

    amenities: [
      {
        id: "amenity-1",
        name: "Furnished living room",
        icon: "living-room",
      },
      {
        id: "amenity-2",
        name: "Water included",
        icon: "water",
      },
      {
        id: "amenity-3",
        name: "WiFi included",
        icon: "wifi",
      },
      {
        id: "amenity-4",
        name: "Laundry area",
        icon: "laundry",
      },
    ],

    moveInCosts: [
      {
        label: "Rent upfront (3 months)",
        amount: 900000,
      },
      {
        label: "Security deposit",
        amount: 300000,
      },
    ],

    recurringCosts: [
      {
        label: "Rent",
        amount: 300000,
        payer: "TENANT",
        isEstimated: false,
      },
      {
        label: "Electricity",
        amount: 25000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Water",
        amount: 10000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Security",
        amount: 5000,
        payer: "LANDLORD",
        isEstimated: false,
      },
      {
        label: "Internet",
        amount: 15000,
        payer: "TENANT",
        isEstimated: false,
      },
    ],

    landlord: {
      id: "landlord-0003",
      name: "Alice U.",
      initials: "AU",
      phone: "+250 788 345 678",
      whatsapp: "+250 788 345 678",
      isVerified: true,
    },

    availableFrom: "Immediately",
  },

  {
    id: "0004",
    headline: "Modern 4BR Villa",
    ownerName: "Patrick M.",

    price: "500000",
    currency: "RWF",
    period: "month",

    location: "Gacuriro, Kigali",
    district: "Gasabo",
    sector: "Gacuriro",

    beds: 4,
    baths: 3,
    parking: true,

    isVerified: true,
    availabilityStatus: "available",

    description:
      "A modern four-bedroom villa in Gacuriro with spacious rooms, private parking, and a comfortable environment suitable for a family.",

    images: [
      {
        id: "0004-1",
        image: prop4,
        alt: "Modern 4BR villa",
      },
      {
        id: "0004-2",
        image: prop4,
        alt: "Modern villa interior",
      },
      {
        id: "0004-3",
        image: prop4,
        alt: "Modern villa exterior",
      },
    ],

    amenities: [
      {
        id: "amenity-1",
        name: "Private parking",
        icon: "parking",
      },
      {
        id: "amenity-2",
        name: "Water included",
        icon: "water",
      },
      {
        id: "amenity-3",
        name: "24/7 security",
        icon: "security",
      },
      {
        id: "amenity-4",
        name: "Spacious living room",
        icon: "living-room",
      },
      {
        id: "amenity-5",
        name: "Laundry area",
        icon: "laundry",
      },
      {
        id: "amenity-6",
        name: "WiFi included",
        icon: "wifi",
      },
    ],

    moveInCosts: [
      {
        label: "Rent upfront (3 months)",
        amount: 900000,
      },
      {
        label: "Security deposit",
        amount: 300000,
      },
    ],

    recurringCosts: [
      {
        label: "Rent",
        amount: 300000,
        payer: "TENANT",
        isEstimated: false,
      },
      {
        label: "Rent",
        amount: 300000,
        payer: "TENANT",
        isEstimated: false,
      },
      {
        label: "Water",
        amount: 10000,
        payer: "TENANT",
        isEstimated: true,
      },
      {
        label: "Security",
        amount: 5000,
        payer: "LANDLORD",
        isEstimated: false,
      },
      {
        label: "Internet",
        amount: 15000,
        payer: "TENANT",
        isEstimated: false,
      },
    ],

    landlord: {
      id: "landlord-0003",
      name: "Alice U.",
      initials: "AU",
      phone: "+250 788 345 678",
      whatsapp: "+250 788 345 678",
      isVerified: true,
    },
    availableFrom: "Immediately",
  },
];
