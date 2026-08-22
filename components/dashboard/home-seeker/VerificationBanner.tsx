"use client";
import CustomButton from "@/components/shared/CustomButton";

export function VerificationBanner() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-between gap-6 rounded-2xl bg-brand p-7 text-white md:flex-row">
      <div className="absolute -top-25 -right-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
      <div className="absolute -bottom-45 -left-20 bg-white/10 w-[420px] h-[420px] rounded-full" />
      <div className="flex-1 text-center md:text-left">
        <h3 className="mb-1.5 text-lg font-extrabold text-white">
          Found the one? Let&apos;s get you verified.
        </h3>
        <p className="text-[13.5px] leading-relaxed text-white/70">
          To sign a lease, an admin confirms your National ID and income — this
          protects you and the landlord. It takes about a day.
        </p>
      </div>
      <CustomButton variant="light" title="Start Verification" />
    </div>
  );
}
