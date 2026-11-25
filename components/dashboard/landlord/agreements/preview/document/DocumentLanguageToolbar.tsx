"use client";

import { Printer } from "lucide-react";
import { useTranslations } from "next-intl";
import { AgreementLanguage } from "@/types/agreement.types";

interface Props {
  displayLanguage: AgreementLanguage;
  articlesCount: number;
  onLanguageChange?: (lang: AgreementLanguage) => void;
}

export function DocumentLanguageToolbar({
  displayLanguage,
  articlesCount,
  onLanguageChange,
}: Props) {
  const t = useTranslations("landlord.agreements.preview.docToolbar");
  const tEditor = useTranslations("landlord.agreements.editor");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-4 py-2.5 text-[12.5px] print:hidden">
      {/* Language Selector */}
      <div className="flex items-center gap-2">
        <span className="font-semibold uppercase tracking-wider text-faint">
          {t("label")}
        </span>
        <div className="inline-flex items-center border border-line bg-surface p-0.5">
          <button
            type="button"
            onClick={() => onLanguageChange?.("en")}
            className={`cursor-pointer px-3 py-1 font-semibold transition-colors ${
              displayLanguage === "en"
                ? "bg-white text-ink shadow-xs"
                : "text-faint hover:text-ink"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange?.("rw")}
            className={`cursor-pointer px-3 py-1 font-semibold transition-colors ${
              displayLanguage === "rw"
                ? "bg-white text-ink shadow-xs"
                : "text-faint hover:text-ink"
            }`}
          >
            Kinyarwanda
          </button>
        </div>
      </div>

      {/* Articles Count & Print Action */}
      <div className="flex items-center gap-3 text-body">
        <span className="font-mono text-faint">
          {t("articlesCount", { count: articlesCount })}
        </span>
        <span>&middot;</span>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-ink hover:underline"
        >
          <Printer className="size-3.5 text-faint" />
          <span>{tEditor("printPdf")}</span>
        </button>
      </div>
    </div>
  );
}
