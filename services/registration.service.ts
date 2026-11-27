import type { AxiosError } from "axios";
import {
  activateRenterInvitationRequest,
  completePublicLandlordRegistrationRequest,
  resendRenterInvitationRequest,
  resendPublicLandlordRegistrationRequest,
  startAdminRenterInvitationRequest,
  startLandlordRenterInvitationRequest,
  startPublicLandlordRegistrationRequest,
  verifyPublicLandlordRegistrationRequest,
  verifyRenterInvitationRequest,
  type LandlordRegistrationIdentity,
  type RenterInvitationIdentity,
} from "@/api/registration.api";
import type { LandlordPlan } from "@/types/auth";
import {
  RegistrationCooldownError,
  RegistrationInvitationRejectedError,
} from "@/utils/renter-invitation";

export interface RenterInvitationQueued {
  requestId: string;
  emailStatus: "QUEUED";
}

export type PublicLandlordRegistrationQueued = RenterInvitationQueued;

function apiMessage(error: unknown, fallback: string): string {
  const response = (error as AxiosError<{ message?: unknown }> | undefined)
    ?.response?.data?.message;
  return typeof response === "string" && response.trim() ? response : fallback;
}

function parseQueuedResponse(response: {
  data?: { success?: unknown; data?: { requestId?: unknown; emailStatus?: unknown } };
}): RenterInvitationQueued {
  const payload = response.data?.data;
  if (
    response.data?.success !== true ||
    typeof payload?.requestId !== "string" ||
    payload.emailStatus !== "QUEUED"
  ) {
    throw new Error("The invitation could not be confirmed. Check for an existing invitation before trying again.");
  }
  return { requestId: payload.requestId, emailStatus: "QUEUED" };
}

export async function startLandlordRenterInvitation(input: {
  identity: RenterInvitationIdentity;
  idempotencyKey: string;
}): Promise<RenterInvitationQueued> {
  try {
    const response = await startLandlordRenterInvitationRequest(
      input.identity,
      input.idempotencyKey,
    );
    return parseQueuedResponse(response);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("The invitation could not be confirmed")) throw error;
    throw new Error(apiMessage(error, "We could not start the invitation. Please try again."));
  }
}

export async function startPublicLandlordRegistration(input: {
  identity: LandlordRegistrationIdentity;
  idempotencyKey: string;
}): Promise<PublicLandlordRegistrationQueued> {
  try {
    const response = await startPublicLandlordRegistrationRequest(
      input.identity,
      input.idempotencyKey,
    );
    return parseQueuedResponse(response);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("The invitation could not be confirmed")) throw error;
    throw new Error(apiMessage(error, "We could not start your registration. Please try again."));
  }
}

export async function verifyPublicLandlordRegistration(input: {
  requestId: string;
  capabilityToken: string;
  code: string;
}): Promise<void> {
  try {
    await verifyPublicLandlordRegistrationRequest(
      input.requestId,
      input.capabilityToken,
      input.code,
    );
  } catch (error) {
    throw new Error(apiMessage(error, "We could not verify that code. Check it and try again."));
  }
}

export async function resendPublicLandlordRegistration(input: {
  requestId: string;
  capabilityToken: string;
}): Promise<void> {
  try {
    await resendPublicLandlordRegistrationRequest(input.requestId, input.capabilityToken);
  } catch (error) {
    const axiosError = error as AxiosError;
    const retryAfter = axiosError.response?.headers?.["retry-after"];
    if (axiosError.response?.status === 429) {
      const seconds = Number(retryAfter);
      throw new RegistrationCooldownError(Number.isFinite(seconds) && seconds > 0 ? seconds : 60);
    }
    if (axiosError.response?.status === 400) {
      throw new RegistrationInvitationRejectedError();
    }
    throw new Error(apiMessage(error, "We could not request another verification email."));
  }
}

export async function completePublicLandlordRegistration(input: {
  requestId: string;
  capabilityToken: string;
  password: string;
  confirmation: string;
  selectedLandlordPlan: LandlordPlan;
}): Promise<void> {
  try {
    await completePublicLandlordRegistrationRequest(
      input.requestId,
      input.capabilityToken,
      input.password,
      input.confirmation,
      input.selectedLandlordPlan,
    );
  } catch (error) {
    throw new Error(apiMessage(error, "We could not complete your registration. Please try again."));
  }
}

export async function startAdminRenterInvitation(input: {
  identity: RenterInvitationIdentity;
  landlordUserId: string;
  idempotencyKey: string;
}): Promise<RenterInvitationQueued> {
  try {
    const response = await startAdminRenterInvitationRequest(
      input.identity,
      input.landlordUserId,
      input.idempotencyKey,
    );
    return parseQueuedResponse(response);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("The invitation could not be confirmed")) throw error;
    throw new Error(apiMessage(error, "We could not start the invitation. Please try again."));
  }
}

export async function verifyRenterInvitation(input: {
  requestId: string;
  capabilityToken: string;
  code: string;
}): Promise<void> {
  try {
    await verifyRenterInvitationRequest(input.requestId, input.capabilityToken, input.code);
  } catch (error) {
    throw new Error(apiMessage(error, "We could not verify that code. Check it or request a new one."));
  }
}

export async function resendRenterInvitation(input: {
  requestId: string;
  capabilityToken: string;
}): Promise<void> {
  try {
    await resendRenterInvitationRequest(input.requestId, input.capabilityToken);
  } catch (error) {
    const axiosError = error as AxiosError;
    const retryAfter = axiosError.response?.headers?.["retry-after"];
    if (axiosError.response?.status === 429) {
      const seconds = Number(retryAfter);
      throw new RegistrationCooldownError(Number.isFinite(seconds) && seconds > 0 ? seconds : 60);
    }
    if (axiosError.response?.status === 400) {
      throw new RegistrationInvitationRejectedError();
    }
    throw new Error(apiMessage(error, "We could not request another invitation email."));
  }
}

export async function activateRenterInvitation(input: {
  requestId: string;
  capabilityToken: string;
  password: string;
  confirmation: string;
}): Promise<void> {
  try {
    await activateRenterInvitationRequest(
      input.requestId,
      input.capabilityToken,
      input.password,
      input.confirmation,
    );
  } catch (error) {
    throw new Error(apiMessage(error, "We could not activate this invitation. It may have expired or already been used."));
  }
}
