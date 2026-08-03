import PropertyWrapper from "@/components/platform/home/featuredProperties/PropertyWrapper";
import Navbar from "@/components/platform/home/headerSection/Navbar";
import HeroSection from "@/components/platform/home/heroSection/HeroSection";
import SectionContainer from "@/components/platform/home/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";

function page() {
  return (
    <main className="w-full bg-white min-h-screen ">
      <SectionContainer>
        <Navbar />
        <HeroSection />
      </SectionContainer>
      <hr className="border-line my-10" />
      <SectionContainer>
        <SectionTitle
          title="Featured Properties"
          description="Verified listings available now"
        />
        <PropertyWrapper />
      </SectionContainer>
    </main>
  );
}

export default page;
