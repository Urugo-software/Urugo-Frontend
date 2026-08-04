import DashboardTemplate from "@/components/platform/home/howItWorks/DashboardTemplate";
import PropertyWrapper from "@/components/platform/home/featuredProperties/PropertyWrapper";
import Navbar from "@/components/platform/home/headerSection/Navbar";
import HeroSection from "@/components/platform/home/heroSection/HeroSection";
import ListWrapper from "@/components/platform/home/PropertyList";
import SectionContainer from "@/components/platform/home/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import ChatBox from "@/components/platform/home/AI-assistant/ChatBox";
import WorkingProcess from "@/components/platform/home/AI-assistant/WorkingProcess";
import RoleCardWrapper from "@/components/platform/home/roles/RoleCardWrapper";

function page() {
  return (
    <main className="w-full bg-white min-h-screen ">
      <SectionContainer className="max-w-7xl mx-auto">
        <Navbar />
        <HeroSection />
      </SectionContainer>
      <hr className="border-line my-8 lg:my-20" />
      <SectionContainer className="max-w-7xl mx-auto">
        <SectionTitle
          title="Featured Properties"
          className="lg:text-3xl"
          descriptionClassName="mt-1"
          description="Check out our verified properties available for rent "
        />
        <PropertyWrapper />
      </SectionContainer>
      <hr className="border-line my-8 lg:my-20" />
      <SectionContainer className="max-w-7xl mx-auto">
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <SectionTitle
              title="Everything you need to manage your properties."
              className="lg:text-4xl"
              descriptionClassName="mt-2 mb-6 lg:mb-8"
              description="Stop using notebooks and Excel. One dashboard for payments, tenants, and every property you own."
            />
            <ListWrapper />
          </div>
          <DashboardTemplate />
        </div>
      </SectionContainer>
      <hr className="border-transparent mt-8 lg:mt-20" />
      <SectionContainer className="bg-surface py-10 lg:py-20">
        <HeaderSection
          subTitle="The Urugo Assistant"
          Title="One conversation. Everything a guest needs."
        >
          <p className="text-body text-base">
            No search forms, no filters to figure out. Just describe what you're
            looking for.
          </p>
        </HeaderSection>
        <SectionContainer className="max-w-7xl mx-auto grid grid-cols-1 lg:gap-12 lg:grid-cols-2 mt-10">
          <ChatBox />
          <WorkingProcess />
        </SectionContainer>
      </SectionContainer>

      {/* roles */}
      <SectionContainer className="max-w-7xl mx-auto py-10 lg:py-20">
        <HeaderSection
          subTitle="Three roles, one registry"
          Title="Everyone on Urugo is verified."
        />
        <RoleCardWrapper />
      </SectionContainer>
    </main>
  );
}

export default page;
