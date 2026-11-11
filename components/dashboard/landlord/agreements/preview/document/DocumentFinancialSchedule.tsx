"use client";

import { AgreementFinancials } from "@/types/agreement.types";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";

interface Props {
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyDurationMonths?: number;
  isKinyarwanda: boolean;
}

export function DocumentFinancialSchedule({
  financials,
  tenancyStartDate,
  tenancyDurationMonths = 12,
  isKinyarwanda,
}: Props) {
  const scheduleRows = [
    {
      labelEn: "Lease Commencement Date",
      labelRw: "Itariki yo Gutangira",
      value: formatDate(tenancyStartDate),
    },
    {
      labelEn: "Lease Duration / Term",
      labelRw: "Igihe Amasezerano Azamara",
      value: `${tenancyDurationMonths} ${isKinyarwanda ? "Amezi" : "Months"}`,
    },
    {
      labelEn: "Agreed Monthly Rent",
      labelRw: "Ubukode bwa Buri Kwezi",
      value: formatCurrencyRwf(financials.monthlyRentRwf),
      isBold: true,
    },
    {
      labelEn: "Rent Payment Due Date",
      labelRw: "Itariki y'Ubwishyu ya Buri Kwezi",
      value: isKinyarwanda
        ? `Mbere y'itariki ya ${financials.paymentDueDay} ya buri kwezi`
        : `On or before the ${financials.paymentDueDay}th day of each calendar month`,
    },
    {
      labelEn: "Refundable Security Deposit",
      labelRw: "Ingwate y'Ubukode Isubizwa",
      value: formatCurrencyRwf(financials.securityDepositRwf),
    },
    {
      labelEn: "Advance Rent Payment",
      labelRw: "Ubukode bw'Integuza",
      value: `${financials.advanceMonths} ${isKinyarwanda ? "Ukwezi / Amezi" : "Month(s)"} (${formatCurrencyRwf(financials.totalAdvanceRwf)})`,
    },
    {
      labelEn: "Total Initial Amount Due",
      labelRw: "Amafaranga Yose yo Gutangira",
      value: formatCurrencyRwf(financials.totalInitialAmountRwf),
      isBold: true,
      note: isKinyarwanda
        ? "(Ubukode bw'integuza + Ingwate y'inzu)"
        : "(Advance rent + Security deposit)",
    },
  ];

  return (
    <section className="mb-8 text-[12.5px] break-inside-avoid">
      <h2 className="text-[12px] font-bold uppercase tracking-wider text-ink mb-2">
        {isKinyarwanda
          ? "Imbonerahamwe y'Iby'Ingenzi by'Ubukode n'Ubwishyu"
          : "Summary of Lease Terms & Financial Schedule"}
      </h2>

      <div className="border border-zinc-300">
        <table className="w-full text-left border-collapse text-[12.5px]">
          <tbody>
            {scheduleRows.map((row, idx) => (
              <tr
                key={idx}
                className={idx !== scheduleRows.length - 1 ? "border-b border-zinc-200" : ""}
              >
                <td className="py-2.5 px-3 text-body font-medium w-5/12 border-r border-zinc-200 bg-zinc-50/50">
                  {isKinyarwanda ? row.labelRw : row.labelEn}
                </td>
                <td className={`py-2.5 px-3 text-ink ${row.isBold ? "font-bold" : "font-normal"}`}>
                  {row.value}
                  {row.note && (
                    <span className="block text-[11.5px] text-faint font-normal mt-0.5">
                      {row.note}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
