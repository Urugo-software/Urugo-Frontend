"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  language: "en" | "rw";
  onClose: () => void;
  onConfirm: () => void;
}

export function EditorResetConfirmModal({
  isOpen,
  language,
  onClose,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm border border-line bg-white p-5 shadow-xl space-y-3.5 text-[12.5px]">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="size-4.5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Reset to Standard 18 Clauses?
            </h3>
            <p className="mt-1 text-faint leading-relaxed">
              This will discard edits and custom clauses, restoring the canonical
              Rwandan tenancy template in{" "}
              {language === "rw" ? "Kinyarwanda" : "English"}.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end gap-2 border-t border-line">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-none border-line text-[12.5px] font-medium h-8"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="rounded-none bg-red-600 text-white hover:bg-red-700 text-[12.5px] font-semibold h-8"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
