import type { AppLocale } from "./config";

const RW_SHORT_MONTHS = [
  "Mut",
  "Gas",
  "Wer",
  "Mat",
  "Gic",
  "Kam",
  "Nya",
  "Kan",
  "Nze",
  "Ukw",
  "Ugu",
  "Uku",
] as const;

export function formatNumberLocalized(
  value: number,
  locale: AppLocale = "en",
): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat(locale === "rw" ? "en-RW" : "en-US").format(
    safe,
  );
}

export function formatRwfLocalized(
  amount: number,
  locale: AppLocale = "en",
): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `${formatNumberLocalized(safe, locale)} RWF`;
}

export function formatDateLocalized(
  input: Date | string,
  locale: AppLocale = "en",
): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) {
    return typeof input === "string" ? input : "";
  }

  if (locale === "rw") {
    const day = String(date.getDate()).padStart(2, "0");
    const month = RW_SHORT_MONTHS[date.getMonth()] ?? "";
    return `${day} ${month} ${date.getFullYear()}`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
