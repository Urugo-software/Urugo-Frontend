import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import SectionContainer from "@/components/platform/home/SectionContainer";
import LeftSide from "@/components/platform/properties/LeftSide";
import RightSide from "@/components/platform/properties/RightSide";
import SectionLoading from "@/components/shared/SectionLoading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("properties.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

async function PropertiesPage() {
  const t = await getTranslations("properties");

  return (
    <main className="min-h-screen w-full">
      <SectionContainer className="mx-auto flex max-w-7xl gap-6 py-8 max-md:flex-col lg:py-14">
        <LeftSide />
        <Suspense fallback={<SectionLoading message={t("loading")} />}>
          <RightSide />
        </Suspense>
      </SectionContainer>
    </main>
  );
}

export default PropertiesPage;
