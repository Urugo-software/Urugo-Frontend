import type { AppLocale } from "./config";

const MONTH_SHORT_RW: Record<string, string> = {
  jan: "Mut",
  feb: "Gas",
  mar: "Wer",
  apr: "Mat",
  may: "Gic",
  jun: "Kam",
  jul: "Nya",
  aug: "Kan",
  sep: "Nze",
  oct: "Ukw",
  nov: "Ugu",
  dec: "Uku",
};

const MONTH_FULL_RW: Record<string, string> = {
  january: "Mutarama",
  february: "Gashyantare",
  march: "Werurwe",
  april: "Mata",
  may: "Gicurasi",
  june: "Kamena",
  july: "Nyakanga",
  august: "Kanama",
  september: "Nzeri",
  october: "Ukwakira",
  november: "Ugushyingo",
  december: "Ukuboza",
};

export function localizeMonthShort(
  month: string,
  locale: AppLocale,
): string {
  if (locale !== "rw") return month;
  return MONTH_SHORT_RW[month.trim().toLowerCase()] ?? month;
}

export function localizeDisplayDate(
  value: string,
  locale: AppLocale,
): string {
  if (locale !== "rw" || !value) return value;

  let out = value;
  for (const [en, rw] of Object.entries(MONTH_FULL_RW)) {
    out = out.replace(new RegExp(`\\b${en}\\b`, "gi"), rw);
  }
  for (const [en, rw] of Object.entries(MONTH_SHORT_RW)) {
    out = out.replace(new RegExp(`\\b${en}\\b`, "gi"), rw);
  }
  return out;
}

export function localizeRelativeTime(
  value: string,
  locale: AppLocale,
): string {
  if (locale !== "rw" || !value) return value;

  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();

  if (lower === "just now") return "Ubu";
  if (lower === "today") return "Uyu munsi";
  if (lower === "yesterday") return "Ejo";

  const todayTime = trimmed.match(/^today,\s*(.+)$/i);
  if (todayTime) return `Uyu munsi, ${todayTime[1]}`;

  const yesterdayTime = trimmed.match(/^yesterday,\s*(.+)$/i);
  if (yesterdayTime) return `Ejo, ${yesterdayTime[1]}`;

  const mins = trimmed.match(/^(\d+)\s+minutes?\s+ago$/i);
  if (mins) {
    const n = Number(mins[1]);
    return n === 1 ? "Hashize umunota 1" : `Hashize iminota ${n}`;
  }

  const hours = trimmed.match(/^(\d+)\s+hours?\s+ago$/i);
  if (hours) {
    const n = Number(hours[1]);
    return n === 1 ? "Hashize isaha 1" : `Hashize amasaha ${n}`;
  }

  const days = trimmed.match(/^(\d+)\s+days?\s+ago$/i);
  if (days) {
    const n = Number(days[1]);
    return n === 1 ? "Hashize umunsi 1" : `Hashize iminsi ${n}`;
  }

  return localizeDisplayDate(trimmed, locale);
}

export function localizePaymentMethod(
  method: string | undefined,
  locale: AppLocale,
): string {
  if (!method) return "—";
  if (locale !== "rw") return method;
  const lower = method.trim().toLowerCase();
  if (lower === "bank transfer") return "Banki";
  if (lower === "cash") return "Cash";
  return method;
}
