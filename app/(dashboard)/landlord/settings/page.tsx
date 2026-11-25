import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { LandlordSettingsView } from "@/components/dashboard/landlord/settings/LandlordSettingsView";
import SectionLoading from "@/components/shared/SectionLoading";

export default async function LandlordSettingsPage() {
  const t = await getTranslations("landlord.pages");

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      <Suspense fallback={<SectionLoading message={t("loadingSettings")} />}>
        <LandlordSettingsView />
      </Suspense>
    </main>
  );
}
