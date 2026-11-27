import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import FeatureCard from "@/components/platform/features/FeatureCard";
import LeftSectionHeader from "@/components/platform/features/LeftSectionHeader";
import ChatBox from "@/components/platform/home/AI-assistant/ChatBox";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import WorkingProcess from "@/components/platform/home/AI-assistant/WorkingProcess";
import SectionContainer from "@/components/platform/home/SectionContainer";
import {
  featureService,
  homeSeekerFeatures,
  landlordFeatures,
  renterFeatures,
} from "@/data/features-data";

type CategoryKey = "1" | "2" | "3" | "4";
type SixKey = "1" | "2" | "3" | "4" | "5" | "6";
type FourKey = "1" | "2" | "3" | "4";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("public.features.meta");

  return {
    title: t("title"),
    description: t("description"),
  };
}

async function FeaturesPage() {
  const t = await getTranslations("public.features");

  return (
    <section className="min-h-screen w-full bg-white">
      <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
        <HeaderSection
          subTitle={t("hero.subTitle")}
          Title={t("hero.title")}
          classNameTitle="text-3xl text-ink sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            {t("hero.description")}
          </p>
        </HeaderSection>

        <nav
          aria-label={t("hero.categoriesNavAria")}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {featureService.map((item) => {
            const key = String(item.id) as CategoryKey;
            return (
              <a
                key={item.id}
                href={item.href}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
              >
                {t(`categories.${key}`)}
              </a>
            );
          })}
        </nav>
      </SectionContainer>

      <SectionContainer
        id="landlords"
        className="mx-auto max-w-7xl  scroll-mt-24 py-10 lg:pb-20"
      >
        <LeftSectionHeader
          subHeader={t("landlords.subHeader")}
          header={t("landlords.header")}
          seeMore={t("landlords.seeMore")}
          href="/landlord"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landlordFeatures.map((item) => {
            const key = String(item.id) as SixKey;
            return (
              <FeatureCard
                key={item.id}
                title={t(`landlords.items.${key}.title`)}
                description={t(`landlords.items.${key}.description`)}
                Icon={item.Icon}
              />
            );
          })}
        </div>
      </SectionContainer>

      <div id="renters" className="w-full scroll-mt-24 bg-surface">
        <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
          <LeftSectionHeader
            subHeader={t("renters.subHeader")}
            header={t("renters.header")}
            seeMore={t("renters.seeMore")}
            href="/renter"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {renterFeatures.map((item) => {
              const key = String(item.id) as SixKey;
              return (
                <FeatureCard
                  key={item.id}
                  title={t(`renters.items.${key}.title`)}
                  description={t(`renters.items.${key}.description`)}
                  Icon={item.Icon}
                />
              );
            })}
          </div>
        </SectionContainer>
      </div>

      <SectionContainer
        id="home-seekers"
        className="mx-auto max-w-7xl scroll-mt-24 py-12 lg:py-20"
      >
        <LeftSectionHeader
          subHeader={t("homeSeekers.subHeader")}
          header={t("homeSeekers.header")}
          seeMore={t("homeSeekers.seeMore")}
          href="/properties"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {homeSeekerFeatures.map((item) => {
            const key = String(item.id) as FourKey;
            return (
              <FeatureCard
                key={item.id}
                title={t(`homeSeekers.items.${key}.title`)}
                description={t(`homeSeekers.items.${key}.description`)}
                Icon={item.Icon}
              />
            );
          })}
        </div>
      </SectionContainer>

      <div id="ai-assistant" className="w-full scroll-mt-24 bg-surface">
        <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
          <HeaderSection subTitle={t("zoe.subTitle")} Title={t("zoe.title")}>
            <p className="text-base text-body">{t("zoe.description")}</p>
          </HeaderSection>
          <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <ChatBox />
            <WorkingProcess />
          </div>
        </SectionContainer>
      </div>
    </section>
  );
}

export default FeaturesPage;
