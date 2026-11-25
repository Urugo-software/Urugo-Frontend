import { RentalHistoryOverview } from "@/components/dashboard/landlord/blacklist/RentalHistoryOverview";

export default function LandlordRenterHistoryPage() {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <RentalHistoryOverview />
    </main>
  );
}
