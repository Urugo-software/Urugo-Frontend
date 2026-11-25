import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import HowItWorksHeader from "@/components/platform/how-it-works/HowItWorksHeader";
import HowItWorksTabs from "@/components/platform/how-it-works/HowItWorksTabs";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("public.howItWorks.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

function HowItWorksPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      {/* Header Section */}
      <HowItWorksHeader />

      {/* Interactive Tabs, Step Flow, and Role Banner */}
      <HowItWorksTabs />
    </main>
  );
}

export default HowItWorksPage;
