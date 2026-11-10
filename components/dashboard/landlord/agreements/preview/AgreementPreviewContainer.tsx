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

  const handleSubmitChangeRequest = (newRequest: RenterChangeRequest) => {
    setAgreement((prev) => ({
      ...prev,
      status: "Changes Requested",
      updatedAt: new Date().toISOString(),
      changeRequests: [...(prev.changeRequests || []), newRequest],
    }));
  };

  const handleSignAgreement = (signerName: string) => {
    setAgreement((prev) => {
      const isRenter = signerName.toLowerCase().includes(prev.renter.name.toLowerCase());
      
      if (isRenter) {
        return {
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
        };
      } else {
        return {
          ...prev,
          status: prev.renterSignature ? "Signed" : "Awaiting Renter Signature",
          updatedAt: new Date().toISOString(),
          landlordSignature: {
            signedBy: signerName,
            nationalId: prev.landlord.nationalId,
            signedAt: new Date().toISOString(),
            signatureType: "Electronic",
            ipAddress: "197.243.18.12",
          },
        };
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <AgreementPreviewHeader
        agreement={agreement}
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        onOpenRenterSimulator={() => setIsSimulatorOpen(true)}
      />

      {/* Renter Change Requests Banner */}
      {agreement.changeRequests && agreement.changeRequests.length > 0 && (
        <RenterChangeRequestBanner
          agreementId={agreement.id}
          changeRequests={agreement.changeRequests}
        />
      )}

      {/* Document View */}
      <AgreementDocumentView
        agreement={agreement}
        displayLanguage={activeLanguage}
      />

      {/* Renter Review / Signing Modal */}
      <RenterReviewSimulatorModal
        agreement={agreement}
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onSubmitChangeRequest={handleSubmitChangeRequest}
        onSignAgreement={handleSignAgreement}
      />
    </div>
  );
}
