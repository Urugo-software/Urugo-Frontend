"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
  referenceNumber: string;
  renterName: string;
  propertyName: string;
  unitNumber: string;
}

export function SignModalLegalNotice({
  referenceNumber,
  renterName,
  propertyName,
  unitNumber,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.signModal");

  return (
    <div className="space-y-2 border border-line bg-surface/40 p-4 text-[13px] text-body">
      <div className="flex items-center gap-2 font-semibold text-ink">
        <CheckCircle2 className="size-4 text-ink" />
        <span>{t("legalNoticeTitle")}</span>
      </div>
      <p className="leading-relaxed">
        {t.rich("legalNoticeBody", {
          ref: referenceNumber,
          renter: renterName,
          property: propertyName,
          unit: unitNumber,
          strong: (chunks) => <strong className="text-ink">{chunks}</strong>,
        })}
      </p>
    </div>
  );
}
