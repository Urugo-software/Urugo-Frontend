import Link from "next/link";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { LandlordRenter } from "@/types/landlord";
import { formatRwf } from "@/utils/format";

interface RentersTableProps {
  renters: LandlordRenter[];
  emptyAction?: React.ReactNode;
}

export function RentersTable({ renters, emptyAction }: RentersTableProps) {
  if (renters.length === 0) {
    return (
      <EmptyStateBox
        icon={Users}
        title="No renters match your criteria"
        description="Try adjusting your search query or filters, or register a new renter."
        action={emptyAction}
      />
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-x-auto border border-line bg-white shadow-2xs md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface/60 text-xs font-semibold uppercase tracking-wider text-faint">
              <th scope="col" className="px-4 py-3.5">Renter</th>
              <th scope="col" className="px-4 py-3.5">Property & Unit</th>
              <th scope="col" className="px-4 py-3.5">Tenancy</th>
              <th scope="col" className="px-4 py-3.5">Monthly Rent</th>
              <th scope="col" className="px-4 py-3.5">Payment</th>
              <th scope="col" className="px-4 py-3.5">Lease Period</th>
              <th scope="col" className="px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {renters.map((renter) => (
              <tr
                key={renter.id}
                className="transition-colors hover:bg-surface/40"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1.5 font-semibold text-ink">
                    <span>{renter.name}</span>
                    {renter.isIdentityVerified && (
                      <ShieldCheck
                        aria-label="Verified identity"
                        className="size-4 shrink-0 text-emerald-600"
                      />
                    )}
                  </div>
                  <p className="text-xs text-faint">{renter.phone}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-medium text-ink">{renter.propertyName}</p>
                  <p className="text-xs text-faint">Unit {renter.unitNumber}</p>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge
                    label={renter.tenancyStatus}
                    tone={
                      renter.tenancyStatus === "Active"
                        ? "success"
                        : renter.tenancyStatus === "Ending"
                          ? "warning"
                          : "neutral"
                    }
                  />
                </td>
                <td className="px-4 py-3.5 font-ibm font-semibold text-ink whitespace-nowrap">
                  {formatRwf(renter.monthlyRentRwf)}
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge
                    label={renter.paymentStatus}
                    tone={
                      renter.paymentStatus === "Paid"
                        ? "success"
                        : renter.paymentStatus === "Pending"
                          ? "warning"
                          : "danger"
                    }
                  />
                </td>
                <td className="px-4 py-3.5 text-xs text-body whitespace-nowrap">
                  <p>{renter.startDate}</p>
                  {renter.endDate && (
                    <p className="text-faint">Ends {renter.endDate}</p>
                  )}
                </td>
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <Link
                    href={`/landlord/renters/${renter.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline"
                  >
                    <span>View</span>
                    <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {renters.map((renter) => (
          <Link
            key={renter.id}
            href={`/landlord/renters/${renter.id}`}
            className="block space-y-3 border border-line bg-white p-4 shadow-2xs transition-colors hover:border-ink/30"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-bold text-ink">
                    {renter.name}
                  </span>
                  {renter.isIdentityVerified && (
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-4 shrink-0 text-emerald-600"
                    />
                  )}
                </div>
                <p className="truncate text-xs text-faint">
                  {renter.propertyName} · Unit {renter.unitNumber}
                </p>
              </div>
              <StatusBadge
                label={renter.tenancyStatus}
                tone={
                  renter.tenancyStatus === "Active"
                    ? "success"
                    : renter.tenancyStatus === "Ending"
                      ? "warning"
                      : "neutral"
                }
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-2.5 text-xs">
              <span className="font-ibm font-bold text-ink">
                {formatRwf(renter.monthlyRentRwf)}
              </span>
              <StatusBadge
                label={renter.paymentStatus}
                tone={
                  renter.paymentStatus === "Paid"
                    ? "success"
                    : renter.paymentStatus === "Pending"
                      ? "warning"
                      : "danger"
                }
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
