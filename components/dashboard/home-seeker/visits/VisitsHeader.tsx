"use client";

import CustomButton from "@/components/shared/CustomButton";

export function VisitsHeader() {
  return (
    <div className="mb-7">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="text-[26px] sm:text-[28px] font-extrabold text-ink">
          Visits
        </h1>
        <CustomButton
          variant="light"
          title="Schedule a visit"
          className="text-[13.5px] px-5 py-2.5 rounded-none"
        />
      </div>
      <p className="text-[15px] text-body">
        Property visits you&apos;ve scheduled through the AI Assistant.
      </p>
    </div>
  );
}
