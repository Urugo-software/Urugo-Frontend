import Badge from "@/components/platform/features/Badge";
import FeatureCard from "@/components/platform/features/FeatureCard";
import LeftSectionHeader from "@/components/platform/features/LeftSectionHeader";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import SectionContainer from "@/components/platform/home/SectionContainer";
import {
  featureService,
  landlordFeatures,
  renterFeatures,
} from "@/data/features-data";

function page() {
  return (
    <section className="min-h-screen w-full bg-white">
      <SectionContainer className="max-w-7xl mx-auto py-12 lg:py-20">
        <HeaderSection
          subTitle="FEATURES"
          Title="Everything a verified rental registry needs."
          classNameTitle="text-3xl text-ink sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          <p className="text-body text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed text-gray-600">
            Built for landlords who are tired of chasing cash, renters who
            deserve fairness, and guests who just want a home without the
            hassle.
          </p>
        </HeaderSection>
        <div className="flex flex-wrap gap-2.5 justify-center items-center mt-6">
          {featureService.map((item) => (
            <Badge key={item.id} title={item.title} />
          ))}
        </div>
      </SectionContainer>

      {/* for landlords */}
      <SectionContainer className="max-w-7xl mx-auto py-10 lg:pb-20">
        <LeftSectionHeader
          subHeader="For Landlords"
          header="Manage every property from one dashboard."
          seeMore="See the dashboards"
          href="/dashboard"
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

      {/* for renters */}
      <div className="bg-surface w-full">
        <SectionContainer className="max-w-7xl mx-auto py-10 lg:py-20">
          <LeftSectionHeader
            subHeader="For Renters"
            header="Pay easily, Build a record you can trust."
            seeMore="See the dashboards"
            href="/dashboard"
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
    </section>
  );
}

export default page;
