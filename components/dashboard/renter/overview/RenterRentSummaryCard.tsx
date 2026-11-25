"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import type { RenterPayment } from "@/types/renter";

export function RenterRentSummaryCard({
  payment,
}: {
  payment?: RenterPayment;
}) {
  const t = useTranslations("renter.overview.rentCard");
  const locale = useLocale() as AppLocale;

  if (!payment) return null;

  const tone =
    payment.status === "Paid"
      ? "success"
      : payment.status === "Overdue"
        ? "danger"
        : "warning";

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-faint">
          {t("title")}
        </span>
        <StatusBadge label={payment.status} tone={tone} />
      </div>

      <div className="my-3.5">
        <div className="font-ibm text-2xl font-bold text-ink">
          {formatRwfLocalized(payment.amountRwf, locale)}
        </div>
        <p className="mt-1.5 text-xs text-body">
          {payment.status === "Paid" ? t("paidOn") : t("due")}:{" "}
          <span className="font-semibold text-ink">
            {payment.paidAt ?? payment.dueDate}
          </span>{" "}
          ({payment.period})
        </p>
      </div>

      <Link
        href={
          payment.status === "Paid"
            ? "/renter/payments"
            : "/renter/payments/pay-rent"
        }
        className="flex items-center justify-between border-t border-line pt-3 text-xs font-semibold text-brand-blue hover:underline"
      >
        <span>
          {payment.status === "Paid" ? t("viewHistory") : t("payRentNow")}
        </span>
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
