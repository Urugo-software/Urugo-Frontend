export function formatRwf(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `${safe.toLocaleString("en-US")} RWF`;
}

export function createSafeId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now().toString(36)}-${rand}`;
}

export function formatPropertyRent(property: {
  expectedMonthlyRentRwf?: number;
  monthlyRevenueRwf?: number;
}): number | undefined {
  if (
    typeof property.expectedMonthlyRentRwf === "number" &&
    Number.isFinite(property.expectedMonthlyRentRwf)
  ) {
    return property.expectedMonthlyRentRwf;
  }
  if (
    typeof property.monthlyRevenueRwf === "number" &&
    Number.isFinite(property.monthlyRevenueRwf)
  ) {
    return property.monthlyRevenueRwf;
  }
  return undefined;
}
