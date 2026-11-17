import { AddRenterPageHeader } from "@/components/dashboard/landlord/renters/AddRenterPageHeader";
import { RenterRegistrationWizard } from "@/components/dashboard/landlord/renters/RenterRegistrationWizard";
import { mockLandlordProperties } from "@/data/landlord-data";

export default function AddLandlordRenterPage() {
  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
        <div className="max-w-7xl space-y-8">
          <AddRenterPageHeader />
          <RenterRegistrationWizard properties={mockLandlordProperties} />
        </div>
      </div>
    </main>
  );
}
