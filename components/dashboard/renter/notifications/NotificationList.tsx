import { Bell } from "lucide-react";
import { RenterNotification } from "@/types/renter";
import { NotificationItemCard } from "./NotificationItemCard";

export function NotificationList({ items }: { items: RenterNotification[] }) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
        <Bell className="size-8 text-faint mb-2" />
        <p className="text-sm font-semibold text-ink">No notifications yet.</p>
        <p className="text-xs text-body mt-0.5">
          Alerts regarding rent, electricity, and maintenance will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <NotificationItemCard key={item.id} notif={item} />
      ))}
    </div>
  );
}
