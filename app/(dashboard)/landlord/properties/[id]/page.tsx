import { GroupDetails } from "@/components/dashboard/landlord/properties/GroupDetails";

export default async function PropertyGroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GroupDetails id={id} />;
}

