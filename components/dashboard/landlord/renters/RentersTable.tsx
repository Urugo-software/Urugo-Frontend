import Link from "next/link";
import { LandlordRenter } from "@/types/landlord";

interface RentersTableProps {
  renters: LandlordRenter[];
}

export function RentersTable({ renters }: RentersTableProps) {
  if (renters.length === 0) {
    return (
      <div className="border border-line bg-white p-10 text-center shadow-2xs">
        <h3 className="text-base font-bold text-ink">No renters found</h3>
        <p className="mt-2 text-sm text-body">
          There are no renters matching your filter criteria.
        </p>
      </div>
    );
  }

  const statusStyle = {
    Active: "bg-brand-tint text-brand border-blue-200",
    Ending: "bg-amber-50 text-amber-700 border-amber-200",
    Closed: "bg-surface text-faint border-line",
  };

  const paymentStyle = {
    Paid: "bg-brand-tint text-brand border-blue-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Overdue: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="overflow-x-auto border border-line bg-white shadow-2xs">
      <table className="w-full text-left">
        <thead className="border-b border-line bg-surface">
          <tr>
            {["Renter", "Property", "Tenancy Status", "Monthly Rent", "Payment Status", "Actions"].map((h) => (
              <th
                key={h}
                className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {renters.map((renter) => (
            <tr key={renter.id} className="hover:bg-surface/60 transition-colors duration-150">
              <td className="px-5 py-4">
                <span className="text-sm font-semibold text-ink block">{renter.name}</span>
                <span className="text-xs text-faint block mt-0.5">{renter.phone}</span>
              </td>
              <td className="px-5 py-4">
                <span className="text-sm font-medium text-ink block">{renter.propertyName}</span>
                <span className="text-xs text-faint block mt-0.5">Unit {renter.unitNumber}</span>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold border ${statusStyle[renter.tenancyStatus]}`}>
                  {renter.tenancyStatus}
                </span>
              </td>
              <td className="px-5 py-4">
                <span className="text-sm font-semibold text-ink">
                  {renter.monthlyRentRwf.toLocaleString()} RWF
                </span>
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold border ${paymentStyle[renter.paymentStatus]}`}>
                  {renter.paymentStatus}
                </span>
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/landlord/renters/${renter.id}`}
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/landlord/tenancies/${renter.id}`}
                    className="text-xs font-semibold text-faint hover:text-ink hover:underline"
                  >
                    Tenancy
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
