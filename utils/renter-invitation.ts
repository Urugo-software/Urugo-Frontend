const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{8,128}$/;
const CAPABILITY_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const OTP_PATTERN = /^\d{6}$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class RegistrationCooldownError extends Error {
  readonly retryAfterSeconds: number;

  constructor(retryAfterSeconds: number) {
    super("Please wait before requesting another code.");
    this.name = "RegistrationCooldownError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class RegistrationInvitationRejectedError extends Error {
  constructor() {
    super("This invitation is no longer valid.");
    this.name = "RegistrationInvitationRejectedError";
  }
}

export function isValidRenterInvitationReference(value: string): boolean {
  return REQUEST_ID_PATTERN.test(value.trim());
}

export function isValidRenterInvitationCapability(value: string): boolean {
  return CAPABILITY_PATTERN.test(value.trim());
}

export function isValidRenterInvitationCode(value: string): boolean {
  return OTP_PATTERN.test(value);
}

export function isValidRenterActivationPassword(value: string): boolean {
  return PASSWORD_PATTERN.test(value);
}
