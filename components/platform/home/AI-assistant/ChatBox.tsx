"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ArrowUpRight, Bot, Send } from "lucide-react";

import { useUiStore } from "@/store/ui.store";

const SAMPLE_PROMPT_KEYS = ["1", "2", "3", "4"] as const;

interface ChatPreviewForm {
  prompt: string;
}

function ChatBox() {
  const t = useTranslations("public.home.zoePreview");
  const openAssistant = useUiStore((s) => s.openAssistant);
  const { register, handleSubmit, reset } = useForm<ChatPreviewForm>({
    defaultValues: { prompt: "" },
  });

  const onSubmit = ({ prompt }: ChatPreviewForm) => {
    const trimmed = prompt.trim();
    openAssistant(trimmed || undefined);
    reset();
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-brand/5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center text-brand">
            <Bot aria-hidden="true" className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-bold leading-none text-ink">Zoe</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => openAssistant()}
          className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
        >
          <span>{t("tryIt")}</span>
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </button>
      </div>

      {/* Preview Conversation */}
      <div className="flex min-h-[240px] flex-col gap-4 bg-surface/70 p-5">
        <div className="flex max-w-[85%] flex-col items-end gap-1 self-end">
          <div className="rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm leading-relaxed text-white shadow-xs">
            {t("msgUser1")}
          </div>
          <span className="text-xs text-faint">{t("homeSeeker")}</span>
        </div>

        <div className="flex max-w-[88%] flex-col items-start gap-1 self-start">
          <div className="rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-2xs">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              {t("matchingListings")}
            </span>
            {t("msgZoe1")}
          </div>
          <span className="text-xs text-faint">Zoe</span>
        </div>

        <div className="flex max-w-[85%] flex-col items-end gap-1 self-end">
          <div className="rounded-2xl rounded-br-sm bg-brand px-4 py-2.5 text-sm leading-relaxed text-white shadow-xs">
            {t("msgUser2")}
          </div>
          <span className="text-xs text-faint">{t("homeSeeker")}</span>
        </div>

        <div className="flex max-w-[88%] flex-col items-start gap-1 self-start">
          <div className="rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-2xs">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand">
              <span className="inline-block size-1.5 rounded-full bg-brand" />
              {t("costGuidance")}
            </span>
            {t("msgZoe2")}
          </div>
          <span className="text-xs text-faint">Zoe</span>
        </div>
      </div>

      {/* Quick Interactive Prompts */}
      <div className="flex flex-wrap gap-1.5 border-t border-line bg-white px-4 py-3">
        {SAMPLE_PROMPT_KEYS.map((key) => {
          const item = t(`samplePrompts.${key}`);
          return (
            <button
              key={key}
              type="button"
              onClick={() => openAssistant(item)}
              className="cursor-pointer rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-body transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Live Launcher Composer */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2.5 border-t border-line bg-white px-4 py-3"
      >
        <label htmlFor="landing-ai-prompt" className="sr-only">
          {t("askLabel")}
        </label>
        <input
          id="landing-ai-prompt"
          type="text"
          placeholder={t("inputPlaceholder")}
          className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3.5 text-sm text-ink placeholder:text-faint transition-colors focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/15"
          {...register("prompt")}
        />
        <button
          type="submit"
          aria-label={t("askLabel")}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-brand text-white shadow-xs transition-colors hover:bg-brand-deep"
        >
          <Send aria-hidden="true" className="size-4" />
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
