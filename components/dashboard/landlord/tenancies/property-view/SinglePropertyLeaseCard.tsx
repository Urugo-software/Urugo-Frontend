import Link from "next/link";
import { ArrowRight, Calendar, Home, Phone, ShieldCheck, UserPlus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandlordRenter } from "@/types/landlord";
import { formatCurrencyRwf } from "@/utils/agreement-utils";
import { EmptyStateBox } from "../EmptyStateBox";
import { PaymentStatusBadge, TenancyStatusBadge } from "../StatusBadges";

interface SinglePropertyLeaseCardProps {
  propertyId: string;
  renter: LandlordRenter | null;
}

export function SinglePropertyLeaseCard({
  propertyId,
  renter,
}: SinglePropertyLeaseCardProps) {
  if (!renter) {
    return (
      <EmptyStateBox
        icon={Home}
        title="No active lease"
        description="This home is vacant. Add a renter to start tracking monthly rent payments."
        action={
          <Link
            href="/landlord/renters/add"
            className={cn(buttonVariants({ variant: "default" }), "rounded-none")}
          >
            <UserPlus aria-hidden="true" className="size-4" />
            Add Renter
          </Link>
        }
      />
    );
  }

  return (
    <article className="border border-line bg-white shadow-2xs">
      <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <TenancyStatusBadge
              status={renter.tenancyStatus}
              label={`${renter.tenancyStatus} Lease`}
            />
            <span aria-hidden="true" className="text-line">|</span>
            <PaymentStatusBadge status={renter.paymentStatus} prefix="Rent" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-ink">{renter.name}</h3>
            {renter.isIdentityVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                <ShieldCheck aria-hidden="true" className="size-4" />
                Verified
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-body">
            <span className="inline-flex items-center gap-1.5">
              <Phone aria-hidden="true" className="size-4 text-faint" />
              {renter.phone}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar aria-hidden="true" className="size-4 text-faint" />
              Started <strong className="font-semibold text-ink">{renter.startDate}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 md:flex-col md:items-end md:border-t-0 md:pt-0">
          <div className="md:text-right">
            <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
              Monthly Rent
            </span>
            <span className="block font-ibm text-xl font-bold text-brand">
              {formatCurrencyRwf(renter.monthlyRentRwf)}
            </span>
          </div>

          <Link
            href={`/landlord/tenancies/${encodeURIComponent(renter.id)}?fromProperty=${encodeURIComponent(propertyId)}`}
            className={cn(buttonVariants({ variant: "default" }), "rounded-none")}
          >
            <span>Manage Tenancy</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
