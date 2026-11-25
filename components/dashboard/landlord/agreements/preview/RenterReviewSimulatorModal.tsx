"use client";

import { useState } from "react";
import { MessageSquarePlus, PenTool } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Agreement, RenterChangeRequest } from "@/types/agreement.types";
import { SimulatorRequestChangeTab } from "./simulator/SimulatorRequestChangeTab";
import { SimulatorSignTab } from "./simulator/SimulatorSignTab";

interface Props {
  agreement: Agreement;
  isOpen: boolean;
  onClose: () => void;
  onSubmitChangeRequest: (request: RenterChangeRequest) => void;
  onSignAgreement: (signerName: string) => void;
}

export function RenterReviewSimulatorModal({
  agreement,
  isOpen,
  onClose,
  onSubmitChangeRequest,
  onSignAgreement,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.simulator");
  const [activeTab, setActiveTab] = useState<"request_change" | "sign">(
    "request_change",
  );

  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      title={t("title")}
      description={t("description", { renter: agreement.renter.name })}
      maxWidthClassName="max-w-lg"
    >
      <div className="space-y-5 text-[12.5px]">
        <div
          role="tablist"
          className="grid grid-cols-2 border border-line text-[12.5px]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "request_change"}
            onClick={() => setActiveTab("request_change")}
            className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 py-2.5 font-semibold transition-colors ${
              activeTab === "request_change"
                ? "border-ink bg-white text-ink"
                : "border-transparent bg-surface text-faint hover:text-ink"
            }`}
          >
            <MessageSquarePlus className="size-3.5" />
            <span>{t("tabRequestChanges")}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "sign"}
            onClick={() => setActiveTab("sign")}
            className={`flex cursor-pointer items-center justify-center gap-2 border-b-2 py-2.5 font-semibold transition-colors ${
              activeTab === "sign"
                ? "border-ink bg-white text-ink"
                : "border-transparent bg-surface text-faint hover:text-ink"
            }`}
          >
            <PenTool className="size-3.5" />
            <span>{t("tabSignAgreement")}</span>
          </button>
        </div>

        {activeTab === "request_change" ? (
          <SimulatorRequestChangeTab
            articles={agreement.articles}
            onClose={onClose}
            onSubmit={onSubmitChangeRequest}
          />
        ) : (
          <SimulatorSignTab
            referenceNumber={agreement.referenceNumber}
            defaultSignerName={agreement.renter.name}
            onClose={onClose}
            onSign={onSignAgreement}
          />
        )}
      </div>
    </ModalDialog>
  );
}
