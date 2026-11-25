export const LOCALES = ["en", "rw"] as const;

export type AppLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_COOKIE = "urugo_locale";

export const TIME_ZONE = "Africa/Kigali";

export const LOCALE_META: Record<
  AppLocale,
  {
    code: AppLocale;
    shortLabel: string;
    nativeLabel: string;
    intlLocale: string;
  }
> = {
  en: {
    code: "en",
    shortLabel: "EN",
    nativeLabel: "English",
    intlLocale: "en-RW",
  },
  rw: {
    code: "rw",
    shortLabel: "RW",
    nativeLabel: "Kinyarwanda",
    intlLocale: "rw-RW",
  },
};

export function isAppLocale(value: unknown): value is AppLocale {
  return typeof value === "string" && LOCALES.includes(value as AppLocale);
}

export function normalizeLocale(value?: string | null): AppLocale {
  if (!value) return DEFAULT_LOCALE;
  const cleaned = value.trim().toLowerCase();
  if (cleaned === "rw" || cleaned.startsWith("rw-") || cleaned === "kin") {
    return "rw";
  }
  if (cleaned === "en" || cleaned.startsWith("en-")) {
    return "en";
  }
  return DEFAULT_LOCALE;
}

export function resolveLocaleFromAcceptLanguage(
  header?: string | null,
): AppLocale {
  if (!header) return DEFAULT_LOCALE;

  const candidates = header
    .split(",")
    .map((part) => {
      const [tagPart, ...params] = part.trim().split(";");
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: (tagPart ?? "").trim().toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry) => entry.tag.length > 0 && entry.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of candidates) {
    if (tag === "rw" || tag.startsWith("rw-") || tag === "kin") return "rw";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return DEFAULT_LOCALE;
}
