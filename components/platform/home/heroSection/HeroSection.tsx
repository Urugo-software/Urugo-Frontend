import CustomButton from "@/components/shared/CustomButton";
import { Sparkle } from "lucide-react";
import Link from "next/link";
import HomeStasCounter from "./HomeStasCounter";
import { home_stats } from "@/data/data";
import { Fragment } from "react";

function heroSection() {
  return (
    <section>
      <div className="relative overflow-hidden w-full h-[calc(100vh-200px)] rounded-3xl mt-10 bg-linear-to-br from-brand to-[#3B82F6]  flex items-center justify-center">
        {/* light balloon */}
        <div className="absolute -top-25 -right-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
        <div className="absolute -bottom-45 -left-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
        {/* content */}
        <div className="relative z-10 text-center flex flex-col gap-4 items-center justify-center">
          <span className="text-sm w-fit border border-white/30 flex items-center gap-1 font-semibold text-white bg-white/10 px-4 py-2 rounded-full">
            <Sparkle className="animate-pulse" size={14} /> AI-Powered Rental
            Registry
          </span>
          <h1 className="max-w-3xl text-white leading-[1.05] tracking-tight text-4xl md:text-5xl font-extrabold mx-auto mb-6">
            Rwanda's rental market, finally digital.
          </h1>
          <p className="max-w-2xl text-white/80 text-md md:text-lg font-medium mx-auto mb-6">
            Urugo helps landlords collect rent online, screen tenants instantly,
            and manage every property from one dashboard — while guests chat
            with an AI assistant to find a verified home in minutes.
          </p>
          <div className="flex gap-2 md:gap-4 items-center">
            <Link href="/auth/signin">
              <CustomButton
                title="Get Started →"
                variant="light"
                className="bg-white text-brand border border-line p-6"
              />
            </Link>
            <Link href="/properties">
              <CustomButton
                title="Browse Properties"
                variant="colored"
                className="bg-white/10 border border-white p-6"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* home stats */}
      <div className="flex flex-wrap gap-8 justify-center items-center mt-10">
        {" "}
        {home_stats.map((item) => (
          <Fragment key={item.id}>
            <HomeStasCounter title={item.title} paragraph={item.paragraph} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

export default heroSection;
