"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import type { Agreement } from "@/types/agreement.types";
import { AgreementStatusBadge } from "../AgreementStatusBadge";
import { AgreementRowActions } from "./AgreementRowActions";

interface AgreementTableProps {
  agreements: Agreement[];
}

const COLUMNS = [
  { key: "agreement", align: "text-left" },
  { key: "property", align: "text-left" },
  { key: "status", align: "text-left" },
  { key: "lastUpdated", align: "text-left" },
  { key: "actions", align: "text-right" },
] as const;

export function AgreementTable({ agreements }: AgreementTableProps) {
  const t = useTranslations("landlord.agreements.list");
  const locale = useLocale() as AppLocale;

  return (
    <div className="hidden overflow-x-auto border border-line bg-white shadow-2xs md:block">
      <table className="w-full text-left">
        <thead className="border-b border-line bg-surface">
          <tr>
            {COLUMNS.map(({ key, align }) => (
              <th
                key={key}
                className={`px-5 py-4 text-[13px] font-semibold uppercase tracking-wider text-faint ${align}`}
              >
                {t(`columns.${key}`)}
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
                  {t("unitLabel", { unit: agreement.property.unitNumber })}{" "}
                  &middot; {agreement.property.district}
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
                  {formatDateLocalized(agreement.updatedAt, locale)}
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
