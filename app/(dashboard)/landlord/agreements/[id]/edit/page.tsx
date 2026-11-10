import { notFound } from "next/navigation";
import { mockAgreements } from "@/components/dashboard/landlord/agreements/data/mock-agreements";
import { AgreementEditor } from "@/components/dashboard/landlord/agreements/editor/AgreementEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const agreement = mockAgreements.find((a) => a.id === id);

  return {
    title: agreement
      ? `Edit ${agreement.referenceNumber} — Lease Agreement | Urugo Landlord`
      : "Edit Lease Agreement | Urugo Landlord",
  };
}

export default async function AgreementEditPage({ params }: Props) {
  const { id } = await params;
  const agreement = mockAgreements.find((a) => a.id === id) || mockAgreements[0];

  if (!agreement) {
    notFound();
  }

  return <AgreementEditor initialAgreement={agreement} />;
}
