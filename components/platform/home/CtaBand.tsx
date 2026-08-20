import CustomButton from "@/components/shared/CustomButton";
import Link from "next/link";

function CtaBand() {
  return (
    <div className=" pt-8 overflow-hidden">
      <div className="relative  bg-brand rounded-3xl px-10 py-16 text-center text-white">
        {/* light balloon */}
        <div className="absolute -top-25 -right-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
        <div className="absolute -bottom-45 -left-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
        <h2 className="text-3xl font-extrabold mb-3.5">
          Ready to modernize your rental business?
        </h2>
        <p className="text-surface mb-8 max-w-md mx-auto">
          Join hundreds of landlords already managing their properties on Urugo.
        </p>
        <div className="flex gap-3.5 justify-center flex-wrap">
          <Link href="/auth/signin">
            <CustomButton
              title="Get Started →"
              variant="transparentLight"
              className="bg-white hover:bg-transparent text-brand border border-line p-6"
            />
          </Link>
          <Link href="/ai-assistant">
            <CustomButton
              title="Talk to the AI Assistant"
              variant="colored"
              className="bg-white/10 border border-white p-6"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CtaBand;
