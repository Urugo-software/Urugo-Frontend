export interface VisitItem {
  id: string;
  image: string;
  title: string;
  location: string;
  status: "Confirmed" | "Awaiting confirmation" | "Completed" | "Cancelled";
  date: string;
  time: string;
  landlord: string;
  type: "upcoming" | "past";
}

export const visitsData: VisitItem[] = [
  {
    id: "v-1",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80",
    title: "2 Bedroom Apartment — Kimironko",
    location: "KG 234 St, Kimironko, Gasabo",
    status: "Confirmed",
    date: "Saturday, 22 March",
    time: "2:00 PM",
    landlord: "Jean Claude M. · 0788 123 456",
    type: "upcoming",
  },
  {
    id: "v-2",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=300&q=80",
    title: "1 Bedroom Apartment — Remera",
    location: "KG 88 St, Remera, Gasabo",
    status: "Awaiting confirmation",
    date: "Sunday, 23 March",
    time: "10:00 AM",
    landlord: "Alice K.",
    type: "upcoming",
  },
  {
    id: "v-3",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80",
    title: "Studio Apartment — Kacyiru",
    location: "Viewed on March 10, 2026 · 3:00 PM",
    status: "Completed",
    date: "March 10, 2026",
    time: "3:00 PM",
    landlord: "",
    type: "past",
  },
  {
    id: "v-4",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=200&q=80",
    title: "2 Bedroom Apartment — Kabeza",
    location: "Viewed on March 5, 2026 · 11:00 AM",
    status: "Completed",
    date: "March 5, 2026",
    time: "11:00 AM",
    landlord: "",
    type: "past",
  },
  {
    id: "v-5",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=200&q=80",
    title: "Studio Apartment — Nyarugenge",
    location: "Cancelled by you · February 26, 2026",
    status: "Cancelled",
    date: "February 26, 2026",
    time: "",
    landlord: "",
    type: "past",
  },
];
