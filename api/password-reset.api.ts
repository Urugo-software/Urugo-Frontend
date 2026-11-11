/**
 * Integration boundary for password recovery. Replace these placeholders once
 * the backend's reset endpoints and authorization contract are available.
 */
export class PasswordResetUnavailableError extends Error {
  constructor() {
    super("Password recovery is not available yet. Please try again later.");
    this.name = "PasswordResetUnavailableError";
  }
}

export const requestPasswordResetCode: (email: string) => Promise<void> = async () => {
  throw new PasswordResetUnavailableError();
};

export const verifyPasswordResetCode: (
  email: string,
  code: string,
) => Promise<string> = async () => {
  throw new PasswordResetUnavailableError();
};

export const resetPassword: (
  password: string,
  proof: string,
) => Promise<void> = async () => {
  throw new PasswordResetUnavailableError();
};
