"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LandlordPropertyItem } from "@/types/landlord";
import {
  ManualRenterFormErrors,
  ManualRenterRegistrationDraft,
} from "../types/renter-registration.types";
import {
  AddRenterMode,
  calculateInitialPayments,
  FullRenterRegistrationSubmission,
  getDefaultPropertyRent,
  RenterIdentityDraft,
  RenterIdentityErrors,
  TenancyConfigDraft,
  TenancyConfigErrors,
  WizardStep,
} from "../types/renter-wizard.types";
import { useSimulatedRenterLink } from "./useSimulatedRenterLink";

export const INITIAL_IDENTITY_DRAFT: RenterIdentityDraft = {
  fullName: "",
  email: "",
  phoneNumber: "",
  nationalId: "",
};

export const INITIAL_TENANCY_DRAFT: TenancyConfigDraft = {
  isConfigured: true,
  propertyId: "",
  monthlyRentRwf: "",
  startDate: "2026-12-01",
  durationOption: "12",
  customDurationMonths: "",
  paymentDueDay: 1,
  initialPaymentMonths: 1,
  securityDepositRwf: "",
};

export function validateRenterIdentity(
  draft: RenterIdentityDraft,
): RenterIdentityErrors {
  const errors: RenterIdentityErrors = {};
  const trimmedName = draft.fullName.trim();
  const trimmedEmail = draft.email.trim();
  const normalizedPhone = draft.phoneNumber.replace(/[\s-]/g, "");
  const normalizedNationalId = draft.nationalId.replace(/\s+/g, "");

  if (!trimmedName) {
    errors.fullName = "Full legal name is required.";
  } else if (trimmedName.length < 2) {
    errors.fullName = "Enter at least 2 characters for the legal name.";
  }

  if (!trimmedEmail) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  if (!normalizedPhone) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!/^\+?\d{9,15}$/.test(normalizedPhone)) {
    errors.phoneNumber =
      "Enter a valid phone number (9 to 15 digits, e.g. +250 788 123 456).";
  }

  if (!normalizedNationalId) {
    errors.nationalId = "National ID is required.";
  } else if (!/^\d{16}$/.test(normalizedNationalId)) {
    errors.nationalId = "National ID must be exactly 16 digits.";
  }

  return errors;
}

export function validateTenancyConfig(
  draft: TenancyConfigDraft,
): TenancyConfigErrors {
  const errors: TenancyConfigErrors = {};
  if (!draft.isConfigured) return errors;

  if (!draft.propertyId) {
    errors.propertyId = "Please select an assigned property.";
  }

  if (
    typeof draft.monthlyRentRwf !== "number" ||
    isNaN(draft.monthlyRentRwf) ||
    draft.monthlyRentRwf <= 0
  ) {
    errors.monthlyRentRwf = "Enter a valid positive monthly rent in RWF.";
  }

  if (!draft.startDate) {
    errors.startDate = "Tenancy start date is required.";
  }

  if (
    draft.durationOption === "custom" &&
    (typeof draft.customDurationMonths !== "number" ||
      draft.customDurationMonths <= 0)
  ) {
    errors.customDurationMonths = "Enter a valid custom duration in months.";
  }

  return errors;
}

export function useRenterWizard(
  properties: LandlordPropertyItem[],
  initialMode: AddRenterMode = "manual",
) {
  const [step, setStep] = useState<WizardStep>(1);
  const [stepDirection, setStepDirection] = useState<1 | -1>(1);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mode, setMode] = useState<AddRenterMode>(initialMode);

  const [identityDraft, setIdentityDraft] =
    useState<RenterIdentityDraft>(INITIAL_IDENTITY_DRAFT);
  const [identityErrors, setIdentityErrors] = useState<RenterIdentityErrors>({});

  const [tenancyDraft, setTenancyDraft] =
    useState<TenancyConfigDraft>(INITIAL_TENANCY_DRAFT);
  const [tenancyErrors, setTenancyErrors] = useState<TenancyConfigErrors>({});

  const [submission, setSubmission] =
    useState<FullRenterRegistrationSubmission | null>(null);

  // Link mode helper
  const linkState = useSimulatedRenterLink(properties);

  const paymentSummary = useMemo(
    () =>
      calculateInitialPayments(
        tenancyDraft.monthlyRentRwf,
        tenancyDraft.initialPaymentMonths,
        tenancyDraft.securityDepositRwf,
      ),
    [
      tenancyDraft.monthlyRentRwf,
      tenancyDraft.initialPaymentMonths,
      tenancyDraft.securityDepositRwf,
    ],
  );

  const updateIdentityField = (
    field: keyof RenterIdentityDraft,
    value: string,
  ) => {
    setIdentityDraft((prev) => ({ ...prev, [field]: value }));
    if (field in identityErrors) {
      setIdentityErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const updateTenancyField = <K extends keyof TenancyConfigDraft>(
    field: K,
    value: TenancyConfigDraft[K],
  ) => {
    setTenancyDraft((prev) => ({ ...prev, [field]: value }));
    if (field in tenancyErrors) {
      setTenancyErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const selectProperty = (propertyId: string) => {
    const selectedProp = properties.find((p) => p.id === propertyId);
    setTenancyDraft((prev) => {
      const nextRent =
        selectedProp && prev.monthlyRentRwf === ""
          ? getDefaultPropertyRent(selectedProp)
          : prev.monthlyRentRwf;

      return {
        ...prev,
        propertyId,
        monthlyRentRwf: nextRent,
      };
    });

    if ("propertyId" in tenancyErrors) {
      setTenancyErrors((prev) => ({ ...prev, propertyId: undefined }));
    }
  };

  const goToStep2 = () => {
    if (mode === "manual") {
      const errors = validateRenterIdentity(identityDraft);
      if (Object.keys(errors).length > 0) {
        setIdentityErrors(errors);
        toast.error("Please fill in the required identity fields.");
        return;
      }
    }
    setStepDirection(1);
    setStep(2);
    setIsReviewing(false);
  };

  const goToStep1 = () => {
    setStepDirection(-1);
    setStep(1);
    setIsReviewing(false);
  };

  const goToReview = (skipTenancy = false) => {
    if (skipTenancy) {
      setTenancyDraft((prev) => ({ ...prev, isConfigured: false }));
      setTenancyErrors({});
      setIsReviewing(true);
      return;
    }

    if (tenancyDraft.isConfigured) {
      const errors = validateTenancyConfig(tenancyDraft);
      if (Object.keys(errors).length > 0) {
        setTenancyErrors(errors);
        toast.error("Please complete the required tenancy settings or skip.");
        return;
      }
    }

    setIsReviewing(true);
  };

  const backFromReview = (targetStep?: WizardStep) => {
    setIsReviewing(false);
    if (targetStep) {
      setStep(targetStep);
      setStepDirection(-1);
    }
  };

  const confirmSubmission = () => {
    const selectedProp = properties.find(
      (p) => p.id === tenancyDraft.propertyId,
    );

    const snapshot: FullRenterRegistrationSubmission = {
      mode,
      identity: {
        fullName: identityDraft.fullName.trim(),
        email: identityDraft.email.trim().toLowerCase(),
        phoneNumber: identityDraft.phoneNumber.trim(),
        nationalId: identityDraft.nationalId.replace(/\s+/g, ""),
      },
      simulatedLink: linkState.generatedLink || undefined,
      tenancy: { ...tenancyDraft },
      propertyName: selectedProp?.name,
      propertyLocation: selectedProp?.location,
      paymentSummary: tenancyDraft.isConfigured ? paymentSummary : undefined,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSubmission(snapshot);
    setIsSubmitted(true);
    toast.success("Renter registration prepared in local preview state.");
  };

  const resetWizard = () => {
    setStep(1);
    setStepDirection(1);
    setIsReviewing(false);
    setIsSubmitted(false);
    setIdentityDraft(INITIAL_IDENTITY_DRAFT);
    setIdentityErrors({});
    setTenancyDraft(INITIAL_TENANCY_DRAFT);
    setTenancyErrors({});
    setSubmission(null);
  };

  return {
    step,
    stepDirection,
    isReviewing,
    isSubmitted,
    mode,
    setMode,
    identityDraft,
    identityErrors,
    updateIdentityField,
    tenancyDraft,
    tenancyErrors,
    updateTenancyField,
    selectProperty,
    paymentSummary,
    linkState,
    submission,
    goToStep1,
    goToStep2,
    goToReview,
    backFromReview,
    confirmSubmission,
    resetWizard,
  };
}

// Retain compatibility with any direct callers
export function useManualRenterRegistration() {
  const [draft, setDraft] = useState<ManualRenterRegistrationDraft>({
    fullName: "",
    email: "",
    phoneNumber: "",
    nationalId: "",
    propertyId: "",
  });
  const [errors, setErrors] = useState<ManualRenterFormErrors>({});
  const [submittedDraft, setSubmittedDraft] =
    useState<ManualRenterRegistrationDraft | null>(null);

  const updateField = (
    field: keyof ManualRenterRegistrationDraft,
    value: string,
  ) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateRenterIdentity(draft);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }

    setSubmittedDraft({
      fullName: draft.fullName.trim(),
      email: draft.email.trim().toLowerCase(),
      phoneNumber: draft.phoneNumber.trim(),
      nationalId: draft.nationalId.replace(/\s+/g, ""),
      propertyId: draft.propertyId,
    });
    toast.success("Renter details captured in local preview state.");
  };

  const resetForm = () => {
    setDraft({
      fullName: "",
      email: "",
      phoneNumber: "",
      nationalId: "",
      propertyId: "",
    });
    setErrors({});
    setSubmittedDraft(null);
  };

  return {
    draft,
    errors,
    submittedDraft,
    updateField,
    handleSubmit,
    resetForm,
  };
}

