import type { Metadata } from "next";
import DashboardTemplate from "@/components/platform/home/howItWorks/DashboardTemplate";
import PropertyWrapper from "@/components/platform/home/featuredProperties/PropertyWrapper";
import HeroSection from "@/components/platform/home/heroSection/HeroSection";
import ListWrapper from "@/components/platform/home/PropertyList";
import SectionContainer from "@/components/platform/home/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import ChatBox from "@/components/platform/home/AI-assistant/ChatBox";
import WorkingProcess from "@/components/platform/home/AI-assistant/WorkingProcess";
import RoleCardWrapper from "@/components/platform/home/roles/RoleCardWrapper";
import CtaBand from "@/components/platform/home/CtaBand";

export const metadata: Metadata = {
  title: "Urugo — Find a Home & Manage Rentals in Rwanda",
  description:
    "Search rental homes across Rwanda, request viewings, or list and manage your rental properties from move-in to move-out.",
};

function page() {
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
              title="Built for every landlord - list only or manage everything."
              className="lg:text-4xl"
              descriptionClassName="mt-2 mb-6 lg:mb-8"
              description="Publish your properties and handle inquiries independently, or turn on full rental management for leases, rent payments, and tenants."
            />
            <ListWrapper />
          </div>
          <DashboardTemplate />
        </div>
      </SectionContainer>

      <hr className="mt-8 border-transparent lg:mt-20" />

      <SectionContainer className="bg-surface py-12 lg:py-20">
        <HeaderSection
          subTitle="Meet Zoe"
          Title="Ask questions while you search."
        >
          <p className="text-base text-body">
            Describe your budget and preferred area in plain language to get
            quick home suggestions and move-in cost guidance.
          </p>
        </HeaderSection>
        <SectionContainer className="mx-auto mt-10 grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <ChatBox />
          <WorkingProcess />
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="mx-auto max-w-7xl py-12 lg:py-20">
        <HeaderSection
          subTitle="One platform for every stage"
          Title="Built for home seekers, landlords, and renters."
        />
        <RoleCardWrapper />
      </SectionContainer>
    </main>
  );
}

export default page;
