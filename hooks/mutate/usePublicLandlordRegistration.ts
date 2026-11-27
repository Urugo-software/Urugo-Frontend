import { useMutation } from "@tanstack/react-query";
import type { LandlordRegistrationIdentity } from "@/api/registration.api";
import type { LandlordPlan } from "@/types/auth";
import {
  completePublicLandlordRegistration,
  resendPublicLandlordRegistration,
  startPublicLandlordRegistration,
  verifyPublicLandlordRegistration,
} from "@/services/registration.service";

export function useStartPublicLandlordRegistration() {
  return useMutation({
    mutationFn: (input: { identity: LandlordRegistrationIdentity; idempotencyKey: string }) =>
      startPublicLandlordRegistration(input),
  });
}

export function useVerifyPublicLandlordRegistration() {
  return useMutation({
    mutationFn: (input: { requestId: string; capabilityToken: string; code: string }) =>
      verifyPublicLandlordRegistration(input),
  });
}

export function useResendPublicLandlordRegistration() {
  return useMutation({
    mutationFn: (input: { requestId: string; capabilityToken: string }) =>
      resendPublicLandlordRegistration(input),
  });
}

export function useCompletePublicLandlordRegistration() {
  return useMutation({
    mutationFn: (input: {
      requestId: string;
      capabilityToken: string;
      password: string;
      confirmation: string;
      selectedLandlordPlan: LandlordPlan;
    }) => completePublicLandlordRegistration(input),
  });
}
