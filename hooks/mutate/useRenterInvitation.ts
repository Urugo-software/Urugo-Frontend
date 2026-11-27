import { useMutation } from "@tanstack/react-query";
import {
  activateRenterInvitation,
  resendRenterInvitation,
  startAdminRenterInvitation,
  startLandlordRenterInvitation,
  verifyRenterInvitation,
  type RenterInvitationQueued,
} from "@/services/registration.service";

export function useStartLandlordRenterInvitation() {
  return useMutation<RenterInvitationQueued, Error, {
    identity: { name: string; email: string; phoneNumber: string; nationalId: string };
    idempotencyKey: string;
  }>({ mutationFn: startLandlordRenterInvitation });
}

export function useStartAdminRenterInvitation() {
  return useMutation<RenterInvitationQueued, Error, {
    identity: { name: string; email: string; phoneNumber: string; nationalId: string };
    landlordUserId: string;
    idempotencyKey: string;
  }>({ mutationFn: startAdminRenterInvitation });
}

export function useVerifyRenterInvitation() {
  return useMutation<void, Error, { requestId: string; capabilityToken: string; code: string }>({
    mutationFn: verifyRenterInvitation,
  });
}

export function useResendRenterInvitation() {
  return useMutation<void, Error, { requestId: string; capabilityToken: string }>({
    mutationFn: resendRenterInvitation,
  });
}

export function useActivateRenterInvitation() {
  return useMutation<void, Error, {
    requestId: string;
    capabilityToken: string;
    password: string;
    confirmation: string;
  }>({ mutationFn: activateRenterInvitation });
}
