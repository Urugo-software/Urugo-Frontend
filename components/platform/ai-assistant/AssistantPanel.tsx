"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  Bot,
  Check,
  ChevronRight,
  Copy,
  Info,
  Send,
  Sparkles,
} from "lucide-react";

import { listed_properties } from "@/data/properties";
import type { AssistantAnimState } from "@/types/ai-assistant";
import { parseNumericPrice } from "@/utils/public-properties";
import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantHeader } from "./AssistantHeader";
import { PropertyMatches, type PropertyMatchItem } from "./PropertyMatches";

interface AssistantPanelProps {
  onClose: () => void;
  initialPrompt?: string | null;
  onConsumePrompt?: () => void;
}

interface WidgetMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  propertyMatches?: PropertyMatchItem[];
  suggestedActions?: string[];
  badge?: string;
}

interface ComposerForm {
  message: string;
}

type ZoeTranslator = ReturnType<typeof useTranslations<"public.zoe">>;

const SUGGESTION_CHIP_KEYS = [
  "studioKacyiru",
  "twoBrKimironko",
  "moveInCosts",
  "landlordModes",
] as const;

function toMatchItem(
  item: (typeof listed_properties)[number],
  t: ZoeTranslator,
): PropertyMatchItem {
  return {
    id: item.id,
    image: item.image,
    name: item.headline,
    location: item.location,
    details: `${t("matches.beds", { count: item.beds })} · ${t("matches.baths", { count: item.baths })}${item.parking ? ` · ${t("matches.parking")}` : ""}`,
    price: `${item.price} ${item.currency}`,
    isVerified: item.isVerified,
  };
}

function buildPreviewReply(
  queryText: string,
  t: ZoeTranslator,
): Omit<WidgetMessage, "id" | "role" | "timestamp"> {
  const q = queryText.toLowerCase();

  if (
    q.includes("listing-only") ||
    q.includes("managed") ||
    q.includes("landlord") ||
    q.includes("kwamamaza") ||
    q.includes("gucunga") ||
    q.includes("nyir'inzu") ||
    q.includes("nyirinzu")
  ) {
    return {
      badge: t("replies.landlordBadge"),
      content: t("replies.landlordContent"),
      suggestedActions: [t("chips.browseHomes"), t("chips.moveInCosts")],
    };
  }

  if (
    q.includes("move-in") ||
    q.includes("cost") ||
    q.includes("deposit") ||
    q.includes("afford") ||
    q.includes("kwimuka") ||
    q.includes("ikiguzi") ||
    q.includes("ingwate")
  ) {
    return {
      badge: t("replies.moveInBadge"),
      content: t("replies.moveInContent"),
      suggestedActions: [t("chips.studioKacyiru"), t("chips.twoBrKimironko")],
    };
  }

  if (
    q.includes("visit") ||
    q.includes("viewing") ||
    q.includes("sign") ||
    q.includes("register") ||
    q.includes("gusura") ||
    q.includes("isura") ||
    q.includes("iyandikishe")
  ) {
    return {
      badge: t("replies.visitBadge"),
      content: t("replies.visitContent"),
      suggestedActions: [t("chips.browseHomes"), t("chips.landlordModes")],
    };
  }

  const areaMatches = listed_properties.filter((item) => {
    const hay = `${item.headline} ${item.location}`.toLowerCase();
    const areaHit =
      (q.includes("kacyiru") && hay.includes("kacyiru")) ||
      (q.includes("kimironko") && hay.includes("kimironko")) ||
      (q.includes("kicukiro") && hay.includes("kicukiro")) ||
      (q.includes("nyarutarama") && hay.includes("nyarutarama")) ||
      (q.includes("gacuriro") && hay.includes("gacuriro")) ||
      ((q.includes("studio") || q.includes("situdiyo")) &&
        hay.includes("studio")) ||
      (q.includes("villa") && hay.includes("villa")) ||
      ((q.includes("2br") || q.includes("ibyumba 2")) && item.beds === 2);

    const underMatch = q.match(/(?:under|munsi ya)\s+(\d+)\s*k?/);
    if (underMatch) {
      const raw = Number(underMatch[1]);
      const cap = raw < 1000 ? raw * 1000 : raw;
      const hasAreaKeyword =
        /kacyiru|kimironko|kicukiro|nyarutarama|gacuriro/.test(q);
      return (
        parseNumericPrice(item.price) <= cap && (areaHit || !hasAreaKeyword)
      );
    }
    return areaHit;
  });

  const selected = (
    areaMatches.length > 0 ? areaMatches : listed_properties.slice(0, 3)
  ).map((item) => toMatchItem(item, t));

  return {
    badge: t("replies.listingsBadge", { count: selected.length }),
    content:
      areaMatches.length > 0
        ? t("replies.listingsMatched", { count: selected.length })
        : t("replies.listingsFallback"),
    propertyMatches: selected,
    suggestedActions: [t("chips.moveInCosts"), t("chips.landlordModes")],
  };
}

export function AssistantPanel({
  onClose,
  initialPrompt,
  onConsumePrompt,
}: AssistantPanelProps) {
  const t = useTranslations("public.zoe");
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const [animState, setAnimState] = useState<AssistantAnimState>("idle");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<ComposerForm>({
    defaultValues: { message: "" },
  });

  const isTyping = pendingQuery !== null;

  const welcomeMessage: WidgetMessage = {
    id: "welcome-1",
    role: "assistant",
    content: t("welcomeMessage"),
    timestamp: t("justNow"),
    suggestedActions: [
      t("chips.studioKacyiru"),
      t("chips.moveInCosts"),
      t("chips.landlordModes"),
    ],
    badge: t("welcomeBadge"),
  };

  const allMessages = [welcomeMessage, ...messages];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!pendingQuery) return;
    const query = pendingQuery;
    const replyTimer = setTimeout(() => {
      const replyData = buildPreviewReply(query, t);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${crypto.randomUUID()}`,
          role: "assistant",
          timestamp: t("justNow"),
          ...replyData,
        },
      ]);
      setPendingQuery(null);
      setAnimState("talking");
    }, 600);
    return () => clearTimeout(replyTimer);
  }, [pendingQuery, t]);

  useEffect(() => {
    if (animState !== "talking") return;
    const idleTimer = setTimeout(() => setAnimState("idle"), 2400);
    return () => clearTimeout(idleTimer);
  }, [animState]);

  const queueMessage = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `u-${crypto.randomUUID()}`,
        role: "user",
        content: trimmed,
        timestamp: t("justNow"),
      },
    ]);
    setAnimState("thinking");
    setPendingQuery(trimmed);
  };

  useEffect(() => {
    if (!initialPrompt) return;
    const queued = initialPrompt.trim();
    onConsumePrompt?.();
    if (!queued) return;
    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `u-${crypto.randomUUID()}`,
          role: "user",
          content: queued,
          timestamp: t("justNow"),
        },
      ]);
      setAnimState("thinking");
      setPendingQuery(queued);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialPrompt, onConsumePrompt, t]);

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const onComposerSubmit = ({ message }: ComposerForm) => {
    queueMessage(message);
    reset();
  };

  return (
    <>
      {isMaximized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMaximized(false)}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-xs"
        />
      )}

      <motion.aside
        role="dialog"
        aria-modal={isMaximized}
        aria-label={t("name")}
        className={`fixed z-50 flex flex-col overflow-hidden border border-line bg-white shadow-2xl shadow-brand/15 transition-all duration-300 ease-in-out ${
          isMaximized
            ? "inset-3 mx-auto h-[calc(100dvh-1.5rem)] max-w-5xl rounded-2xl sm:inset-6 sm:h-[calc(100dvh-3rem)]"
            : "inset-x-3 bottom-3 h-[min(42rem,calc(100dvh-1.5rem))] rounded-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[27rem] sm:max-w-[calc(100vw-3rem)]"
        }`}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <div
          className={`relative shrink-0 overflow-hidden bg-gradient-to-b from-brand-tint/60 to-white transition-all duration-300 ${
            isMaximized ? "h-40 sm:h-44" : "h-32 sm:h-36"
          }`}
        >
          <div className="absolute inset-0 size-full max-w-full">
            <AssistantCanvas animState={animState} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand/15" />
          <AssistantHeader
            onClose={onClose}
            isMaximized={isMaximized}
            onToggleMaximize={() => setIsMaximized((prev) => !prev)}
          />
        </div>

        <div className="flex items-center gap-2 border-b border-line bg-brand-tint/40 px-4 py-2 text-xs text-brand-deep">
          <Info aria-hidden="true" className="size-3.5 shrink-0 text-brand" />
          <span>{t("previewNotice")}</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-surface p-4 sm:p-5">
          <div
            className={`mx-auto flex w-full flex-col gap-4 ${isMaximized ? "max-w-4xl" : ""}`}
          >
            {allMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-brand px-4 py-2.5 text-sm leading-relaxed text-white shadow-xs sm:max-w-[75%]">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex max-w-[96%] items-start gap-2.5 sm:max-w-[92%]">
                    <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-brand text-white shadow-xs">
                      <Bot aria-hidden="true" className="size-4" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-2xl rounded-tl-xs border border-line bg-white p-3.5 text-sm text-ink shadow-2xs sm:p-4">
                      {msg.badge && (
                        <span className="inline-flex items-center gap-1 self-start rounded-full bg-brand-tint px-2.5 py-0.5 text-[12.5px] font-bold text-brand">
                          <Sparkles aria-hidden="true" className="size-3" />
                          {msg.badge}
                        </span>
                      )}

                      <p className="whitespace-pre-wrap leading-relaxed">
                        {msg.content}
                      </p>

                      {msg.propertyMatches &&
                        msg.propertyMatches.length > 0 && (
                          <PropertyMatches
                            items={msg.propertyMatches}
                            compact={!isMaximized}
                            onNavigate={onClose}
                          />
                        )}

                      {msg.suggestedActions &&
                        msg.suggestedActions.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1.5 border-t border-line/40 pt-2">
                            {msg.suggestedActions.map((action) => (
                              <button
                                key={action}
                                type="button"
                                onClick={() => queueMessage(action)}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-brand/20 bg-brand-tint px-2.5 py-1 text-[12.5px] font-semibold text-brand transition hover:bg-brand hover:text-white"
                              >
                                <span>{action}</span>
                                <ChevronRight
                                  aria-hidden="true"
                                  className="size-3"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                      <div className="mt-0.5 flex items-center justify-between border-t border-line/30 pt-1 text-xs text-faint">
                        <span>{msg.timestamp}</span>
                        <button
                          type="button"
                          aria-label={t("copyResponseAria")}
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="cursor-pointer rounded p-1 transition hover:bg-surface hover:text-ink"
                        >
                          {copiedId === msg.id ? (
                            <Check
                              aria-hidden="true"
                              className="size-3.5 text-success"
                            />
                          ) : (
                            <Copy aria-hidden="true" className="size-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-body">
                <div className="grid size-7 place-items-center rounded-lg bg-brand text-white shadow-xs">
                  <Bot aria-hidden="true" className="size-4 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-xs border border-line bg-white px-3 py-2 text-xs text-brand shadow-2xs">
                  <span className="font-semibold">{t("checkingListings")}</span>
                  <span className="size-1 animate-bounce rounded-full bg-brand [animation-delay:-0.3s]" />
                  <span className="size-1 animate-bounce rounded-full bg-brand [animation-delay:-0.15s]" />
                  <span className="size-1 animate-bounce rounded-full bg-brand" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto border-t border-line bg-white px-3 py-2 text-xs">
          {SUGGESTION_CHIP_KEYS.map((key) => {
            const prompt = t(`chips.${key}`);
            return (
              <button
                key={key}
                type="button"
                onClick={() => queueMessage(prompt)}
                className="shrink-0 cursor-pointer rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] font-medium text-body transition hover:border-brand hover:bg-brand-tint hover:text-brand"
              >
                {prompt}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit(onComposerSubmit)}
          className="flex min-w-0 items-center justify-center gap-2 border-t border-line bg-white p-3 sm:p-4"
        >
          <div
            className={`flex w-full items-center gap-2 ${isMaximized ? "max-w-4xl" : ""}`}
          >
            <label className="sr-only" htmlFor="assistant-message">
              {t("inputLabel")}
            </label>
            <input
              id="assistant-message"
              type="text"
              placeholder={t("inputPlaceholder")}
              className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-faint focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
              {...register("message")}
            />
            <button
              type="submit"
              aria-label={t("sendAria")}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-brand text-white shadow-xs transition hover:bg-brand-deep"
            >
              <Send aria-hidden="true" className="size-4" />
            </button>
          </div>
        </form>
      </motion.aside>
    </>
  );
}
