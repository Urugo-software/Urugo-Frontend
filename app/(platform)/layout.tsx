import { AIWidget } from "@/components/platform/ai-assistant/AIWidget";
import FooterSection from "@/components/platform/home/FooterSection";
import SectionContainer from "@/components/platform/home/SectionContainer";
import NavbarWrapper from "@/components/platform/layout/NavbarWrapper";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <div className="bg-white sticky top-0 z-30 w-full">
        <SectionContainer className="pt-3 md:pb-1  max-w-7xl mx-auto">
          <NavbarWrapper />
        </SectionContainer>
      </div>
      {children}
      <SectionContainer className="sticky bottom-3 z-30 max-w-7xl mx-auto">
        <AIWidget />
      </SectionContainer>
      <FooterSection />
    </main>
  );
}

export default layout;
