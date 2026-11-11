"use client";

import { Agreement } from "@/types/agreement.types";
import { useAgreementPreview } from "@/hooks/useAgreementPreview";
import { AgreementPreviewHeader } from "./AgreementPreviewHeader";
import { RenterChangeRequestBanner } from "./RenterChangeRequestBanner";
import { AgreementDocumentView } from "./AgreementDocumentView";
import { AgreementDetailsSidebar } from "./AgreementDetailsSidebar";
import { LandlordSignModal } from "./LandlordSignModal";
import { RenterReviewSimulatorModal } from "./RenterReviewSimulatorModal";

interface Props {
  initialAgreement: Agreement;
}

export function AgreementPreviewContainer({ initialAgreement }: Props) {
  const {
    agreement,
    activeLanguage,
    isSimulatorOpen,
    isLandlordSignOpen,
    setActiveLanguage,
    setIsSimulatorOpen,
    setIsLandlordSignOpen,
    handleSubmitChangeRequest,
    handleLandlordSign,
    handleSignFromSimulator,
  } = useAgreementPreview(initialAgreement);

  return (
    <div className="space-y-6">
      {/* 1. Minimal Agreement Header */}
      <AgreementPreviewHeader
        agreement={agreement}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        onOpenLandlordSign={() => setIsLandlordSignOpen(true)}
        onOpenRenterSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* 2. Renter Change Request Notice Banner (if revisions requested) */}
      {agreement.status === "Changes Requested" &&
        agreement.changeRequests &&
        agreement.changeRequests.length > 0 && (
          <RenterChangeRequestBanner
            agreementId={agreement.id}
            changeRequests={agreement.changeRequests}
          />
        )}

      {/* 3. Main Workspace: Document Focus (left) + Compact Sidebar (right) */}
      <div className="flex flex-col lg:flex-row items-start gap-8 print:block">
        {/* Main Document Area */}
        <main className="w-full lg:flex-1 min-w-0 print:block print:w-full">
          <AgreementDocumentView
            agreement={agreement}
            displayLanguage={activeLanguage}
            onLanguageChange={setActiveLanguage}
          />
        </main>

        {/* Agreement Information & Activity Sidebar */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0 print:hidden">
          <div className="lg:sticky lg:top-4">
            <AgreementDetailsSidebar
              agreement={agreement}
              onOpenLandlordSign={() => setIsLandlordSignOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* 4. Modals */}
      <LandlordSignModal
        agreement={agreement}
        isOpen={isLandlordSignOpen}
        onClose={() => setIsLandlordSignOpen(false)}
        onSign={handleLandlordSign}
      />

      <RenterReviewSimulatorModal
        agreement={agreement}
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSubmitChangeRequest={handleSubmitChangeRequest}
        onSignAgreement={handleSignFromSimulator}
      />
    </div>
  );
}
