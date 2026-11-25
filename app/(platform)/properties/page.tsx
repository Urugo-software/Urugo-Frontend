import type { Metadata } from "next";
import { Suspense } from "react";
import SectionContainer from "@/components/platform/home/SectionContainer";
import LeftSide from "@/components/platform/properties/LeftSide";
import RightSide from "@/components/platform/properties/RightSide";
import SectionLoading from "@/components/shared/SectionLoading";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Search available rental homes across Rwanda by district, monthly rent, bedrooms, and amenities.",
};

function PropertiesPage() {
  return (
    <main className="min-h-screen w-full">
      <SectionContainer className="mx-auto flex max-w-7xl gap-6 py-8 max-md:flex-col lg:py-14">
        <LeftSide />
        <Suspense
          fallback={<SectionLoading message="Loading available homes..." />}
        >
          <RightSide />
        </Suspense>
      </SectionContainer>
    </main>
  );
}

export default PropertiesPage;
