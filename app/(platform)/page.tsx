import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ChatBox from "@/components/platform/home/AI-assistant/ChatBox";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import WorkingProcess from "@/components/platform/home/AI-assistant/WorkingProcess";
import CtaBand from "@/components/platform/home/CtaBand";
import PropertyWrapper from "@/components/platform/home/featuredProperties/PropertyWrapper";
import HeroSection from "@/components/platform/home/heroSection/HeroSection";
import DashboardTemplate from "@/components/platform/home/howItWorks/DashboardTemplate";
import ListWrapper from "@/components/platform/home/PropertyList";
import RoleCardWrapper from "@/components/platform/home/roles/RoleCardWrapper";
import SectionContainer from "@/components/platform/home/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("public.home.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

async function HomePage() {
  const t = await getTranslations("public.home");

  return (
    <main className="min-h-screen w-full bg-white">
      <SectionContainer className="mx-auto max-w-7xl">
        <HeroSection />
      </SectionContainer>

      <hr className="my-12 border-line lg:my-20" />

      <SectionContainer className="mx-auto max-w-7xl">
        <PropertyWrapper />
        <CtaBand />
      </SectionContainer>

      <hr className="my-12 border-line lg:my-20" />

      <SectionContainer className="mx-auto max-w-7xl">
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle
              title={t("landlordShowcase.title")}
              className="lg:text-4xl"
              descriptionClassName="mt-2 mb-6 lg:mb-8"
              description={t("landlordShowcase.description")}
            />
            <ListWrapper />
          </div>
          <DashboardTemplate />
        </div>
      </SectionContainer>

      <hr className="mt-8 border-transparent lg:mt-20" />

      <SectionContainer className="bg-surface py-12 lg:py-20">
        <HeaderSection
          subTitle={t("zoeSection.subTitle")}
          Title={t("zoeSection.title")}
        >
          <p className="text-base text-body">{t("zoeSection.description")}</p>
        </HeaderSection>
        <SectionContainer className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ChatBox />
          <WorkingProcess />
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
        <HeaderSection
          subTitle={t("rolesSection.subTitle")}
          Title={t("rolesSection.title")}
        />
        <RoleCardWrapper />
      </SectionContainer>
    </main>
  );
}

export default HomePage;
