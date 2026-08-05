import Badge from "@/components/platform/features/Badge";
import LeftSectionHeader from "@/components/platform/features/LeftSectionHeader";
import HeaderSection from "@/components/platform/home/AI-assistant/HeaderSection";
import SectionContainer from "@/components/platform/home/SectionContainer";
import { featureService } from "@/data/features-data";
import { Fragment } from "react";

function page() {
  return (
    <section className="min-h-screen w-full bg-white">
      <SectionContainer className="max-w-7xl mx-auto py-10 lg:py-20">
        <HeaderSection
          subTitle="FEATURES"
          Title="Everything a verified rental registry needs."
          classNameTitle="text-4xl md:text-[44px]! "
        >
          <p className="text-body text-[17px] mt-6 max-w-xl mx-auto">
            Built for landlords who are tired of chasing cash, renters who
            deserve fairness, and guests who just want a home without the
            hassle.
          </p>
        </HeaderSection>
        <div className="flex flex-wrap gap-3 justify-center my-12 0">
          {featureService.map((item) => (
            <Fragment key={item.id}>
              <Badge
                className="p-3 border-line text-gray-500 font-semibold  tracking-wide text-sm"
                title={item.title}
              />
            </Fragment>
          ))}
        </div>
        {/* for landlords */}
        <LeftSectionHeader
          subHeader="For Landlords"
          header="Manage every property from one dashboard."
          seeMore="See the dashboards"
          href="/features"
        />
      </SectionContainer>
    </section>
  );
}

export default page;
