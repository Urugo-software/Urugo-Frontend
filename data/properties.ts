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
