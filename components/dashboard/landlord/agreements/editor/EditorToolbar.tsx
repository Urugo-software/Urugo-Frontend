"use client";

import { Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  totalArticles: number;
  omittedCount: number;
  onOpenAddModal: () => void;
  onOpenRestoreModal: () => void;
  onOpenResetConfirm: () => void;
}

export function EditorToolbar({
  totalArticles,
  omittedCount,
  onOpenAddModal,
  onOpenRestoreModal,
  onOpenResetConfirm,
}: Props) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line pb-3 pt-1">
      <span className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
        Articles ({totalArticles})
      </span>

      <div className="flex items-center gap-2">
        {/* Add custom article */}
        <Button
          type="button"
          variant="outline"
          onClick={onOpenAddModal}
          className="inline-flex h-8 cursor-pointer items-center gap-1 rounded-none border-line bg-white px-2.5 text-[12.5px] font-medium text-ink hover:bg-surface"
        >
          <Plus className="size-3.5 text-faint" />
          <span>Add Custom Article</span>
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
            <span>Restore Omitted ({omittedCount})</span>
          </Button>
        )}

        {/* Reset to Standard 18 */}
        <button
          type="button"
          onClick={onOpenResetConfirm}
          className="text-[12.5px] text-faint hover:text-ink font-medium underline cursor-pointer ml-1"
        >
          Reset to Standard 18
        </button>
      </div>
    </div>
  );
}
