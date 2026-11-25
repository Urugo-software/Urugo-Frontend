"use client";

import { CheckCircle2, Clock, PenTool } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized } from "@/i18n/formatting";
import { AgreementParty, AgreementSignature } from "@/types/agreement.types";

interface Props {
  renter: AgreementParty;
  landlord: AgreementParty;
  renterSignature?: AgreementSignature;
  landlordSignature?: AgreementSignature;
  isAwaitingLandlord: boolean;
  onOpenLandlordSign?: () => void;
}

export function SidebarSigningProgressCard({
  renter,
  landlord,
  renterSignature,
  landlordSignature,
  isAwaitingLandlord,
  onOpenLandlordSign,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.sidebar");
  const locale = useLocale() as AppLocale;

  return (
    <div className="space-y-3.5 border border-line bg-white p-5 text-[12.5px]">
      <h3 className="border-b border-line pb-2.5 font-semibold uppercase tracking-wider text-faint">
        {t("signingProgress")}
      </h3>

      <div className="space-y-3 text-[13px]">
        {/* Renter Signature Row */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <span className="block text-[13px] font-semibold text-ink">
              {renter.name}
            </span>
            <span className="text-[12.5px] text-faint">{t("renterRole")}</span>
          </div>
          <div className="text-right">
            {renterSignature ? (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-700">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span>
                  {t("signedOn", {
                    date: formatDateLocalized(renterSignature.signedAt, locale),
                  })}
                </span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-amber-700">
                <Clock className="size-3.5 shrink-0" />
                <span>{t("pending")}</span>
              </span>
            )}
          </div>
        </div>

        {/* Landlord Signature Row */}
        <div className="flex items-start justify-between gap-3 border-t border-line/60 pt-2.5">
          <div className="space-y-0.5">
            <span className="block text-[13px] font-semibold text-ink">
              {landlord.name}
            </span>
            <span className="text-[12.5px] text-faint">
              {t("landlordRole")}
            </span>
          </div>
          <div className="text-right">
            {landlordSignature ? (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-emerald-700">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span>
                  {t("signedOn", {
                    date: formatDateLocalized(
                      landlordSignature.signedAt,
                      locale,
                    ),
                  })}
                </span>
              </span>
            ) : isAwaitingLandlord ? (
              <button
                type="button"
                onClick={onOpenLandlordSign}
                className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-semibold text-amber-800 underline hover:text-black"
              >
                <PenTool className="size-3.5 shrink-0" />
                <span>{t("signNow")}</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-faint">
                <Clock className="size-3.5 shrink-0" />
                <span>{t("pending")}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
