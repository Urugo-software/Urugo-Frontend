"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { Agreement } from "@/types/agreement.types";
import {
  formatCommencementDisplay,
  getOrdinalSuffix,
} from "@/utils/rent-schedule-utils";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";

interface Props {
  agreement: Agreement;
  onEditTenancy?: () => void;
}

export function EditorSystemMetadataCard({ agreement, onEditTenancy }: Props) {
  const t = useTranslations("landlord.agreements.editor.metadata");
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const commencement = formatCommencementDisplay({
    startDate: agreement.tenancyStartDate,
    commencementStatus: agreement.commencementStatus,
    confirmedPaymentDate: agreement.firstPaymentConfirmedAt,
    language: locale === "rw" ? "rw" : "en",
  });
  const commencementDisplay = commencement.isPending
    ? commencement.display
    : formatDateLocalized(
        agreement.firstPaymentConfirmedAt || agreement.tenancyStartDate,
        locale,
      );

  const dueDay = agreement.financials.paymentDueDay || 1;
  const dayOrdinal =
    locale === "rw" ? String(dueDay) : `${dueDay}${getOrdinalSuffix(dueDay)}`;
  const dueDayText =
    dueDay >= 29
      ? t("dueDayMonthEnd", { dayOrdinal })
      : t("dueDayDisplay", { dayOrdinal });

  return (
    <>
      <div className="border border-line bg-surface/30 px-4 py-3.5 text-[12.5px]">
        <div className="mb-2.5 flex items-center justify-between border-b border-line pb-2">
          <span className="text-[12.5px] font-semibold uppercase tracking-wider text-ink">
            {t("title")}
          </span>
          <div className="flex items-center gap-3">
            {onEditTenancy && (
              <button
                type="button"
                onClick={onEditTenancy}
                className="cursor-pointer text-[12.5px] font-semibold text-brand underline hover:text-ink"
              >
                {t("editTenancyDetails")}
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-medium text-faint underline hover:text-ink"
            >
              <span>{t("viewDetails")}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <span className="block text-[12.5px] text-faint">{t("renter")}</span>
            <span className="block truncate text-[13px] font-medium text-ink">
              {agreement.renter.name}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              {t("propertyAndUnit")}
            </span>
            <span className="block truncate text-[13px] font-medium text-ink">
              {t("propertyUnitValue", {
                property: agreement.property.name,
                unit: agreement.property.unitNumber,
              })}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              {t("monthlyRent")}
            </span>
            <span className="text-[13px] font-medium text-ink">
              {formatRwfLocalized(agreement.financials.monthlyRentRwf, locale)}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              {t("securityDeposit")}
            </span>
            <span className="text-[13px] font-medium text-ink">
              {formatRwfLocalized(
                agreement.financials.securityDepositRwf,
                locale,
              )}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              {t("commencement")}
            </span>
            <span
              className={`text-[13px] font-medium ${commencement.isPending ? "italic text-amber-800" : "text-ink"}`}
            >
              {commencementDisplay}
            </span>
          </div>
          <div>
            <span className="block text-[12.5px] text-faint">
              {t("duration")}
            </span>
            <span className="text-[13px] font-medium text-ink">
              {t("monthsValue", {
                count: agreement.tenancyDurationMonths ?? 12,
              })}
            </span>
          </div>
        </div>
      </div>

      <ModalDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("modalTitle")}
        description={t("modalDescription", { ref: agreement.referenceNumber })}
        maxWidthClassName="max-w-lg"
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            className="h-8.5 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
          >
            {tCommon("actions.close")}
          </Button>
        }
      >
        <div className="space-y-4 text-[12.5px]">
          <div className="space-y-2">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              {t("parties")}
            </span>
            <div className="grid grid-cols-1 gap-3 border border-line bg-surface/20 p-3 sm:grid-cols-2">
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("landlord")}
                </span>
                <p className="text-[13px] font-medium text-ink">
                  {agreement.landlord.name}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {agreement.landlord.phone}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {t("idPrefix", { id: agreement.landlord.nationalId })}
                </p>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("renter")}
                </span>
                <p className="text-[13px] font-medium text-ink">
                  {agreement.renter.name}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {agreement.renter.phone}
                </p>
                <p className="font-mono text-[12.5px] text-faint">
                  {t("idPrefix", { id: agreement.renter.nationalId })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              {t("premises")}
            </span>
            <div className="space-y-1 border border-line bg-surface/20 p-3">
              <p className="text-[13px] font-medium text-ink">
                {t("premisesUnit", {
                  property: agreement.property.name,
                  unit: agreement.property.unitNumber,
                })}
              </p>
              <p className="text-faint">
                {agreement.property.address}, {agreement.property.district}
              </p>
              <p className="text-faint">
                {t("typeLabel", { type: agreement.property.propertyType })}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="block text-[12.5px] font-semibold uppercase tracking-wider text-ink">
              {t("paymentSchedule")}
            </span>
            <div className="grid grid-cols-1 gap-2 border border-line bg-surface/20 p-3 sm:grid-cols-2">
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("monthlyRentDueDate")}
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {dueDayText}
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("advancePayment")}
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {t("advanceMonthsValue", {
                    count: agreement.financials.advanceMonths,
                    amount: formatRwfLocalized(
                      agreement.financials.totalAdvanceRwf,
                      locale,
                    ),
                  })}
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("securityDeposit")}
                </span>
                <span className="text-[13px] font-medium text-ink">
                  {formatRwfLocalized(
                    agreement.financials.securityDepositRwf,
                    locale,
                  )}
                </span>
              </div>
              <div>
                <span className="block text-[12.5px] text-faint">
                  {t("totalInitialDue")}
                </span>
                <span className="text-[13px] font-semibold text-ink">
                  {formatRwfLocalized(
                    agreement.financials.totalInitialAmountRwf,
                    locale,
                  )}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[12.5px] italic text-faint">
            {t("financialsNote")}
          </p>
        </div>
      </ModalDialog>
    </>
  );
}
