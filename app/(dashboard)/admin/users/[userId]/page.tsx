import { AdminUserDetailView } from "@/components/dashboard/admin/users/AdminUserDetailView";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <AdminUserDetailView userId={decodeURIComponent(userId)} />;
}
