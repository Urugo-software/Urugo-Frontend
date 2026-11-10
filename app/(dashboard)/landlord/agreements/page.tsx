import { mockAgreements } from "@/components/dashboard/landlord/agreements/data/mock-agreements";
import { AgreementsPageHeader } from "@/components/dashboard/landlord/agreements/AgreementsPageHeader";
import { AgreementListContainer } from "@/components/dashboard/landlord/agreements/AgreementListContainer";

export const metadata = {
  title: "Lease Agreements | Urugo Landlord",
  description: "Prepare, customize, review, and manage standard residential lease agreements.",
};

export default function LandlordAgreementsPage() {
  const draftAgreement = mockAgreements.find((a) => a.status === "Draft");
  const newAgreementHref = draftAgreement
    ? `/landlord/agreements/${draftAgreement.id}/edit`
    : "/landlord/agreements/agr-005/edit";

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
        <AgreementsPageHeader newAgreementHref={newAgreementHref} />
        <AgreementListContainer initialAgreements={mockAgreements} />
      </div>
    </main>
  );
}
