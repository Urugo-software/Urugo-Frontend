const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getPostLoginRoute(role?: string | null): string {
  const normalized = role?.trim().toUpperCase();
  if (normalized === "ADMIN" || normalized === "SUPER_ADMIN") {
    return "/admin";
  }
  if (normalized === "RENTER") {
    return "/renter";
  }
  if (normalized === "HOME_SEEKER") {
    return "/home-seeker";
  }
  return "/landlord";
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidTelephone(value: string): boolean {
  const normalized = value.trim().replace(/[\s().-]/g, "");
  return /^\+?\d{7,15}$/.test(normalized);
}

export function isValidNationalId(value: string): boolean {
  const compact = value.replace(/\s+/g, "");
  return compact.length >= 6;
}

export function isValidPassword(value: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
}

export function formatPhotoFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
