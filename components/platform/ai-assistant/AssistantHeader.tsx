"use client";

import { useTranslations } from "next-intl";
import { Maximize2, Minimize2, X } from "lucide-react";

interface AssistantHeaderProps {
  onClose: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export function AssistantHeader({
  onClose,
  isMaximized = false,
  onToggleMaximize,
}: AssistantHeaderProps) {
  const t = useTranslations("public.zoe");

  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2 p-3.5 sm:p-4">
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/92 px-3 py-1.5 shadow-sm backdrop-blur">
        <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
        <p className="text-xs font-bold text-ink sm:text-sm">{t("name")}</p>
        <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[12.5px] font-semibold text-brand">
          {t("previewBadge")}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {onToggleMaximize && (
          <button
            type="button"
            aria-label={isMaximized ? t("restoreAria") : t("expandAria")}
            title={isMaximized ? t("restoreTitle") : t("expandTitle")}
            className="cursor-pointer rounded-xl border border-line bg-white/92 p-2 text-body shadow-sm backdrop-blur transition hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            onClick={onToggleMaximize}
          >
            {isMaximized ? (
              <Minimize2 aria-hidden="true" className="size-4" />
            ) : (
              <Maximize2 aria-hidden="true" className="size-4" />
            )}
          </button>
        )}

        <button
          type="button"
          aria-label={t("closeAria")}
          title={t("closeTitle")}
          className="cursor-pointer rounded-xl border border-line bg-white/92 p-2 text-body shadow-sm backdrop-blur transition hover:bg-white hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          onClick={onClose}
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </header>
  );
}
