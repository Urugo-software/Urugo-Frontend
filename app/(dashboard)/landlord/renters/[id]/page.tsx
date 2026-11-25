import { RenterDetailView } from "@/components/dashboard/landlord/renters/RenterDetailView";

export default async function RenterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RenterDetailView renterId={id} />;
}
