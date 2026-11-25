"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export function PayRentHeader() {
  const t = useTranslations("renter.payments.payRent");

  return (
    <div>
      <Link
        href="/renter/payments"
        className="inline-flex items-center gap-2 text-xs font-semibold text-body hover:text-brand transition-colors mb-3"
      >
        <ArrowLeft className="size-4" />
        {t("backToPayments")}
      </Link>
      <h2 className="text-xl font-bold text-ink sm:text-2xl">{t("title")}</h2>
      <p className="text-sm text-body mt-1">{t("subtitle")}</p>
    </div>
  );
}
