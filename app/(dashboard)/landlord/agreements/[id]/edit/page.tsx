import { mockAgreements } from "@/data/mock-agreements";
import { AgreementEditView } from "@/components/dashboard/landlord/agreements/AgreementEditView";

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

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <AgreementEditView agreementId={id} />
    </main>
  );
}
