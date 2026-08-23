import { NotificationList } from "@/components/dashboard/home-seeker/notifications/NotificationList";
export default function NotificationsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 pb-16 sm:p-8 md:p-10">
      <NotificationList />
    </main>
  );
}
