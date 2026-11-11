import { LandlordPropertyItem, LandlordRenter } from "@/types/landlord";
import { AgreementLanguage, Agreement } from "@/types/agreement.types";
import {
  CopyStatusMessage,
  SimulatedRenterInvitationLink,
} from "./renter-registration.types";

export type AddRenterMode = "manual" | "link" | "existing";
export type WizardStep = 1 | 2 | 3 | 4 | 5;
export type WizardStage = "step1" | "step2" | "step3" | "editor" | "completed";

export interface RenterIdentityDraft {
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  isExistingRenter?: boolean;
  existingRenterId?: string;
}

export interface RenterIdentityErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  nationalId?: string;
  existingRenterId?: string;
}

export type TenancyDurationOption = "6" | "12" | "24" | "open" | "custom";

export interface TenancyConfigDraft {
  isConfigured: boolean;
  propertyId: string;
  monthlyRentRwf: number | "";
  startDate: string;
  durationOption: TenancyDurationOption;
  customDurationMonths: number | "";
  paymentDueDay: number;
  initialPaymentMonths: number;
  securityDepositRwf: number | "";
}

export interface TenancyConfigErrors {
  propertyId?: string;
  monthlyRentRwf?: string;
  startDate?: string;
  customDurationMonths?: string;
}

export interface InitialPaymentCalculation {
  monthlyRent: number;
  initialMonths: number;
  initialRentAmount: number;
  securityDeposit: number;
  totalInitialAmount: number;
}

export function formatRwf(amount: number): string {
  if (isNaN(amount) || amount < 0) return "0 RWF";
  return `${new Intl.NumberFormat("en-RW").format(Math.round(amount))} RWF`;
}

export function calculateInitialPayments(
  monthlyRentRwf: number | "" | undefined,
  initialPaymentMonths: number | undefined,
  securityDepositRwf: number | "" | undefined,
): InitialPaymentCalculation {
  const monthlyRent =
    typeof monthlyRentRwf === "number" && monthlyRentRwf > 0
      ? monthlyRentRwf
      : 0;
  const initialMonths =
    typeof initialPaymentMonths === "number" && initialPaymentMonths > 0
      ? initialPaymentMonths
      : 1;
  const securityDeposit =
    typeof securityDepositRwf === "number" && securityDepositRwf > 0
      ? securityDepositRwf
      : 0;
  const initialRentAmount = monthlyRent * initialMonths;
  const totalInitialAmount = initialRentAmount + securityDeposit;

  return {
    monthlyRent,
    initialMonths,
    initialRentAmount,
    securityDeposit,
    totalInitialAmount,
  };
}

export function getDefaultPropertyRent(property: LandlordPropertyItem): number {
  if (property.id === "prop-101") return 150000;
  if (property.id === "prop-102") return 160000;
  if (property.id === "prop-103") return 250000;
  if (property.totalUnits && property.totalUnits > 0) {
    return Math.round(property.monthlyRevenueRwf / property.totalUnits);
  }
  return property.monthlyRevenueRwf || 150000;
}

export interface FullRenterRegistrationSubmission {
  mode: AddRenterMode;
  identity: RenterIdentityDraft;
  simulatedLink?: SimulatedRenterInvitationLink;
  tenancy: TenancyConfigDraft;
  propertyName?: string;
  propertyLocation?: string;
  paymentSummary?: InitialPaymentCalculation;
  selectedLanguage?: AgreementLanguage;
  agreementId?: string;
  agreementRef?: string;
  agreement?: Agreement;
  submittedAt: string;
}

export interface WizardProgressIndicatorProps {
  currentStep: WizardStep;
  isReviewing?: boolean;
  onStepClick?: (step: WizardStep) => void;
}

export interface Step1TenancyConfigProps {
  properties: LandlordPropertyItem[];
  draft: TenancyConfigDraft;
  errors: TenancyConfigErrors;
  paymentSummary: InitialPaymentCalculation;
  onUpdateDraft: <K extends keyof TenancyConfigDraft>(
    field: K,
    value: TenancyConfigDraft[K],
  ) => void;
  onSelectProperty: (propertyId: string) => void;
  onCancel: () => void;
  onContinue: () => void;
}

export interface Step2RenterDetailsProps {
  mode: AddRenterMode;
  onModeChange: (mode: AddRenterMode) => void;
  draft: RenterIdentityDraft;
  errors: RenterIdentityErrors;
  onFieldChange: (field: keyof RenterIdentityDraft, value: string) => void;
  onSelectExistingRenter: (renter: LandlordRenter) => void;
  existingRenters: LandlordRenter[];
  onBack: () => void;
  onContinue: () => void;
  // Link mode props
  generatedLink: SimulatedRenterInvitationLink | null;
  copied: boolean;
  copyStatus: CopyStatusMessage | null;
  onGenerateLink: () => void;
  onCopyLink: () => void;
}

export interface Step3AgreementLanguageProps {
  selectedLanguage: AgreementLanguage | null;
  onSelectLanguage: (language: AgreementLanguage) => void;
  onBack: () => void;
  onContinue: () => void;
}

export interface Step4AgreementEditorProps {
  agreement: Agreement;
  onBackToTenancy: () => void;
  onConfirmAgreement: (finalAgreement: Agreement) => void;
}

export interface WizardReviewViewProps {
  mode: AddRenterMode;
  identity: RenterIdentityDraft;
  tenancy: TenancyConfigDraft;
  properties: LandlordPropertyItem[];
  paymentSummary: InitialPaymentCalculation;
  simulatedLink: SimulatedRenterInvitationLink | null;
  onBackToEdit: (step?: WizardStep) => void;
  onConfirm: () => void;
}

export interface WizardCompletionViewProps {
  submission: FullRenterRegistrationSubmission;
  onRegisterAnother: () => void;
  onDone: () => void;
}

export interface RenterRegistrationWizardProps {
  properties: LandlordPropertyItem[];
  initialMode?: AddRenterMode;
}
