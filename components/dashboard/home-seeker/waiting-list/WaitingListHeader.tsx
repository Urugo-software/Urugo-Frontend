"use client";

import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";

export function WaitingListHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <h1 className="text-[26px] sm:text-[28px] font-extrabold text-ink">
          Waiting List
        </h1>
        <Link href="/properties">
          <CustomButton
            variant="light"
            title="Browse Properties"
            className="text-[13.5px] px-5 py-2.5 rounded-[10px]"
          />
        </Link>
      </div>
      <p className="text-[14px] text-body">
        Properties you&apos;re waiting on, in the order you joined.
      </p>
    </div>
  );
}
