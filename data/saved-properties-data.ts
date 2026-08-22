export interface FullSavedProperty {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  features: string;
  status: "Available" | "Occupied";
  isWaitingList?: boolean;
}

export const fullSavedProperties: FullSavedProperty[] = [
  {
    id: "sp-1",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80",
    title: "2BR Apartment — Kimironko",
    price: "150,000",
    location: "Gasabo District",
    features: "Parking, WiFi",
    status: "Available",
  },
  {
    id: "sp-2",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=80",
    title: "Studio — Kacyiru",
    price: "80,000",
    location: "Gasabo District",
    features: "WiFi included",
    status: "Available",
  },
  {
    id: "sp-3",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
    title: "2BR Apartment — Kabeza",
    price: "180,000",
    location: "Kicukiro District",
    features: "Parking",
    status: "Occupied",
    isWaitingList: true,
  },
  {
    id: "sp-4",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=500&q=80",
    title: "1BR Apartment — Remera",
    price: "130,000",
    location: "Gasabo District",
    features: "Water included",
    status: "Available",
  },
];
