"use client";

import { useTranslations } from "next-intl";
import { Agreement, AgreementStatus } from "@/types/agreement.types";
import { useAgreementPreview } from "@/hooks/useAgreementPreview";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { AgreementPreviewHeader } from "./AgreementPreviewHeader";
import { RenterChangeRequestBanner } from "./RenterChangeRequestBanner";
import { AgreementDocumentView } from "./AgreementDocumentView";
import { AgreementDetailsSidebar } from "./AgreementDetailsSidebar";
import { LandlordSignModal } from "./LandlordSignModal";
import { RenterReviewSimulatorModal } from "./RenterReviewSimulatorModal";

interface Props {
  initialAgreement: Agreement;
}

const SIMULATABLE_STATUSES: AgreementStatus[] = [
  "Sent",
  "Viewed",
  "Awaiting Renter Signature",
  "Changes Requested",
];

const IS_DEV = process.env.NODE_ENV === "development";

export function AgreementPreviewContainer({ initialAgreement }: Props) {
  const t = useTranslations("landlord.agreements.preview.cancelModal");
  const tStatuses = useTranslations("landlord.agreements.statuses");
  const {
    agreement,
    activeLanguage,
    isSimulatorOpen,
    isLandlordSignOpen,
    isCancelConfirmOpen,
    setActiveLanguage,
    setIsSimulatorOpen,
    setIsLandlordSignOpen,
    setIsCancelConfirmOpen,
    handleSubmitChangeRequest,
    handleLandlordSign,
    handleSendDraft,
    handleCancelAgreement,
    handleCreateRenewalDraft,
    handleSignFromSimulator,
  } = useAgreementPreview(initialAgreement);

  const canSimulateRenter =
    IS_DEV && SIMULATABLE_STATUSES.includes(agreement.status);

  return (
    <div className="space-y-6">
      <AgreementPreviewHeader
        agreement={agreement}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        onOpenLandlordSign={() => setIsLandlordSignOpen(true)}
        onSendDraft={handleSendDraft}
        onCancelAgreement={() => setIsCancelConfirmOpen(true)}
        onCreateRenewalDraft={handleCreateRenewalDraft}
        onOpenRenterSimulator={
          canSimulateRenter ? () => setIsSimulatorOpen(true) : undefined
        }
      />

      {agreement.status === "Changes Requested" &&
        agreement.changeRequests &&
        agreement.changeRequests.length > 0 && (
          <RenterChangeRequestBanner
            agreementId={agreement.id}
            changeRequests={agreement.changeRequests}
          />
        )}

      <div className="flex flex-col items-start gap-8 lg:flex-row print:block">
        <div className="w-full min-w-0 lg:flex-1 print:block print:w-full">
          <AgreementDocumentView
            agreement={agreement}
            displayLanguage={activeLanguage}
            onLanguageChange={setActiveLanguage}
          />
        </div>

        <div className="w-full shrink-0 lg:w-80 xl:w-96 print:hidden">
          <div className="lg:sticky lg:top-4">
            <AgreementDetailsSidebar
              agreement={agreement}
              onOpenLandlordSign={() => setIsLandlordSignOpen(true)}
              onSendDraft={handleSendDraft}
              onCreateRenewalDraft={handleCreateRenewalDraft}
            />
          </div>
        </div>
      </div>

      <LandlordSignModal
        agreement={agreement}
        isOpen={isLandlordSignOpen}
        onClose={() => setIsLandlordSignOpen(false)}
        onSign={handleLandlordSign}
      />

      {canSimulateRenter && (
        <RenterReviewSimulatorModal
          agreement={agreement}
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          onSubmitChangeRequest={handleSubmitChangeRequest}
          onSignAgreement={handleSignFromSimulator}
        />
      )}

      <ModalDialog
        open={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        variant="alert"
        maxWidthClassName="max-w-md"
        title={t("title")}
        description={t("description", { ref: agreement.referenceNumber })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCancelConfirmOpen(false)}
              className="h-9 cursor-pointer rounded-none border-line px-4 text-xs"
            >
              {t("keep")}
            </Button>
            <Button
              type="button"
              onClick={handleCancelAgreement}
              className="h-9 cursor-pointer rounded-none bg-red-600 px-4 text-xs font-semibold text-white hover:bg-red-700"
            >
              {t("confirm")}
            </Button>
          </>
        }
      >
        <p className="text-xs leading-relaxed text-body">
          {t.rich("body", {
            status: tStatuses("cancelled"),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </ModalDialog>
    </div>
  );
}
