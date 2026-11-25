import type { Metadata } from "next";
import FeatureCard from "@/components/platform/features/FeatureCard";
import LeftSectionHeader from "@/components/platform/features/LeftSectionHeader";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import ChatBox from "@/components/platform/home/AI-assistant/ChatBox";
import WorkingProcess from "@/components/platform/home/AI-assistant/WorkingProcess";
import SectionContainer from "@/components/platform/home/SectionContainer";
import {
  featureService,
  homeSeekerFeatures,
  landlordFeatures,
  renterFeatures,
} from "@/data/features-data";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Urugo's tools for home seekers, listing-only landlords, managed landlords, and renters.",
};

function page() {
  return (
    <section className="min-h-screen w-full bg-white">
      <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
        <HeaderSection
          subTitle="Features"
          Title="Everything you need to find a home or manage rentals."
          classNameTitle="text-3xl text-ink sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            Simple tools for home seekers browsing Rwanda rentals, landlords who
            want to list only or manage everything, and renters keeping their
            lease organized.
          </p>
        </HeaderSection>

        <nav
          aria-label="Feature categories"
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {featureService.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
            >
              {item.title}
            </a>
          ))}
        </nav>
      </SectionContainer>

      <SectionContainer
        id="landlords"
        className="mx-auto max-w-7xl scroll-mt-24 py-10 lg:pb-20"
      >
        <LeftSectionHeader
          subHeader="For Landlords"
          header="List properties yourself, or manage every rental in one dashboard."
          seeMore="Open Landlord Dashboard"
          href="/landlord"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {landlordFeatures.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
            />
          ))}
        </div>
      </SectionContainer>

      <div id="renters" className="w-full scroll-mt-24 bg-surface">
        <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
          <LeftSectionHeader
            subHeader="For Renters"
            header="Keep your lease, rent records, and repairs in one place."
            seeMore="Open Renter Dashboard"
            href="/renter"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {renterFeatures.map((item) => (
              <FeatureCard
                key={item.id}
                title={item.title}
                description={item.description}
                Icon={item.Icon}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      <SectionContainer
        id="home-seekers"
        className="mx-auto max-w-7xl scroll-mt-24 py-12 lg:py-20"
      >
        <LeftSectionHeader
          subHeader="For Home Seekers"
          header="Find available homes with clear pricing and direct contact."
          seeMore="Browse Properties"
          href="/properties"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {homeSeekerFeatures.map((item) => (
            <FeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
            />
          ))}
        </div>
      </SectionContainer>

      <div id="ai-assistant" className="w-full scroll-mt-24 bg-surface">
        <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
          <HeaderSection
            subTitle="Meet Zoe"
            Title="Helpful guidance while you search."
          >
            <p className="text-base text-body">
              Ask about neighborhoods, monthly budgets, or upfront move-in costs
              and jump straight to matching listings.
            </p>
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

export default page;
