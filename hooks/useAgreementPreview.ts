"use client";

import { useState, useCallback } from "react";
import {
  Agreement,
  AgreementLanguage,
  RenterChangeRequest,
} from "@/types/agreement.types";

export function useAgreementPreview(initialAgreement: Agreement) {
  const [agreement, setAgreement] = useState<Agreement>(initialAgreement);
  const [activeLanguage, setActiveLanguage] = useState<AgreementLanguage>(
    initialAgreement.language,
  );
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isLandlordSignOpen, setIsLandlordSignOpen] = useState(false);

  const handleSubmitChangeRequest = useCallback(
    (newRequest: RenterChangeRequest) => {
      setAgreement((prev) => ({
        ...prev,
        status: "Changes Requested",
        updatedAt: new Date().toISOString(),
        changeRequests: [...(prev.changeRequests || []), newRequest],
      }));
    },
    [],
  );

  const handleLandlordSign = useCallback((signerName: string) => {
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
  }, []);

  const handleRenterSign = useCallback((signerName: string) => {
    setAgreement((prev) => ({
      ...prev,
      status: prev.landlordSignature ? "Signed" : "Awaiting Landlord Signature",
      updatedAt: new Date().toISOString(),
      renterSignature: {
        signedBy: signerName,
        nationalId: prev.renter.nationalId,
        signedAt: new Date().toISOString(),
        signatureType: "Electronic",
        ipAddress: "197.243.22.84",
      },
    }));
  }, []);

  const handleSignFromSimulator = useCallback(
    (signerName: string) => {
      handleRenterSign(signerName);
      setIsSimulatorOpen(false);
    },
    [handleRenterSign],
  );

  return {
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
  };
}
