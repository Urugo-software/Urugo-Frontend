import { mockAgreements } from "@/components/dashboard/landlord/agreements/data/mock-agreements";
import { AgreementsPageHeader } from "@/components/dashboard/landlord/agreements/AgreementsPageHeader";
import { AgreementListContainer } from "@/components/dashboard/landlord/agreements/AgreementListContainer";

export const metadata = {
  title: "Lease Agreements | Urugo Landlord",
  description: "Prepare, customize, review, and manage standard residential lease agreements.",
};

export default function LandlordAgreementsPage() {
  return (
    <div className="space-y-6">
      <AgreementsPageHeader />
      <AgreementListContainer initialAgreements={mockAgreements} />
    </div>
  );
}
