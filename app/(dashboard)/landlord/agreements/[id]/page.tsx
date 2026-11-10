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
      ? `${agreement.referenceNumber} — ${agreement.renter.name} | Lease Agreement`
      : "Lease Agreement Details | Urugo Landlord",
    description: agreement
      ? `Review and manage residential lease agreement ${agreement.referenceNumber} with ${agreement.renter.name}.`
      : "Residential tenancy contract details and digital signing workspace.",
  };
}

export default async function AgreementDetailPage({ params }: Props) {
  const { id } = await params;
  const agreement = mockAgreements.find((a) => a.id === id) || mockAgreements[0];

  if (!agreement) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-6 sm:pb-20 md:p-8 md:pb-24">
        <AgreementPreviewContainer initialAgreement={agreement} />
      </div>
    </main>
  );
}
