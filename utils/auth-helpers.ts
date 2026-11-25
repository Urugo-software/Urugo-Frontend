const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getPostLoginRoute(role?: string | null): string {
  const normalized = role?.trim().toUpperCase();
  if (normalized === "ADMIN" || normalized === "SUPER_ADMIN") {
    return "/admin";
  }
  if (normalized === "RENTER") {
    return "/renter";
  }
  return "/landlord";
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export function isValidTelephone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidNationalId(value: string): boolean {
  const compact = value.replace(/\s+/g, "");
  return compact.length >= 6;
}

export function formatPhotoFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
