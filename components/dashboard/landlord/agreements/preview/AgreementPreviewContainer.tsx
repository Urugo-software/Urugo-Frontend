"use client";

import { useState } from "react";
import {
  Agreement,
  AgreementLanguage,
  RenterChangeRequest,
} from "../types/agreement.types";
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
  const [agreement, setAgreement] = useState<Agreement>(initialAgreement);
  const [activeLanguage, setActiveLanguage] = useState<AgreementLanguage>(
    initialAgreement.language
  );
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isLandlordSignOpen, setIsLandlordSignOpen] = useState(false);

  const handleSubmitChangeRequest = (newRequest: RenterChangeRequest) => {
    setAgreement((prev) => ({
      ...prev,
      status: "Changes Requested",
      updatedAt: new Date().toISOString(),
      changeRequests: [...(prev.changeRequests || []), newRequest],
    }));
  };

  const handleLandlordSign = (signerName: string) => {
    setAgreement((prev) => ({
      ...prev,
      status: "Signed",
      updatedAt: new Date().toISOString(),
      landlordSignature: {
        signedBy: signerName,
        nationalId: prev.landlord.nationalId,
        signedAt: new Date().toISOString(),
        signatureType: "Electronic",
        ipAddress: "197.243.18.12",
      },
    }));
  };

  const handleRenterSign = (signerName: string) => {
    setAgreement((prev) => ({
      ...prev,
      status: prev.landlordSignature ? "Signed" : "Awaiting Landlord Signature",
      updatedAt: new Date().toISOString(),
      renterSignature: {
        signedBy: signerName,
        nationalId: prev.renter.nationalId,
        signedAt: new Date().toISOString(),
        signatureType: "Electronic",
        ipAddress: "197.243.20.15",
      },
    }));
  };

  const handleSignFromSimulator = (signerName: string) => {
    const isLandlord = signerName
      .toLowerCase()
      .includes(agreement.landlord.name.toLowerCase());
    if (isLandlord) {
      handleLandlordSign(signerName);
    } else {
      handleRenterSign(signerName);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Minimal Agreement Header (SpotDraft style) */}
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
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Main Document Area (Visual Focus) */}
        <main className="w-full lg:flex-1 min-w-0">
          <AgreementDocumentView
            agreement={agreement}
            displayLanguage={activeLanguage}
            onLanguageChange={setActiveLanguage}
          />
        </main>

        {/* Agreement Information & Activity Sidebar (Desktop right, Mobile stacked) */}
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
