import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RenterElectricity } from "@/types/renter";

export function RenterElectricitySummaryCard({
  electricity,
}: {
  electricity?: RenterElectricity;
}) {
  if (!electricity || !electricity.isConfigured) return null;

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-faint uppercase tracking-wider">
          Electricity Usage
        </span>
      </div>
      <div className="my-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-ink">
            {electricity.currentKwh} kWh
          </span>
          <div className="inline-flex dark:bg-transparent items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-green-50  text-green-600">
            <span>{electricity.percentUsed}% of Limit</span>
          </div>
        </div>
        <p className="text-[12.5px] mt-2 text-body mt-1">
          {electricity.statusMessage}
        </p>
      </div>
      <Link
        href="/renter/electricity"
        className="flex items-center duration-300 justify-between pt-2 text-[12px] hover:font-semibold text-gray-400 hover:text-brand hover:underline"
      >
        <span>Usage Breakdown</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
