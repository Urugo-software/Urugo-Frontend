import { AgreementListContainer } from "@/components/dashboard/landlord/agreements/AgreementListContainer";

export const metadata = {
  title: "Lease Agreements | Urugo Landlord",
  description:
    "Prepare, customize, review, and manage standard residential lease agreements.",
};

export default function LandlordAgreementsPage() {
  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
        <AgreementListContainer />
      </div>
    </main>
  );
}
