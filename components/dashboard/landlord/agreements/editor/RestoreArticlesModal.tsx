"use client";

import { X, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-xl border border-line bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 bg-surface/50">
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center bg-ink text-white">
              <RotateCcw className="size-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Restore Standard Rwandan Tenancy Articles
              </h3>
              <p className="text-[12.5px] text-faint">
                {deletedArticles.length} standard clause{deletedArticles.length > 1 ? "s" : ""} currently omitted
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-faint hover:text-ink cursor-pointer p-1"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-[12.5px]">
          {deletedArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-line">
              <ShieldCheck className="size-8 text-ink mb-2" />
              <p className="text-[12.5px] font-medium text-ink">
                All 18 standard Rwandan tenancy articles are currently present in your agreement.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-line">
                <span className="text-[12.5px] text-faint">
                  Click restore to add the clause back to its standard order.
                </span>
                <button
                  type="button"
                  onClick={onRestoreAll}
                  className="text-[12.5px] font-semibold text-ink underline hover:text-black cursor-pointer"
                >
                  Restore All ({deletedArticles.length})
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 divide-y divide-line">
                {deletedArticles.map((def) => {
                  const title = language === "rw" ? def.titleRw : def.titleEn;
                  const content = language === "rw" ? def.contentRw : def.contentEn;

                  return (
                    <div
                      key={def.standardNumber}
                      className="pt-3 pb-2 flex items-start justify-between gap-3"
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
                        <h4 className="text-[13px] font-semibold text-ink mt-0.5">{title}</h4>
                        <p className="text-[12.5px] text-faint line-clamp-2 mt-0.5 leading-relaxed">
                          {content}
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onRestore(def.standardNumber)}
                        className="rounded-none border-line text-[12.5px] font-medium shrink-0 h-8 px-3 hover:bg-surface"
                      >
                        Restore
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="pt-4 mt-4 flex justify-end border-t border-line">
            <Button
              type="button"
              onClick={onClose}
              className="rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-8.5 px-4"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
