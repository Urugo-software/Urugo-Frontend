"use client";

import { FileText } from "lucide-react";
import {
  AgreementLanguage,
  SavedAgreementTemplate,
} from "@/types/agreement.types";
import { SAVED_AGREEMENT_TEMPLATES } from "@/data/agreement-templates";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";

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
  const compatibleTemplates = SAVED_AGREEMENT_TEMPLATES.filter(
    (t) => t.language === language,
  );

  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      title="Agreement Starting Template"
      description="Start from Urugo's standard statutory clauses or load one of the pre-built templates. A working copy will be loaded into this draft."
      maxWidthClassName="max-w-xl"
      footer={
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-8.5 cursor-pointer rounded-none border-line px-4 text-xs font-medium"
        >
          Cancel
        </Button>
      }
    >
      <div className="space-y-4 text-[12.5px]">
        <div className="space-y-2 border border-line bg-surface/20 p-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <span className="block text-[12.5px] font-bold uppercase tracking-wider text-faint">
                Option A: Default
              </span>
              <h4 className="mt-0.5 text-[13px] font-bold text-ink sm:text-sm">
                Standard Statutory Lease Agreement (
                {language === "rw" ? "Kinyarwanda" : "English"})
              </h4>
              <p className="mt-1 text-[12.5px] text-body">
                18 standard legal clauses aligned with Rwandan residential
                tenancy regulations.
              </p>
            </div>
            <Button
              type="button"
              onClick={onSelectStandard}
              className="h-8 shrink-0 cursor-pointer rounded-none bg-ink px-3 text-[12.5px] text-white hover:bg-black"
            >
              Use Standard
            </Button>
          </div>
        </div>

        <div className="pt-1">
          <span className="mb-2 block text-[12.5px] font-bold uppercase tracking-wider text-faint">
            Option B: Pre-built Templates ({language.toUpperCase()})
          </span>

          {compatibleTemplates.length === 0 ? (
            <p className="border border-line p-3 text-[12.5px] italic text-faint">
              No additional pre-built templates available for{" "}
              {language === "rw" ? "Kinyarwanda" : "English"}.
            </p>
          ) : (
            <div className="space-y-2.5">
              {compatibleTemplates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="flex flex-col justify-between gap-3 border border-line p-4 transition-colors hover:border-zinc-400 sm:flex-row sm:items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <FileText className="size-3.5 text-brand" />
                      <h4 className="text-[13px] font-bold text-ink">
                        {tpl.name}
                      </h4>
                    </div>
                    <p className="text-[12.5px] text-body">{tpl.description}</p>
                    <span className="block font-mono text-[12.5px] text-faint">
                      {tpl.articles.length} clauses &middot; Updated:{" "}
                      {tpl.lastModified}
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onSelectTemplate(tpl)}
                    className="h-8 shrink-0 cursor-pointer rounded-none border-line px-3 text-[12.5px] font-semibold hover:bg-surface"
                  >
                    Load Template
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalDialog>
  );
}
