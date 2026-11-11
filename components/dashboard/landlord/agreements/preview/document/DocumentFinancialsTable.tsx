"use client";

import { AgreementFinancials, AgreementProperty } from "@/types/agreement.types";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";

interface Props {
  property: AgreementProperty;
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyDurationMonths?: number;
  isKinyarwanda: boolean;
}

export function DocumentFinancialsTable({
  property,
  financials,
  tenancyStartDate,
  tenancyDurationMonths,
  isKinyarwanda,
}: Props) {
  return (
    <section className="mb-8 space-y-3 break-inside-avoid text-[12.5px]">
      <h3 className="text-[13px] font-bold uppercase tracking-wider text-ink border-b border-line pb-1.5 flex items-center justify-between">
        <span>
          {isKinyarwanda
            ? "2. Ibiranga Inzu n'Imiterere y'Ubwishyu"
            : "2. Premises & Tenancy Financial Schedule"}
        </span>
        <span className="text-[12.5px] text-faint font-normal font-mono">
          {property.name} &middot; Unit {property.unitNumber}
        </span>
      </h3>

      <div className="overflow-x-auto border border-line">
        <table className="w-full text-left text-[13px] border-collapse">
          <tbody>
            <tr className="border-b border-line bg-surface/30">
              <td className="p-3 font-semibold text-faint w-1/3">
                {isKinyarwanda ? "Inzu Ikodeshwa / Umuturirwa" : "Premises / Unit Identification"}
              </td>
              <td className="p-3 font-medium text-ink w-2/3">
                {property.name}, Unit {property.unitNumber} ({property.propertyType})
              </td>
            </tr>
            <tr className="border-b border-line">
              <td className="p-3 font-semibold text-faint">
                {isKinyarwanda ? "Aderesi n'Akarere" : "Location & District"}
              </td>
              <td className="p-3 font-medium text-ink">
                {property.address}, {property.district}
              </td>
            </tr>
            <tr className="border-b border-line bg-surface/30">
              <td className="p-3 font-semibold text-faint">
                {isKinyarwanda ? "Itariki yo Gutangira" : "Commencement Date & Term"}
              </td>
              <td className="p-3 font-medium text-ink">
                {formatDate(tenancyStartDate)} ({tenancyDurationMonths ?? 12}{" "}
                {isKinyarwanda ? "Amezi" : "Months"})
              </td>
            </tr>
            <tr className="border-b border-line">
              <td className="p-3 font-semibold text-faint">
                {isKinyarwanda ? "Ubukode bwa Buri Kwezi" : "Monthly Agreed Rent"}
              </td>
              <td className="p-3 font-bold text-ink">
                {formatCurrencyRwf(financials.monthlyRentRwf)}
              </td>
            </tr>
            <tr className="border-b border-line bg-surface/30">
              <td className="p-3 font-semibold text-faint">
                {isKinyarwanda ? "Umunsi wo Kwishyura" : "Rent Due Day"}
              </td>
              <td className="p-3 font-medium text-ink">
                {isKinyarwanda
                  ? `Mbere y'itariki ya ${financials.paymentDueDay} ya buri kwezi`
                  : `On or before the ${financials.paymentDueDay}th day of each calendar month`}
              </td>
            </tr>
            <tr className="border-b border-line">
              <td className="p-3 font-semibold text-faint">
                {isKinyarwanda ? "Ingwate y'Ubukode" : "Security Deposit"}
              </td>
              <td className="p-3 font-medium text-ink">
                {formatCurrencyRwf(financials.securityDepositRwf)}
              </td>
            </tr>
            <tr className="bg-surface/50 font-semibold">
              <td className="p-3 font-bold text-ink">
                {isKinyarwanda ? "Amafaranga Yose yo Gutangira" : "Total Initial Payment Due"}
              </td>
              <td className="p-3 font-bold text-ink">
                {formatCurrencyRwf(financials.totalInitialAmountRwf)}
                <span className="text-[12.5px] font-normal text-faint block mt-0.5">
                  ({financials.advanceMonths} {isKinyarwanda ? "amezi y'integuza" : "month(s) advance"} + {isKinyarwanda ? "ingwate" : "deposit"})
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
