"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  Agreement,
  AgreementLanguage,
  RenterChangeRequest,
} from "@/types/agreement.types";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { createSafeId } from "@/utils/format";

export function useAgreementPreview(initialAgreement: Agreement) {
  const router = useRouter();
  const tToast = useTranslations("landlord.hookFeedback.agreement");
  const upsertAgreement = useLandlordWorkspace((s) => s.upsertAgreement);
  const storeAgreement = useLandlordWorkspace((s) =>
    s.agreements.find((a) => a.id === initialAgreement.id),
  );
  const agreement = storeAgreement ?? initialAgreement;

  const [activeLanguage, setActiveLanguage] = useState<AgreementLanguage>(
    initialAgreement.language,
  );
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isLandlordSignOpen, setIsLandlordSignOpen] = useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  const commitUpdate = useCallback(
    (updater: (prev: Agreement) => Agreement) => {
      upsertAgreement(updater(agreement));
    },
    [agreement, upsertAgreement],
  );

  const handleSubmitChangeRequest = useCallback(
    (newRequest: RenterChangeRequest) => {
      commitUpdate((prev) => ({
        ...prev,
        status: "Changes Requested",
        updatedAt: new Date().toISOString(),
        changeRequests: [...(prev.changeRequests || []), newRequest],
      }));
    },
    [commitUpdate],
  );

  const handleLandlordSign = useCallback(
    (signerName: string) => {
      const now = new Date().toISOString();
      commitUpdate((prev) => ({
        ...prev,
        status: prev.renterSignature ? "Signed" : "Awaiting Renter Signature",
        updatedAt: now,
        landlordSignature: {
          signedBy: signerName,
          nationalId: prev.landlord.nationalId,
          signedAt: now,
          signatureType: "Electronic",
        },
      }));
    },
    [commitUpdate],
  );

  const handleRenterSign = useCallback(
    (signerName: string) => {
      const now = new Date().toISOString();
      commitUpdate((prev) => ({
        ...prev,
        status: prev.landlordSignature
          ? "Signed"
          : "Awaiting Landlord Signature",
        updatedAt: now,
        renterSignature: {
          signedBy: signerName,
          nationalId: prev.renter.nationalId,
          signedAt: now,
          signatureType: "Electronic",
        },
      }));
    },
    [commitUpdate],
  );

  const handleSendDraft = useCallback(() => {
    commitUpdate((prev) => ({
      ...prev,
      status: "Sent",
      version: prev.version + 1,
      updatedAt: new Date().toISOString(),
    }));
    toast.success(tToast("sentForReview", { name: agreement.renter.name }));
  }, [commitUpdate, agreement.renter.name, tToast]);

  const handleCancelAgreement = useCallback(() => {
    commitUpdate((prev) => ({
      ...prev,
      status: "Cancelled",
      updatedAt: new Date().toISOString(),
    }));
    setIsCancelConfirmOpen(false);
    toast.success(tToast("cancelled"));
  }, [commitUpdate, tToast]);

  const handleCreateRenewalDraft = useCallback(() => {
    const now = new Date().toISOString();
    const newId = createSafeId("agr");
    const renewalDraft: Agreement = {
      ...agreement,
      id: newId,
      referenceNumber: `${agreement.referenceNumber.replace(/-R\d+$/, "")}-R${agreement.version + 1}`,
      status: "Draft",
      version: agreement.version + 1,
      createdAt: now,
      updatedAt: now,
      renterSignature: undefined,
      landlordSignature: undefined,
      changeRequests: [],
      supersedes: agreement.id,
      tenancyStartDate: agreement.tenancyEndDate || now.slice(0, 10),
    };
    upsertAgreement(renewalDraft);
    toast.success(tToast("renewalDraftCreated"));
    router.push(`/landlord/agreements/${newId}/edit`);
  }, [agreement, upsertAgreement, router, tToast]);

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
  };
}
