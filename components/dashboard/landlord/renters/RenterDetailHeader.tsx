import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  PaymentStatusBadge,
  TenancyStatusBadge,
} from "@/components/dashboard/landlord/tenancies/StatusBadges";
import type { LandlordRenter } from "@/types/landlord";
import { formatCurrencyRwf } from "@/utils/agreement-utils";

interface RenterDetailHeaderProps {
  renter: LandlordRenter;
}

export function RenterDetailHeader({ renter }: RenterDetailHeaderProps) {
  return (
    <section className="space-y-5 border border-line bg-white p-6 shadow-2xs">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="flex min-w-0 items-center gap-4">
          <UserAvatar
            src={renter.avatar}
            name={renter.name}
            className="size-16 sm:size-20"
          />

          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-xl font-bold text-ink sm:text-2xl">
                {renter.name}
              </h1>
              {renter.isIdentityVerified && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-success">
                  <ShieldCheck aria-hidden="true" className="size-4" />
                  Verified
                </span>
              )}
            </div>

            <p className="inline-flex items-center gap-1.5 text-sm text-body">
              <Phone aria-hidden="true" className="size-4 text-faint" />
              <span>{renter.phone}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              Tenancy Status
            </span>
            <div className="mt-1">
              <TenancyStatusBadge status={renter.tenancyStatus} />
            </div>
          </div>
          <div>
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              Monthly Rent
            </span>
            <span className="mt-1 block font-ibm text-base font-bold text-brand">
              {formatCurrencyRwf(renter.monthlyRentRwf)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-4 text-sm text-body">
        <div>
          Property:{" "}
          {renter.propertyId ? (
            <Link
              href={`/landlord/tenancies?property=${encodeURIComponent(renter.propertyId)}`}
              className="font-semibold text-ink hover:text-brand hover:underline"
            >
              {renter.propertyName} · Unit {renter.unitNumber}
            </Link>
          ) : (
            <strong className="font-semibold text-ink">
              {renter.propertyName} · Unit {renter.unitNumber}
            </strong>
          )}
        </div>
        <div>
          Started:{" "}
          <strong className="font-semibold text-ink">{renter.startDate}</strong>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span>Payment:</span>
          <PaymentStatusBadge status={renter.paymentStatus} />
        </div>
      </div>
    </section>
  );
}
