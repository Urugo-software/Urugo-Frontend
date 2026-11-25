import { TenancyDetailView } from "@/components/dashboard/landlord/tenancies/TenancyDetailView";

interface TenancyDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ fromProperty?: string | string[] }>;
}

export default async function TenancyDetailPage({
  params,
  searchParams,
}: TenancyDetailPageProps) {
  const [{ id }, { fromProperty }] = await Promise.all([params, searchParams]);
  const rawFromProperty = Array.isArray(fromProperty)
    ? fromProperty[0]
    : fromProperty;

  return (
    <TenancyDetailView
      renterId={id}
      fromPropertyId={rawFromProperty?.trim()}
    />
  );
}
