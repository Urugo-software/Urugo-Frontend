import Link from "next/link";
import type { Agreement } from "@/types/agreement.types";
import { formatDate } from "@/utils/agreement-utils";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { AgreementRowActions } from "./AgreementRowActions";

interface AgreementTableProps {
  agreements: Agreement[];
}

const COLUMNS = [
  { label: "Agreement", align: "text-left" },
  { label: "Property", align: "text-left" },
  { label: "Status", align: "text-left" },
  { label: "Last Updated", align: "text-left" },
  { label: "Actions", align: "text-right" },
] as const;

export function AgreementTable({ agreements }: AgreementTableProps) {
  return (
    <div className="hidden overflow-x-auto border border-line bg-white shadow-2xs md:block">
      <table className="w-full text-left">
        <thead className="border-b border-line bg-surface">
          <tr>
            {COLUMNS.map(({ label, align }) => (
              <th
                key={label}
                className={`px-5 py-4 text-[13px] font-semibold uppercase tracking-wider text-faint ${align}`}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {agreements.map((agreement) => (
            <tr
              key={agreement.id}
              className="transition-colors duration-150 hover:bg-surface/60"
            >
              <td className="px-5 py-4.5">
                <Link
                  href={`/landlord/agreements/${agreement.id}`}
                  className="block text-[15px] font-semibold text-ink hover:underline"
                >
                  {agreement.renter.name}
                </Link>
                <span className="mt-0.5 block font-ibm text-[13px] text-faint">
                  {agreement.referenceNumber}
                </span>
              </td>

              <td className="px-5 py-4.5">
                <span className="block text-[15px] font-medium text-ink">
                  {agreement.property.name}
                </span>
                <span className="mt-0.5 block text-[13.5px] text-body">
                  Unit {agreement.property.unitNumber} &middot;{" "}
                  {agreement.property.district}
                </span>
              </td>

              <td className="px-5 py-4.5">
                <AgreementStatusBadge
                  status={agreement.status}
                  showDot={false}
                  className="text-[14.5px]"
                />
              </td>

              <td className="px-5 py-4.5">
                <span className="block text-[14.5px] font-medium text-body">
                  {formatDate(agreement.updatedAt)}
                </span>
              </td>

              <td className="px-5 py-4.5 text-right">
                <AgreementRowActions agreement={agreement} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
