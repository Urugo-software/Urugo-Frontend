import { getTranslations } from "next-intl/server";
import SectionLoading from "@/components/shared/SectionLoading";

export default async function LandlordLoading() {
  const t = await getTranslations("landlord.pages");

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-8">
      <SectionLoading message={t("loadingWorkspace")} />
    </div>
  );
}
