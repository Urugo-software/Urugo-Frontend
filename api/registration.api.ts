import api from "@/lib/axios";

export interface RenterInvitationIdentity {
  name: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
}

export interface RenterInvitationStartResponse {
  success: true;
  message: string;
  data: { requestId: string; emailStatus: "QUEUED" };
}

export interface RegistrationActionResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

export const startLandlordRenterInvitationRequest = (
  identity: RenterInvitationIdentity,
  idempotencyKey: string,
) =>
  api.post<RenterInvitationStartResponse>(
    "/api/landlord/renters",
    { identity },
    { headers: { "Idempotency-Key": idempotencyKey } },
  );

export const startAdminRenterInvitationRequest = (
  identity: RenterInvitationIdentity,
  landlordUserId: string,
  idempotencyKey: string,
) =>
  api.post<RenterInvitationStartResponse>(
    "/api/admin/renters",
    { identity, landlordUserId },
    { headers: { "Idempotency-Key": idempotencyKey } },
  );

export const verifyRenterInvitationRequest = (
  requestId: string,
  capabilityToken: string,
  code: string,
) =>
  api.post<RegistrationActionResponse>(
    `/api/requests/${encodeURIComponent(requestId)}/participants/RENTER/verify`,
    { code },
    { headers: { "x-capability-token": capabilityToken } },
  );

export const resendRenterInvitationRequest = (
  requestId: string,
  capabilityToken: string,
) =>
  api.post<RegistrationActionResponse>(
    `/api/requests/${encodeURIComponent(requestId)}/participants/RENTER/resend`,
    {},
    { headers: { "x-capability-token": capabilityToken } },
  );

export const activateRenterInvitationRequest = (
  requestId: string,
  capabilityToken: string,
  password: string,
  confirmation: string,
) =>
  api.post<RegistrationActionResponse>(
    `/api/requests/${encodeURIComponent(requestId)}/renter-password`,
    { password, confirmation },
    { headers: { "x-capability-token": capabilityToken } },
  );
