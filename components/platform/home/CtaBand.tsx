"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

import { useUiStore } from "@/store/ui.store";

function CtaBand() {
  const t = useTranslations("public.home.ctaBand");
  const openAssistant = useUiStore((s) => s.openAssistant);

  return (
    <div className="overflow-hidden pt-8">
      <div className="relative overflow-hidden rounded-3xl bg-brand/95 px-6 py-12 text-center text-white sm:px-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-25 h-[380px] w-[380px] rounded-full bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-45 -left-20 h-[380px] w-[380px] rounded-full bg-white/10"
        />

        <div className="relative z-10">
          <h2 className="mb-3.5 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            {t("description")}
          </p>

          <div className="flex flex-wrap justify-center gap-3.5">
            <Link
              href="/auth/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-6 text-sm font-semibold text-brand transition-colors hover:bg-surface"
            >
              <span>{t("createAccount")}</span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>

            <button
              type="button"
              onClick={() => openAssistant()}
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/80 bg-white/10 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Sparkles aria-hidden="true" className="size-4" />
              <span>{t("askZoe")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CtaBand;
