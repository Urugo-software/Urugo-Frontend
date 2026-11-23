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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4 pt-1">
      {/* Left: Navigation and Reference */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <button
          type="button"
          onClick={onNavigateBack}
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-faint hover:text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft className="size-3.5" />
          <span>{backButtonLabel || "Back to Agreement"}</span>
        </button>
        <span className="text-faint text-[12.5px]">&middot;</span>
        <h1 className="text-sm sm:text-[15px] font-semibold text-ink">
          Edit Agreement
        </h1>
        <span className="font-mono text-[12.5px] text-faint">
          ({referenceNumber})
        </span>
        {hasUnsavedChanges && (
          <span className="text-[12.5px] text-amber-700 font-medium">
            &middot; Unsaved changes
          </span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="inline-flex items-center border border-line bg-surface p-0.5">
          <button
            type="button"
            onClick={() => onLanguageToggle("en")}
            className={`px-3 py-1 text-[12.5px] font-medium transition-colors cursor-pointer ${
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
            className={`px-3 py-1 text-[12.5px] font-medium transition-colors cursor-pointer ${
              language === "rw"
                ? "bg-white text-ink shadow-xs"
                : "text-faint hover:text-ink"
            }`}
          >
            Kinyarwanda
          </button>
        </div>

        {/* Preview Action */}
        <button
          type="button"
          onClick={onNavigateToPreview}
          className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 border border-line bg-white px-3 text-[12.5px] font-medium text-ink hover:bg-surface transition-colors"
        >
          <Eye className="size-3.5 text-faint" />
          <span>Preview</span>
        </button>

        {/* Save Changes */}
        <Button
          type="button"
          onClick={onSave}
          className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-3.5 text-[12.5px] font-medium text-white hover:bg-black transition-colors"
        >
          <Save className="size-3.5" />
          <span>Save Changes</span>
        </Button>
      </div>
    </div>
  );
}
