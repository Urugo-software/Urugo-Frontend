import Link from "next/link";
import { Compass, CreditCard } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getGreetingByHour } from "@/utils/renter-helpers";

interface RenterGreetingHeaderProps {
  name: string;
  avatar?: string;
  unitNumber: string;
  propertyName: string;
  hasPendingRent: boolean;
}

export function RenterGreetingHeader({
  name,
  avatar,
  unitNumber,
  propertyName,
  hasPendingRent,
}: RenterGreetingHeaderProps) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <div className="mb-6 flex flex-col justify-between gap-4 border border-line bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <UserAvatar src={avatar} name={name} className="size-14 sm:size-16" />
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {getGreetingByHour()}, {firstName}
          </h2>
          <p className="mt-0.5 truncate text-sm text-body">
            {propertyName} &middot;{" "}
            <span className="font-semibold text-ink">Unit {unitNumber}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {hasPendingRent && (
          <Link
            href="/renter/payments/pay-rent"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-9 rounded-none px-4 text-xs font-semibold",
            )}
          >
            <CreditCard aria-hidden="true" className="size-4" />
            Pay Rent Now
          </Link>
        )}
        <Link
          href="/renter/explore"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-9 rounded-none px-4 text-xs font-semibold",
          )}
        >
          <Compass aria-hidden="true" className="size-4" />
          Explore Homes
        </Link>
      </div>
    </div>
  );
}
