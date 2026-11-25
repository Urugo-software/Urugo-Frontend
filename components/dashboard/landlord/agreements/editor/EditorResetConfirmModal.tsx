"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";

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
  const t = useTranslations("landlord.agreements.editor.resetModal");
  const tLangs = useTranslations("landlord.agreements.languageNames");
  const tCommon = useTranslations("common");

  return (
    <ModalDialog
      open={isOpen}
      onClose={onClose}
      variant="alert"
      maxWidthClassName="max-w-sm"
      title={t("title")}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-8.5 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
          >
            {tCommon("actions.cancel")}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="h-8.5 cursor-pointer rounded-none bg-red-600 px-4 text-[12.5px] font-semibold text-white hover:bg-red-700"
          >
            {t("confirm")}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-2.5 text-[12.5px]">
        <AlertTriangle className="mt-0.5 size-4.5 shrink-0 text-red-600" />
        <p className="leading-relaxed text-body">
          {t.rich("body", {
            language: tLangs(language),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      </div>
    </ModalDialog>
  );
}
