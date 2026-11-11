"use client";

import { X, FileText, Bookmark } from "lucide-react";
import { AgreementLanguage, SavedAgreementTemplate } from "@/types/agreement.types";
import { SAVED_AGREEMENT_TEMPLATES } from "@/data/agreement-templates";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  language: AgreementLanguage;
  onClose: () => void;
  onSelectTemplate: (template: SavedAgreementTemplate) => void;
  onSelectStandard: () => void;
}

export function SelectTemplateModal({
  isOpen,
  language,
  onClose,
  onSelectTemplate,
  onSelectStandard,
}: Props) {
  if (!isOpen) return null;

  // Filter templates matching current agreement language
  const compatibleTemplates = SAVED_AGREEMENT_TEMPLATES.filter(
    (t) => t.language === language,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl border border-line bg-white shadow-xl text-[12.5px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-4 bg-surface/30">
          <div className="flex items-center gap-2">
            <Bookmark className="size-4 text-ink" />
            <h3 className="font-bold text-ink text-sm">
              Agreement Starting Template
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-body text-xs">
            Start from Urugo&rsquo;s standard statutory agreement or load one of your previously saved templates. A working copy will be created for this tenancy.
          </p>

          {/* Option A: Standard 18 Statutory Clauses */}
          <div className="border border-line p-4 space-y-2 bg-surface/20">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-faint block">
                  Option A: Default
                </span>
                <h4 className="font-bold text-ink text-xs sm:text-sm mt-0.5">
                  Standard Statutory Lease Agreement ({language === "rw" ? "Kinyarwanda" : "English"})
                </h4>
                <p className="text-[12px] text-body mt-1">
                  18 standard legal clauses strictly aligned with Rwandan residential tenancy regulations.
                </p>
              </div>
              <Button
                type="button"
                onClick={onSelectStandard}
                className="h-8 rounded-none bg-ink text-white hover:bg-black text-[11.5px] px-3 shrink-0"
              >
                Use Standard
              </Button>
            </div>
          </div>

          {/* Option B: Saved Templates */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-faint block mb-2">
              Option B: Your Saved Templates ({language.toUpperCase()})
            </span>

            {compatibleTemplates.length === 0 ? (
              <p className="text-xs text-faint italic p-3 border border-line">
                No custom templates saved for {language === "rw" ? "Kinyarwanda" : "English"} yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {compatibleTemplates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="border border-line p-4 flex items-start justify-between gap-3 hover:border-zinc-400 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <FileText className="size-3.5 text-blue-700" />
                        <h4 className="font-bold text-ink text-xs">
                          {tpl.name}
                        </h4>
                      </div>
                      <p className="text-[11.5px] text-body">
                        {tpl.description}
                      </p>
                      <span className="text-[11px] text-faint font-mono block">
                        {tpl.articles.length} clauses &middot; Last updated: {tpl.lastModified}
                      </span>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onSelectTemplate(tpl)}
                      className="h-8 rounded-none border-line text-[11.5px] font-semibold px-3 shrink-0 hover:bg-surface"
                    >
                      Load Template
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-line px-6 py-3 bg-surface/20">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-8 rounded-none border-line text-xs font-medium px-4"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
