import HowItWorksHeader from "@/components/platform/how-it-works/HowItWorksHeader";
import HowItWorksTabs from "@/components/platform/how-it-works/HowItWorksTabs";

export const metadata = {
  title: "How It Works | Urugo",
  description:
    "Whether you own a property, rent one, or are looking for a home, discover how Urugo works step by step.",
};

function page() {
  return (
    <main className="w-full bg-white min-h-screen">
      {/* Header Section */}
      <HowItWorksHeader />

      {/* Interactive Tabs, Step Flow, and Role Banner */}
      <HowItWorksTabs />
    </main>
  );
}

export default page;
