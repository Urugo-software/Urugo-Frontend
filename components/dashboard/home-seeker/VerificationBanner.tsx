"use client";

export function VerificationBanner() {
  return (
    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-ink p-7 text-white md:flex-row">
      <div className="flex-1 text-center md:text-left">
        <h3 className="mb-1.5 text-lg font-extrabold text-white">
          Found the one? Let&apos;s get you verified.
        </h3>
        <p className="text-[13.5px] leading-relaxed text-white/70">
          To sign a lease, an admin confirms your National ID and income — this
          protects you and the landlord. It takes about a day.
        </p>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-full bg-white px-6 py-3 text-[13.5px] font-semibold text-ink transition hover:bg-surface shadow-md cursor-pointer"
      >
        Start Verification
      </button>
    </div>
  );
}
