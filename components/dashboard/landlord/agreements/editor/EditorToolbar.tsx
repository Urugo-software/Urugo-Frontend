"use client";

import { Plus, RotateCcw, Bookmark } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Props {
  totalArticles: number;
  omittedCount: number;
  onOpenAddModal: () => void;
  onOpenRestoreModal: () => void;
  onOpenResetConfirm: () => void;
  onOpenTemplateModal?: () => void;
}

export function EditorToolbar({
  totalArticles,
  omittedCount,
  onOpenAddModal,
  onOpenRestoreModal,
  onOpenResetConfirm,
  onOpenTemplateModal,
}: Props) {
  const t = useTranslations("landlord.agreements.editor");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3 pt-1">
      <span className="text-[12.5px] font-semibold uppercase tracking-wider text-ink">
        {t("toolbar.articlesCount", { count: totalArticles })}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {/* Template Selector */}
        {onOpenTemplateModal && (
          <Button
            type="button"
            variant="outline"
            onClick={onOpenTemplateModal}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-none border-line bg-white px-2.5 text-[12.5px] font-medium text-ink hover:bg-surface"
          >
            <Bookmark className="size-3.5 text-faint" />
            <span>{t("toolbar.templates")}</span>
          </Button>
        )}

        {/* Add custom article */}
        <Button
          type="button"
          variant="outline"
          onClick={onOpenAddModal}
          className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-none border-line bg-white px-2.5 text-[12.5px] font-medium text-ink hover:bg-surface"
        >
          <Plus className="size-3.5 text-faint" />
          <span>{t("addCustomArticle")}</span>
        </Button>

        {/* Restore omitted standard articles */}
        {omittedCount > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={onOpenRestoreModal}
            className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-none border-amber-300 bg-amber-50/70 px-2.5 text-[12.5px] font-medium text-amber-900 hover:bg-amber-100"
          >
            <RotateCcw className="size-3.5" />
            <span>{t("toolbar.restoreOmitted", { count: omittedCount })}</span>
          </Button>
        )}

        {/* Reset to Standard 18 */}
        <button
          type="button"
          onClick={onOpenResetConfirm}
          className="ml-1 cursor-pointer text-[12.5px] font-medium text-faint underline hover:text-ink"
        >
          {t("toolbar.resetStandard")}
        </button>
      </div>
    </div>
  );
}
