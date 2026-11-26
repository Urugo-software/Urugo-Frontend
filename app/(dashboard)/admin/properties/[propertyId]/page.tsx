import { AdminPropertyDetailView } from "@/components/dashboard/admin/properties/AdminPropertyDetailView";

export default async function AdminPropertyDetailPage({
  params,
}: {
  params: Promise<{ propertyId: string }>;
}) {
  const { propertyId } = await params;
  return <AdminPropertyDetailView propertyId={decodeURIComponent(propertyId)} />;
}
