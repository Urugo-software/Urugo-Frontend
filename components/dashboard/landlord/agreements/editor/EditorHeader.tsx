"use client";

import { ArrowLeft, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgreementLanguage } from "@/types/agreement.types";

interface Props {
  referenceNumber: string;
  hasUnsavedChanges: boolean;
  language: AgreementLanguage;
  onLanguageToggle: (lang: AgreementLanguage) => void;
  onNavigateToPreview: () => void;
  onNavigateBack: () => void;
  onSave: () => void;
  backButtonLabel?: string;
}

export function EditorHeader({
  referenceNumber,
  hasUnsavedChanges,
  language,
  onLanguageToggle,
  onNavigateToPreview,
  onNavigateBack,
  onSave,
  backButtonLabel,
}: Props) {
  return (
    <div className="flex flex-col gap-3 border-b border-line pb-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex cursor-pointer items-center gap-1 text-[12.5px] font-medium text-faint transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          <span>{backButtonLabel || "Back to Agreement"}</span>
        </button>
        <span className="text-[12.5px] text-faint">&middot;</span>
        <h1 className="text-sm font-semibold text-ink sm:text-[15px]">
          Edit Agreement
        </h1>
        <span className="font-mono text-[12.5px] text-faint">
          ({referenceNumber})
        </span>
        {hasUnsavedChanges && (
          <span className="text-[12.5px] font-medium text-amber-700">
            &middot; Unsaved changes
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center border border-line bg-surface p-0.5">
          <button
            type="button"
            onClick={() => onLanguageToggle("en")}
            className={`cursor-pointer px-3 py-1 text-[12.5px] font-medium transition-colors ${
              language === "en"
                ? "bg-white text-ink shadow-xs"
                : "text-faint hover:text-ink"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageToggle("rw")}
            className={`cursor-pointer px-3 py-1 text-[12.5px] font-medium transition-colors ${
              language === "rw"
                ? "bg-white text-ink shadow-xs"
                : "text-faint hover:text-ink"
            }`}
          >
            Kinyarwanda
          </button>
        </div>

        <button
          type="button"
          onClick={onNavigateToPreview}
          className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 border border-line bg-white px-3 text-[12.5px] font-medium text-ink transition-colors hover:bg-surface"
        >
          <Eye className="size-3.5 text-faint" />
          <span>Preview</span>
        </button>

        <Button
          type="button"
          onClick={onSave}
          className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-3.5 text-[12.5px] font-medium text-white transition-colors hover:bg-black"
        >
          <Save className="size-3.5" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
}
