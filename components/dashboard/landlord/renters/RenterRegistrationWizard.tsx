"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useRenterWizard } from "@/hooks/mutate/useManualRenterRegistration";
import { RenterRegistrationWizardProps, WizardStep } from "@/types/renter-wizard.types";
import { mockLandlordRenters } from "@/data/landlord-data";
import { Step1TenancyConfig } from "./wizard/Step1TenancyConfig";
import { Step2RenterDetails } from "./wizard/Step2RenterDetails";
import { Step3AgreementLanguage } from "./wizard/Step3AgreementLanguage";
import { AgreementEditor } from "../agreements/editor/AgreementEditor";
import { WizardCompletionView } from "./wizard/WizardCompletionView";
import { WizardProgressIndicator } from "./wizard/WizardProgressIndicator";
import { WizardReviewView } from "./wizard/WizardReviewView";

const stepVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 16 : -16,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -16 : 16,
    opacity: 0,
    transition: {
      duration: 0.18,
      ease: "easeOut",
    },
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
  const shouldReduceMotion = useReducedMotion();

  const {
    step,
    stepDirection,
    isReviewing,
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
    linkState,
    submission,
    goToStep1,
    goToStep2,
    goToStep3,
    goToStep4,
    handleAgreementSaved,
    handleAgreementConfirmed,
    backFromReview,
    confirmSubmission,
    resetWizard,
  } = useRenterWizard(properties, initialMode);

  const handleCancel = () => {
    router.push("/landlord/renters");
  };

  const handleStepIndicatorClick = (targetStep: WizardStep) => {
    if (isSubmitted) return;
    if (targetStep === 1) {
      goToStep1();
    } else if (targetStep === 2) {
      goToStep2();
    } else if (targetStep === 3) {
      goToStep3();
    } else if (targetStep === 4) {
      goToStep4();
    }
  };

  const activeVariants = shouldReduceMotion ? reducedMotionVariants : stepVariants;

  return (
    <div className="border border-line bg-white shadow-2xs">
      {/* Step Progress Bar */}
      {!isSubmitted && (
        <WizardProgressIndicator
          currentStep={step}
          isReviewing={isReviewing}
          onStepClick={handleStepIndicatorClick}
        />
      )}

      {/* Animated Step Content */}
      <div className={step === 4 ? "p-0" : "p-6 sm:p-8 md:p-10"}>
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
          ) : isReviewing ? (
            <motion.div
              key="review"
              custom={stepDirection}
              variants={activeVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <WizardReviewView
                mode={mode}
                identity={identityDraft}
                tenancy={tenancyDraft}
                properties={properties}
                paymentSummary={paymentSummary}
                simulatedLink={linkState.generatedLink}
                onBackToEdit={(targetStep) => backFromReview(targetStep)}
                onConfirm={confirmSubmission}
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
                existingRenters={mockLandlordRenters}
                onBack={goToStep1}
                onContinue={goToStep3}
                generatedLink={linkState.generatedLink}
                copied={linkState.copied}
                copyStatus={linkState.copyStatus}
                onGenerateLink={linkState.generateLink}
                onCopyLink={linkState.copyLink}
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
              className="min-h-[600px] flex flex-col"
            >
              {agreementDraft && (
                <AgreementEditor
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
