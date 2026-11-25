import { AgreementFinancials } from "@/types/agreement.types";
import { formatCurrencyRwf, formatDate } from "@/utils/agreement-utils";
import {
  formatAgreedDueDayDisplay,
  formatCommencementDisplay,
} from "@/utils/rent-schedule-utils";

interface Props {
  financials: AgreementFinancials;
  tenancyStartDate: string;
  tenancyEndDate?: string;
  tenancyDurationMonths?: number;
  commencementStatus?: "pending_first_payment" | "confirmed";
  firstPaymentConfirmedAt?: string;
  isKinyarwanda: boolean;
}

interface ScheduleRow {
  labelEn: string;
  labelRw: string;
  value: string;
  isBold?: boolean;
  isPending?: boolean;
  note?: string;
}

export function DocumentFinancialSchedule({
  financials,
  tenancyStartDate,
  tenancyEndDate,
  tenancyDurationMonths = 12,
  commencementStatus,
  firstPaymentConfirmedAt,
  isKinyarwanda,
}: Props) {
  const lang = isKinyarwanda ? "rw" : "en";
  const commencement = formatCommencementDisplay({
    startDate: tenancyStartDate,
    commencementStatus,
    confirmedPaymentDate: firstPaymentConfirmedAt,
    language: lang,
  });

  const hasOtherCharges = (financials.otherChargesRwf ?? 0) > 0;
  const computedInitialTotal =
    financials.totalAdvanceRwf +
    financials.securityDepositRwf +
    (financials.otherChargesRwf ?? 0);

  const scheduleRows: ScheduleRow[] = [
    {
      labelEn: "Lease Commencement Date",
      labelRw: "Itariki yo Gutangira",
      value: commencement.display,
      isPending: commencement.isPending,
    },
    ...(tenancyEndDate
      ? [
          {
            labelEn: "Scheduled Lease End Date",
            labelRw: "Itariki yo Kurangiriraho",
            value: formatDate(tenancyEndDate, lang),
          },
        ]
      : []),
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
      value: formatAgreedDueDayDisplay(financials.paymentDueDay, lang),
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
    ...(hasOtherCharges
      ? [
          {
            labelEn: "Other Initial Charges",
            labelRw: "Andi Mafarangay'Intangiriro",
            value: formatCurrencyRwf(financials.otherChargesRwf ?? 0),
          },
        ]
      : []),
    {
      labelEn: "Total Initial Amount Due",
      labelRw: "Amafaranga Yose yo Gutangira",
      value: formatCurrencyRwf(
        financials.totalInitialAmountRwf || computedInitialTotal,
      ),
      isBold: true,
      note: hasOtherCharges
        ? isKinyarwanda
          ? "(Ubukode bw'integuza + Ingwate y'inzu + Andi mafarangay'intangiriro)"
          : "(Advance rent + Security deposit + Other initial charges)"
        : isKinyarwanda
          ? "(Ubukode bw'integuza + Ingwate y'inzu)"
          : "(Advance rent + Security deposit)",
    },
  ];

  return (
    <section className="mb-8 text-[12.5px] break-inside-avoid">
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-wider text-ink">
        {isKinyarwanda
          ? "Imbonerahamwe y'Iby'Ingenzi by'Ubukode n'Ubwishyu"
          : "Summary of Lease Terms & Financial Schedule"}
      </h2>

      <div className="border border-zinc-300">
        <table className="w-full border-collapse text-left text-[12.5px]">
          <tbody>
            {scheduleRows.map((row, idx) => (
              <tr
                key={row.labelEn}
                className={
                  idx !== scheduleRows.length - 1
                    ? "border-b border-zinc-200"
                    : ""
                }
              >
                <td className="w-5/12 border-r border-zinc-200 bg-zinc-50/50 px-3 py-2.5 font-medium text-body">
                  {isKinyarwanda ? row.labelRw : row.labelEn}
                </td>
                <td
                  className={`px-3 py-2.5 text-ink ${row.isBold ? "font-bold" : "font-normal"}`}
                >
                  <span className={row.isPending ? "italic text-amber-900" : ""}>
                    {row.value}
                  </span>
                  {row.note && (
                    <span className="mt-0.5 block text-[12.5px] font-normal text-faint">
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
