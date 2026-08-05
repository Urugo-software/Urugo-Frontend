import FooterSection from "@/components/platform/home/FooterSection";
import Navbar from "@/components/platform/home/headerSection/Navbar";
import SectionContainer from "@/components/platform/home/SectionContainer";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SectionContainer className=" sticky top-3 z-10 max-w-7xl mx-auto">
        <Navbar />
      </SectionContainer>
      {children}
      <FooterSection />
    </main>
  );
}

export default layout;
