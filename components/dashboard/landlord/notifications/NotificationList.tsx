import { Bell } from "lucide-react";
import { LandlordNotificationItem } from "@/types/landlord";
import { NotificationItemCard } from "./NotificationItemCard";

export function NotificationList({
  items,
}: {
  items: LandlordNotificationItem[];
}) {
  if (items.length === 0) {
    return (
      <div className="border border-line bg-white p-14 text-center">
        <Bell className="mx-auto h-8 w-8 text-faint" strokeWidth={1.5} />
        <h3 className="mt-3 text-sm font-bold text-ink">
          No notifications found
        </h3>
        <p className="mt-1 text-xs text-faint">
          You are all caught up in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((notif) => (
        <NotificationItemCard key={notif.id} notif={notif} />
      ))}
    </div>
  );
}
