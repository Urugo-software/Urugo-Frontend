export interface FullWaitingListItem {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  queueBadge: string;
  status: string;
  joinedDate: string;
  peopleAhead: string;
}

export const fullWaitingListData: FullWaitingListItem[] = [
  {
    id: "wl-1",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80",
    title: "2 Bedroom Apartment — Kabeza",
    location: "Kicukiro District",
    price: "180,000 RWF/month",
    queueBadge: "#3 in queue",
    status: "Currently occupied",
    joinedDate: "July 28, 2026",
    peopleAhead: "2",
  },
  {
    id: "wl-2",
    image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=300&q=80",
    title: "Studio Apartment — Remera",
    location: "Gasabo District",
    price: "95,000 RWF/month",
    queueBadge: "#1 in queue",
    status: "Currently occupied",
    joinedDate: "August 10, 2026",
    peopleAhead: "0 — you're next",
  },
];
