import SectionContainer from "@/components/platform/home/SectionContainer";
import LeftSide from "@/components/platform/properties/LeftSide";
import RightSide from "@/components/platform/properties/RightSide";

function page() {
  return (
    <section className=" w-full min-h-screen ">
      <SectionContainer className="max-w-7xl  mx-auto py-10 lg:py-18 max-md:flex-col flex gap-6">
        {/* left side */}
        <LeftSide />
        {/* right side */}
        <RightSide />
      </SectionContainer>
    </section>
  );
}

export default page;
