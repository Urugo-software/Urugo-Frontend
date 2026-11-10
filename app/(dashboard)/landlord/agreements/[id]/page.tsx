import { notFound } from "next/navigation";
import { mockAgreements } from "@/components/dashboard/landlord/agreements/data/mock-agreements";
import { AgreementPreviewContainer } from "@/components/dashboard/landlord/agreements/preview/AgreementPreviewContainer";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const agreement = mockAgreements.find((a) => a.id === id);

  return {
    title: agreement
      ? `${agreement.referenceNumber} — Lease Agreement | Urugo Landlord`
      : "Lease Agreement Preview | Urugo Landlord",
  };
}

export default async function AgreementDetailPage({ params }: Props) {
  const { id } = await params;
  const agreement = mockAgreements.find((a) => a.id === id) || mockAgreements[0];

  if (!agreement) {
    notFound();
  }

  return <AgreementPreviewContainer initialAgreement={agreement} />;
}
