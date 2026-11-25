import { Suspense } from "react";
import { LandlordSettingsView } from "@/components/dashboard/landlord/settings/LandlordSettingsView";
import SectionLoading from "@/components/shared/SectionLoading";

export default function LandlordSettingsPage() {
  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <Suspense fallback={<SectionLoading message="Loading settings..." />}>
        <LandlordSettingsView />
      </Suspense>
    </main>
  );
}
