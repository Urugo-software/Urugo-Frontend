"use client";

import Link from "next/link";
import { CreditCard } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import type { RenterPayment } from "@/types/renter";

interface Props {
  payment?: RenterPayment;
}

export function PaymentStatusOverviewCard({ payment }: Props) {
  const t = useTranslations("renter.payments.overviewCard");
  const locale = useLocale() as AppLocale;

  if (!payment) return null;

  const isPending =
    payment.status === "Pending" || payment.status === "Overdue";
  const tone =
    payment.status === "Paid"
      ? "success"
      : payment.status === "Overdue"
        ? "danger"
        : "warning";

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 border border-line bg-white p-5 shadow-2xs sm:p-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("currentRent", { period: payment.period })}
          </span>
          <StatusBadge label={payment.status} tone={tone} className="text-sm" />
        </div>

        <div className="font-ibm text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {formatRwfLocalized(payment.amountRwf, locale)}
        </div>

        <p className="text-xs text-body">
          {isPending ? t("dueDate") : t("paidOn")}{" "}
          <span className="font-semibold text-ink">
            {isPending ? payment.dueDate : payment.paidAt ?? payment.dueDate}
          </span>
          {payment.referenceNumber &&
            ` · ${t("refPrefix", { reference: payment.referenceNumber })}`}
        </p>
      </div>

      {isPending && (
        <Link
          href="/renter/payments/pay-rent"
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-10 rounded-none px-5 text-sm font-semibold",
          )}
        >
          <CreditCard aria-hidden="true" className="size-4" />
          {t("payRentNow")}
        </Link>
      )}
    </section>
  );
}
