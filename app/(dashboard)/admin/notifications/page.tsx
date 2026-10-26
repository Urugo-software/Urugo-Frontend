import { AdminQueueView } from "@/components/dashboard/admin/AdminQueueView";
import { AdminCreateAction } from "@/components/dashboard/admin/AdminCreateAction";
export default function AdminNotificationsPage() { return <AdminQueueView kind="notifications" action={<AdminCreateAction type="notification" />} />; }