"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Building2, MessageSquareText } from "lucide-react";

import { useUiStore } from "@/store/ui.store";

function LeftSide() {
  const t = useTranslations("properties.sidebarPromo");
  const tActions = useTranslations("common.actions");
  const openAssistant = useUiStore((s) => s.openAssistant);

  return (
    <aside
      aria-label={t("asideAria")}
      className="hidden h-full w-[300px] shrink-0 flex-col gap-4 md:flex"
    >
      <div className="rounded-2xl bg-brand p-6 text-white shadow-md">
        <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-white/15">
          <Building2 aria-hidden="true" className="size-4 text-white" />
        </div>
        <h2 className="mb-1.5 text-base font-extrabold">
          {t("landlordTitle")}
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed text-white/85">
          {t("landlordDescription")}
        </p>
        <Link
          href="/auth/sign-up"
          className="flex w-full justify-center rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-brand transition-colors hover:bg-surface"
        >
          {tActions("listYourProperty")}
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5.5 transition-all hover:border-brand/30 hover:shadow-xs">
        <div className="mb-3.5 flex size-9 items-center justify-center rounded-[10px] bg-brand-tint">
          <MessageSquareText
            aria-hidden="true"
            size={16}
            className="text-brand"
          />
        </div>
        <h2 className="mb-1.5 text-[14.5px] font-bold text-ink">
          {t("zoeTitle")}
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-body">
          {t("zoeDescription")}
        </p>
        <button
          type="button"
          onClick={() => openAssistant()}
          className="flex w-full cursor-pointer justify-center rounded-full border border-line px-4 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
        >
          {t("askZoe")}
        </button>
      </div>
    </aside>
  );
}

export default LeftSide;
