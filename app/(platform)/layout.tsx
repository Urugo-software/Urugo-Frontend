import { AIWidget } from "@/components/platform/ai-assistant/AIWidget";
import FooterSection from "@/components/platform/home/FooterSection";
import SectionContainer from "@/components/platform/home/SectionContainer";
import NavbarWrapper from "@/components/platform/layout/NavbarWrapper";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SectionContainer className=" sticky top-3 z-30 max-w-7xl mx-auto">
        <NavbarWrapper />
      </SectionContainer>
      {children}
      <AIWidget />
      <FooterSection />
    </main>
  );
}

export default layout;
