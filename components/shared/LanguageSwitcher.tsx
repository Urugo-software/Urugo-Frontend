"use client";

import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";

import { setAppLocale } from "@/i18n/actions";
import { LOCALES, type AppLocale } from "@/i18n/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "compact" | "full";
  shape?: "pill" | "square";
  className?: string;
  onSwitched?: () => void;
}

export function LanguageSwitcher({
  variant = "compact",
  shape = "pill",
  className,
  onSwitched,
}: LanguageSwitcherProps) {
  const activeLocale = useLocale() as AppLocale;
  const t = useTranslations("common.language");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (nextLocale: AppLocale) => {
    if (nextLocale === activeLocale || isPending) return;
    startTransition(async () => {
      await setAppLocale(nextLocale);
      router.refresh();
      onSwitched?.();
    });
  };

  const radiusClass = shape === "pill" ? "rounded-full" : "rounded-none";

  if (variant === "full") {
    return (
      <div
        role="group"
        aria-label={t("switchAria")}
        className={cn(
          "inline-flex flex-wrap items-center gap-2",
          isPending && "opacity-70",
          className,
        )}
      >
        {LOCALES.map((locale) => {
          const isActive = activeLocale === locale;
          const label = locale === "en" ? t("en") : t("rw");
          return (
            <button
              key={locale}
              type="button"
              disabled={isPending}
              aria-pressed={isActive}
              onClick={() => handleSelect(locale)}
              className={cn(
                "inline-flex min-h-10 cursor-pointer items-center gap-2 border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:text-sm",
                radiusClass,
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-ink hover:border-brand/50 hover:bg-surface",
              )}
            >
              <Globe aria-hidden="true" className="size-3.5 shrink-0" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t("switchAria")}
      className={cn(
        "inline-flex items-center border border-line bg-surface/70 p-0.5 transition-opacity",
        radiusClass,
        isPending && "opacity-70",
        className,
      )}
    >
      <Globe
        aria-hidden="true"
        className="ml-2 mr-1 hidden size-3.5 shrink-0 text-faint sm:block"
      />
      {LOCALES.map((locale) => {
        const isActive = activeLocale === locale;
        const shortLabel = locale === "en" ? t("shortEn") : t("shortRw");
        const fullLabel = locale === "en" ? t("en") : t("rw");
        return (
          <button
            key={locale}
            type="button"
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={fullLabel}
            title={fullLabel}
            onClick={() => handleSelect(locale)}
            className={cn(
              "min-h-7 min-w-8 cursor-pointer px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              radiusClass,
              isActive
                ? "bg-brand text-white shadow-2xs"
                : "text-body hover:text-ink",
            )}
          >
            {shortLabel}
          </button>
        );
      })}
    </div>
  );
}
