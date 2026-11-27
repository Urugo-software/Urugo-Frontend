"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  useRenterWizard,
  validateRenterIdentity,
} from "@/hooks/mutate/useManualRenterRegistration";
import { useStartLandlordRenterInvitation } from "@/hooks/mutate/useRenterInvitation";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import {
  RenterRegistrationWizardProps,
  WizardStep,
} from "@/types/renter-wizard.types";
import { AgreementEditor } from "../agreements/editor/AgreementEditor";
import { Step1TenancyConfig } from "./wizard/Step1TenancyConfig";
import { Step2RenterDetails } from "./wizard/Step2RenterDetails";
import { Step3AgreementLanguage } from "./wizard/Step3AgreementLanguage";
import { WizardCompletionView } from "./wizard/WizardCompletionView";
import { WizardProgressIndicator } from "./wizard/WizardProgressIndicator";

const stepVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 16 : -16,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -16 : 16,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeOut" },
  }),
};

const reducedMotionVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export function RenterRegistrationWizard({
  properties,
  initialMode = "manual",
}: RenterRegistrationWizardProps) {
  const router = useRouter();
  const tInvitation = useTranslations("landlord.renters.wizard.step2");
  const startInvitation = useStartLandlordRenterInvitation();
  const invitationKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const [queuedInvitation, setQueuedInvitation] = useState<{
    signature: string;
    requestId: string;
    emailStatus: "QUEUED";
  } | null>(null);
  const existingRenters = useLandlordWorkspace((s) => s.renters);
  const shouldReduceMotion = useReducedMotion();

  const {
    step,
    stepDirection,
    isSubmitted,
    mode,
    setMode,
    selectedLanguage,
    setSelectedLanguage,
    agreementDraft,
    identityDraft,
    identityErrors,
    updateIdentityField,
    selectExistingRenter,
    tenancyDraft,
    tenancyErrors,
    updateTenancyField,
    selectProperty,
    paymentSummary,
    submission,
    goToStep1,
    goToStep2,
    goToStep3,
    goToStep4,
    handleAgreementSaved,
    handleAgreementConfirmed,
    resetWizard,
  } = useRenterWizard(properties, initialMode);

  const handleCancel = () => router.push("/landlord/renters");

  const handleStepIndicatorClick = (targetStep: WizardStep) => {
    if (isSubmitted || targetStep === step) return;
    if (targetStep === 1) goToStep1();
    else if (targetStep === 2) goToStep2();
    else if (targetStep === 3) goToStep3();
    else if (targetStep === 4) goToStep4();
  };

  const activeVariants = shouldReduceMotion
    ? reducedMotionVariants
    : stepVariants;

  const identitySignature = JSON.stringify({
    name: identityDraft.fullName.trim(),
    email: identityDraft.email.trim().toLowerCase(),
    phoneNumber: identityDraft.phoneNumber.replace(/[\s-]/g, ""),
    nationalId: identityDraft.nationalId.replace(/\s+/g, ""),
  });

  const handleStartInvitation = async () => {
    const validation = validateRenterIdentity(identityDraft);
    if (Object.keys(validation).length > 0) {
      toast.error(tInvitation("invitationIdentityRequired"));
      return;
    }

    const key = invitationKeyRef.current?.signature === identitySignature
      ? invitationKeyRef.current.key
      : crypto.randomUUID();
    invitationKeyRef.current = { signature: identitySignature, key };

    try {
      const result = await startInvitation.mutateAsync({
        identity: {
          name: identityDraft.fullName.trim(),
          email: identityDraft.email.trim().toLowerCase(),
          phoneNumber: identityDraft.phoneNumber.trim(),
          nationalId: identityDraft.nationalId.replace(/\s+/g, ""),
        },
        idempotencyKey: key,
      });
      setQueuedInvitation({ signature: identitySignature, ...result });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : tInvitation("invitationStartFailed"));
    }
  };

  const currentQueuedInvitation = queuedInvitation?.signature === identitySignature
    ? queuedInvitation
    : null;

  return (
    <div className="border border-line bg-white shadow-2xs">
      {!isSubmitted && (
        <WizardProgressIndicator
          currentStep={step}
          isReviewing={false}
          onStepClick={handleStepIndicatorClick}
        />
      )}

      <div className={step === 4 ? "p-0" : "p-5 sm:p-8 md:p-10"}>
        <AnimatePresence mode="wait" custom={stepDirection}>
          {isSubmitted && submission ? (
            <motion.div
              key="completion"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <WizardCompletionView
                submission={submission}
                onRegisterAnother={resetWizard}
                onDone={handleCancel}
              />
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="step-1"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Step1TenancyConfig
                properties={properties}
                draft={tenancyDraft}
                errors={tenancyErrors}
                paymentSummary={paymentSummary}
                onUpdateDraft={updateTenancyField}
                onSelectProperty={selectProperty}
                onCancel={handleCancel}
                onContinue={goToStep2}
              />
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key="step-2"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Step2RenterDetails
                mode={mode}
                onModeChange={setMode}
                draft={identityDraft}
                errors={identityErrors}
                onFieldChange={updateIdentityField}
                onSelectExistingRenter={selectExistingRenter}
                existingRenters={existingRenters}
                onBack={goToStep1}
                onContinue={goToStep3}
                onStartInvitation={handleStartInvitation}
                isStartingInvitation={startInvitation.isPending}
                queuedInvitation={currentQueuedInvitation}
              />
            </motion.div>
          ) : step === 3 ? (
            <motion.div
              key="step-3"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <Step3AgreementLanguage
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                onBack={goToStep2}
                onContinue={goToStep4}
              />
            </motion.div>
          ) : (
            <motion.div
              key="step-4"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex min-h-[600px] flex-col"
            >
              {agreementDraft && (
                <AgreementEditor
                  key={`${agreementDraft.id}-${selectedLanguage}-${agreementDraft.financials.monthlyRentRwf}-${agreementDraft.tenancyStartDate ?? ""}-${agreementDraft.renter.name}`}
                  initialAgreement={agreementDraft}
                  onEditTenancy={goToStep1}
                  onBackToTenancy={goToStep3}
                  onSaveAgreement={handleAgreementSaved}
                  onConfirmAgreement={handleAgreementConfirmed}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
