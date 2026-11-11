"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { generateStandardArticles } from "@/data/agreement-templates";
import {
  ManualRenterFormErrors,
  ManualRenterRegistrationDraft,
} from "@/types/renter-registration.types";
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
} from "@/types/renter-wizard.types";
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

export function buildInitialAgreement(
  tenancy: TenancyConfigDraft,
  identity: RenterIdentityDraft,
  property: LandlordPropertyItem | undefined,
  language: AgreementLanguage,
): Agreement {
  const durationMonths =
    tenancy.durationOption === "custom"
      ? typeof tenancy.customDurationMonths === "number" &&
        tenancy.customDurationMonths > 0
        ? tenancy.customDurationMonths
        : 12
      : tenancy.durationOption === "open"
        ? 12
        : parseInt(tenancy.durationOption, 10) || 12;

  const startDateStr =
    tenancy.startDate || new Date().toISOString().split("T")[0];
  const startDateObj = new Date(startDateStr);
  const endDateObj = new Date(startDateObj);
  endDateObj.setMonth(endDateObj.getMonth() + durationMonths);
  endDateObj.setDate(endDateObj.getDate() - 1);
  const endDateStr = endDateObj.toISOString().split("T")[0];

  const monthlyRent =
    typeof tenancy.monthlyRentRwf === "number" && tenancy.monthlyRentRwf > 0
      ? tenancy.monthlyRentRwf
      : 0;

  const deposit =
    typeof tenancy.securityDepositRwf === "number" &&
    tenancy.securityDepositRwf > 0
      ? tenancy.securityDepositRwf
      : 0;

  const initialMonths = tenancy.initialPaymentMonths || 1;
  const advanceAmount = monthlyRent * initialMonths;
  const totalInitial = advanceAmount + deposit;

  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const agreementId = `agr-${Date.now()}`;
  const referenceNumber = `AGR-2026-${randSuffix}`;
  const nowIso = new Date().toISOString();

  return {
    id: agreementId,
    referenceNumber,
    landlord: {
      name: "Paul Kagabo",
      phone: "+250 788 111 222",
      nationalId: "1198580012345678",
      email: "paul.kagabo@urugo.rw",
      address: "KG 123 St, Kimihurura, Gasabo, Kigali",
    },
    renter: {
      name: identity.fullName.trim() || "Prospective Tenant",
      phone: identity.phoneNumber.trim() || "+250 788 000 000",
      nationalId: identity.nationalId.replace(/\s+/g, "") || "1199000000000000",
      email: identity.email.trim().toLowerCase() || "renter@urugo.rw",
      address: "Kigali, Rwanda",
    },
    property: {
      id: property?.id || "prop-101",
      name: property?.name || "Residential Property",
      unitNumber: property?.totalUnits ? "Unit A-01" : "Whole House",
      address: property?.location || "Kigali, Rwanda",
      district: "Gasabo",
      propertyType: "Residential Apartment",
    },
    financials: {
      monthlyRentRwf: monthlyRent,
      paymentDueDay: tenancy.paymentDueDay || 1,
      advanceMonths: initialMonths,
      totalAdvanceRwf: advanceAmount,
      securityDepositRwf: deposit,
      otherChargesRwf: 0,
      totalInitialAmountRwf: totalInitial,
      currency: "RWF",
    },
    tenancyStartDate: startDateStr,
    tenancyEndDate: endDateStr,
    tenancyDurationMonths: durationMonths,
    language,
    status: "Draft",
    version: 1,
    createdAt: nowIso,
    updatedAt: nowIso,
    articles: generateStandardArticles(language),
  };
}

export function refreshAgreementMetadata(
  existing: Agreement,
  tenancy: TenancyConfigDraft,
  identity: RenterIdentityDraft,
  property: LandlordPropertyItem | undefined,
  language: AgreementLanguage,
): Agreement {
  const durationMonths =
    tenancy.durationOption === "custom"
      ? typeof tenancy.customDurationMonths === "number" &&
        tenancy.customDurationMonths > 0
        ? tenancy.customDurationMonths
        : 12
      : tenancy.durationOption === "open"
        ? 12
        : parseInt(tenancy.durationOption, 10) || 12;

  const startDateStr =
    tenancy.startDate || new Date().toISOString().split("T")[0];
  const startDateObj = new Date(startDateStr);
  const endDateObj = new Date(startDateObj);
  endDateObj.setMonth(endDateObj.getMonth() + durationMonths);
  endDateObj.setDate(endDateObj.getDate() - 1);
  const endDateStr = endDateObj.toISOString().split("T")[0];

  const monthlyRent =
    typeof tenancy.monthlyRentRwf === "number" && tenancy.monthlyRentRwf > 0
      ? tenancy.monthlyRentRwf
      : 0;

  const deposit =
    typeof tenancy.securityDepositRwf === "number" &&
    tenancy.securityDepositRwf > 0
      ? tenancy.securityDepositRwf
      : 0;

  const initialMonths = tenancy.initialPaymentMonths || 1;
  const advanceAmount = monthlyRent * initialMonths;
  const totalInitial = advanceAmount + deposit;

  let articles = existing.articles;
  if (language !== existing.language) {
    articles = generateStandardArticles(language);
  }

  return {
    ...existing,
    renter: {
      name: identity.fullName.trim() || existing.renter.name,
      phone: identity.phoneNumber.trim() || existing.renter.phone,
      nationalId:
        identity.nationalId.replace(/\s+/g, "") || existing.renter.nationalId,
      email: identity.email.trim().toLowerCase() || existing.renter.email,
      address: existing.renter.address,
    },
    property: {
      id: property?.id || existing.property.id,
      name: property?.name || existing.property.name,
      unitNumber: property?.totalUnits
        ? "Unit A-01"
        : existing.property.unitNumber,
      address: property?.location || existing.property.address,
      district: existing.property.district,
      propertyType: existing.property.propertyType,
    },
    financials: {
      monthlyRentRwf: monthlyRent,
      paymentDueDay: tenancy.paymentDueDay || 1,
      advanceMonths: initialMonths,
      totalAdvanceRwf: advanceAmount,
      securityDepositRwf: deposit,
      otherChargesRwf: existing.financials.otherChargesRwf,
      totalInitialAmountRwf: totalInitial,
      currency: "RWF",
    },
    tenancyStartDate: startDateStr,
    tenancyEndDate: endDateStr,
    tenancyDurationMonths: durationMonths,
    language,
    articles,
    updatedAt: new Date().toISOString(),
  };
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
  const [selectedLanguage, setSelectedLanguage] =
    useState<AgreementLanguage>("en");
  const [agreementDraft, setAgreementDraft] = useState<Agreement | null>(null);

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

  const selectExistingRenter = (renter: LandlordRenter) => {
    setIdentityDraft({
      fullName: renter.name,
      email: `${renter.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      phoneNumber: renter.phone,
      nationalId:
        "11992800" + Math.floor(10000000 + Math.random() * 90000000),
      isExistingRenter: true,
      existingRenterId: renter.id,
    });
    setIdentityErrors({});
    toast.success(`Selected verified tenant: ${renter.name}`);
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

  // Step 1 -> Step 2
  const goToStep2 = () => {
    const errors = validateTenancyConfig(tenancyDraft);
    if (Object.keys(errors).length > 0) {
      setTenancyErrors(errors);
      toast.error("Please select a property and set rent before proceeding.");
      return;
    }
    setStepDirection(1);
    setStep(2);
    setIsReviewing(false);
  };

  // Step 2 -> Step 1
  const goToStep1 = () => {
    setStepDirection(-1);
    setStep(1);
    setIsReviewing(false);
  };

  // Step 2 -> Step 3
  const goToStep3 = () => {
    if (mode === "manual") {
      const errors = validateRenterIdentity(identityDraft);
      if (Object.keys(errors).length > 0) {
        setIdentityErrors(errors);
        toast.error("Please fill in the required identity fields.");
        return;
      }
    } else if (mode === "existing") {
      if (!identityDraft.fullName || !identityDraft.isExistingRenter) {
        toast.error("Please select an existing renter from your portfolio.");
        return;
      }
    }
    setStepDirection(1);
    setStep(3);
    setIsReviewing(false);
  };

  // Step 3 -> Step 4 (Populate Agreement & Launch Editor directly in session)
  const goToStep4 = () => {
    if (!selectedLanguage) {
      toast.error("Please select an agreement language.");
      return;
    }

    const selectedProp = properties.find(
      (p) => p.id === tenancyDraft.propertyId,
    );

    if (!agreementDraft) {
      const initialAgreement = buildInitialAgreement(
        tenancyDraft,
        identityDraft,
        selectedProp,
        selectedLanguage,
      );
      setAgreementDraft(initialAgreement);
    } else {
      setAgreementDraft((prev) => {
        if (!prev) {
          return buildInitialAgreement(
            tenancyDraft,
            identityDraft,
            selectedProp,
            selectedLanguage,
          );
        }
        return refreshAgreementMetadata(
          prev,
          tenancyDraft,
          identityDraft,
          selectedProp,
          selectedLanguage,
        );
      });
    }

    setStepDirection(1);
    setStep(4);
    setIsReviewing(false);
  };

  const handleAgreementSaved = (saved: Agreement) => {
    setAgreementDraft(saved);
  };

  const handleAgreementConfirmed = (finalAgreement: Agreement) => {
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
        isExistingRenter: identityDraft.isExistingRenter,
        existingRenterId: identityDraft.existingRenterId,
      },
      simulatedLink: linkState.generatedLink || undefined,
      tenancy: { ...tenancyDraft },
      propertyName: selectedProp?.name,
      propertyLocation: selectedProp?.location,
      paymentSummary: tenancyDraft.isConfigured ? paymentSummary : undefined,
      selectedLanguage,
      agreementId: finalAgreement.id,
      agreementRef: finalAgreement.referenceNumber,
      agreement: finalAgreement,
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSubmission(snapshot);
    setIsSubmitted(true);
    setStep(5);
    toast.success("Tenancy agreement finalized and sent for digital review!");
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
        isExistingRenter: identityDraft.isExistingRenter,
        existingRenterId: identityDraft.existingRenterId,
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
    setSelectedLanguage("en");
    setAgreementDraft(null);
    setSubmission(null);
  };

  return {
    step,
    stepDirection,
    isReviewing,
    isSubmitted,
    mode,
    setMode,
    selectedLanguage,
    setSelectedLanguage,
    agreementDraft,
    setAgreementDraft,
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

