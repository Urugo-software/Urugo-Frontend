import React from "react";
import { Calendar } from "lucide-react";

interface LandlordGreetingHeaderProps {
  name?: string;
}

export function LandlordGreetingHeader({
  name = "Emmanuel",
}: LandlordGreetingHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink">
          Good morning, {name}
        </h1>
        <p className="mt-1.5 text-sm sm:text-[15px] text-body">
          Here is what&apos;s happening with your rental portfolio & tenancies
          today.
        </p>
      </div>
    </div>
  );
}
