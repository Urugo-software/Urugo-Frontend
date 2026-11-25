"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StandardArticleDefinition } from "@/data/agreement-templates";

interface Props {
  isOpen: boolean;
  deletedArticles: StandardArticleDefinition[];
  language: "en" | "rw";
  onClose: () => void;
  onRestore: (standardNumber: number) => void;
  onRestoreAll: () => void;
}

export function RestoreArticlesModal({
  isOpen,
  deletedArticles,
  language,
  onClose,
  onRestore,
  onRestoreAll,
}: Props) {
  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      title="Restore Standard Rwandan Tenancy Articles"
      description={`${deletedArticles.length} standard clause${deletedArticles.length === 1 ? "" : "s"} currently omitted.`}
      maxWidthClassName="max-w-xl"
      footer={
        <Button
          type="button"
          onClick={onClose}
          className="h-9 cursor-pointer rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black"
        >
          Close
        </Button>
      }
    >
      <div className="text-[12.5px]">
        {deletedArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-dashed border-line p-8 text-center">
            <ShieldCheck className="mb-2 size-8 text-ink" />
            <p className="text-[12.5px] font-medium text-ink">
              All 18 standard Rwandan tenancy articles are currently present in
              your agreement.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[12.5px] text-faint">
                Restore any omitted clause without losing custom clause order.
              </span>
              <button
                type="button"
                onClick={onRestoreAll}
                className="cursor-pointer text-[12.5px] font-semibold text-ink underline hover:text-black"
              >
                Restore All ({deletedArticles.length})
              </button>
            </div>

            <div className="divide-y divide-line">
              {deletedArticles.map((def) => {
                const title = language === "rw" ? def.titleRw : def.titleEn;
                const content =
                  language === "rw" ? def.contentRw : def.contentEn;

                return (
                  <div
                    key={def.standardNumber}
                    className="flex items-start justify-between gap-3 pb-2.5 pt-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12.5px] font-semibold text-ink">
                          Standard #{def.standardNumber}
                        </span>
                        {def.isMandatory && (
                          <span className="text-[12.5px] text-faint">
                            (recommended)
                          </span>
                        )}
                      </div>
                      <h4 className="mt-0.5 text-[13px] font-semibold text-ink">
                        {title}
                      </h4>
                      <p className="mt-0.5 line-clamp-2 text-[12.5px] leading-relaxed text-faint">
                        {content}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onRestore(def.standardNumber)}
                      className="h-8 shrink-0 cursor-pointer rounded-none border-line px-3 text-[12.5px] font-medium hover:bg-surface"
                    >
                      Restore
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ModalDialog>
  );
}
