import { mockRentalIssues } from "@/data/landlord-data";
import { RentalHistoryOverview } from "@/components/dashboard/landlord/blacklist/RentalHistoryOverview";

export default function LandlordBlacklistCheckPage() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-white p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">
          Renter History
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-body">
          Check previous rental issues before accepting a renter.
        </p>
      </div>

      <RentalHistoryOverview issues={mockRentalIssues} />
    </main>
  );
}
