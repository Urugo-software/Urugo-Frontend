"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, ChevronRight, Copy, Check, ThumbsUp, ThumbsDown, ShieldCheck, MapPin, Calculator } from "lucide-react";

import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantHeader } from "./AssistantHeader";
import { PropertyMatches, PropertyMatchItem } from "./PropertyMatches";
import { AssistantAnimState } from "@/types/ai-assistant";

interface AssistantPanelProps {
  onClose: () => void;
}

export interface WidgetMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  propertyMatches?: PropertyMatchItem[];
  suggestedActions?: string[];
  badge?: string;
}

const widgetPromptSuggestions = [
  "2BR in Remera under 200k",
  "Move-in cost breakdown",
  "How to register as guest?",
  "Homes in Kacyiru",
];

const mockProperties: Record<string, PropertyMatchItem[]> = {
  remera: [
    {
      id: "w-1",
      image: "/assets/home/prop1.jpg",
      name: "2BR Modern Flat — Remera",
      location: "Remera, Kigali",
      details: "★ 4.8 · Parking · WiFi",
      price: "180,000 RWF",
      badge: "Verified",
    },
    {
      id: "w-2",
      image: "/assets/home/prop2.jpg",
      name: "2BR Apartment — Remera",
      location: "Remera, Airport Rd",
      details: "★ 4.6 · Gated Security",
      price: "195,000 RWF",
      badge: "Verified",
    },
  ],
  default: [
    {
      id: "w-3",
      image: "/assets/home/prop1.jpg",
      name: "2BR Apartment — Kimironko",
      location: "Kimironko, Kigali",
      details: "★ 4.8 · Parking · WiFi",
      price: "150,000 RWF",
      badge: "Verified",
    },
    {
      id: "w-4",
      image: "/assets/home/prop3.jpg",
      name: "2BR Residence — Kacyiru",
      location: "Kacyiru, Kigali",
      details: "★ 4.9 · Furnished",
      price: "195,000 RWF",
      badge: "Instant View",
    },
  ],
};

export function AssistantPanel({ onClose }: AssistantPanelProps) {
  const [messages, setMessages] = useState<WidgetMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hi! I'm Urugo AI. What kind of home or rental details are you looking for today in Kigali?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestedActions: ["2BR in Remera under 200k", "Move-in cost breakdown", "Guest registration"],
      badge: "AI Rental Concierge",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [animState, setAnimState] = useState<AssistantAnimState>("idle");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: WidgetMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setAnimState("thinking");

    setTimeout(() => {
      const q = text.toLowerCase();
      let reply = "";
      let matches: PropertyMatchItem[] | undefined;
      let actions: string[] = [];
      let badge = "Verified Registry Response";

      if (q.includes("remera") || q.includes("2br") || q.includes("apartment")) {
        matches = mockProperties.remera;
        badge = "2 Verified Matches";
        reply = "Here are 2 verified 2-bedroom listings in Remera with parking and high-speed internet options:";
        actions = ["Schedule a viewing", "Move-in cost breakdown", "Compare with Kimironko"];
      } else if (q.includes("move-in") || q.includes("cost") || q.includes("breakdown") || q.includes("deposit")) {
        badge = "Upfront Cost Estimation";
        reply = "Estimated upfront move-in breakdown for a 200,000 RWF/mo listing:\n\n• 1st Month Rent: 200,000 RWF\n• Security Deposit: 200,000 RWF\n• Contract & Legal Fee: ~20,000 RWF\n\nTotal Upfront: ~420,000 RWF";
        actions = ["Find listings under 200k", "Register Guest Account"];
      } else if (q.includes("register") || q.includes("guest") || q.includes("account")) {
        badge = "Quick Guest Registration";
        reply = "Guest registration on Urugo takes under 60 seconds! Just enter your Name and Phone Number to start requesting direct landlord viewings.";
        actions = ["Register now", "Browse verified listings"];
      } else {
        matches = mockProperties.default;
        reply = "I searched our Kigali rental registry. Here are top verified properties currently available:";
        actions = ["Remera apartments", "Calculate move-in costs", "Guest sign up"];
      }

      const aiMsg: WidgetMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        propertyMatches: matches,
        suggestedActions: actions,
        badge,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setAnimState("talking");
      setTimeout(() => setAnimState("idle"), 3000);
    }, 1100);
  };

  return (
    <>
      {/* Backdrop overlay when maximized */}
      {isMaximized && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMaximized(false)}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition-opacity"
        />
      )}

      <motion.aside
        aria-label="Urugo AI assistant"
        className={`fixed z-50 flex flex-col overflow-hidden border border-line bg-white shadow-2xl shadow-brand/20 transition-all duration-300 ease-in-out ${
          isMaximized
            ? "inset-3 sm:inset-6 max-w-6xl mx-auto rounded-3xl h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-3rem)]"
            : "inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[27rem] sm:max-w-[calc(100vw-3rem)] h-[min(44rem,calc(100dvh-1.5rem))] rounded-3xl"
        }`}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* 3D Robot Header Banner */}
        <div
          className={`relative shrink-0 overflow-hidden bg-gradient-to-b from-brand-tint/60 to-white transition-all duration-300 ${
            isMaximized ? "h-44 sm:h-52" : "h-36 sm:h-40"
          }`}
        >
          <div className="absolute inset-0 size-full max-w-full">
            <AssistantCanvas animState={animState} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand/15" />
          <AssistantHeader
            onClose={onClose}
            isMaximized={isMaximized}
            onToggleMaximize={() => setIsMaximized(!isMaximized)}
          />
        </div>

        {/* Messages Stream */}
        <div className="flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto bg-surface p-4 sm:p-6">
          <div className={`flex flex-col gap-4 mx-auto w-full ${isMaximized ? "max-w-4xl" : ""}`}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "user" ? (
                  <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-brand px-4 py-2.5 text-xs sm:text-sm text-white shadow-xs leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex max-w-[95%] sm:max-w-[90%] gap-2.5 items-start">
                    <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand text-white shadow-xs mt-0.5 text-[10px]">
                      <Bot className="size-4" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 rounded-2xl rounded-tl-xs border border-line bg-white p-3.5 sm:p-4 text-xs sm:text-sm text-ink shadow-xs">
                      {msg.badge && (
                        <span className="inline-flex items-center gap-1 self-start rounded-full bg-brand-tint px-2.5 py-0.5 text-[10px] font-bold text-brand">
                          <Sparkles className="size-3" />
                          {msg.badge}
                        </span>
                      )}

                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                      {msg.propertyMatches && msg.propertyMatches.length > 0 && (
                        <PropertyMatches items={msg.propertyMatches} onSelectProperty={(name) => handleSend(`Tell me more about ${name}`)} />
                      )}

                      {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1.5 pt-1.5 border-t border-line/40">
                          {msg.suggestedActions.map((action) => (
                            <button
                              key={action}
                              type="button"
                              onClick={() => handleSend(action)}
                              className="inline-flex items-center gap-1 rounded-full border border-brand/20 bg-brand-tint px-2.5 py-1 text-[11px] font-semibold text-brand transition hover:bg-brand hover:text-white"
                            >
                              {action}
                              <ChevronRight className="size-3" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="mt-0.5 flex items-center justify-between border-t border-line/30 pt-1 text-[10px] text-faint">
                        <span>{msg.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="rounded p-1 hover:bg-surface hover:text-ink transition"
                        >
                          {copiedId === msg.id ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
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
                  <Bot className="size-4 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-tl-xs border border-line bg-white px-3 py-2 text-xs text-brand shadow-xs">
                  <span className="font-semibold text-[11px]">Searching Kigali Registry</span>
                  <span className="size-1 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-1 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-1 rounded-full bg-brand animate-bounce" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </div>

        {/* Suggestion tags above input */}
        <div className="flex items-center justify-center gap-1.5 overflow-x-auto border-t border-line bg-white px-3 py-2 text-xs scrollbar-none">
          {widgetPromptSuggestions.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-body transition hover:border-brand hover:bg-brand-tint hover:text-brand"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Composer Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex min-w-0 items-center justify-center gap-2 border-t border-line bg-white p-3 sm:p-4"
        >
          <div className={`flex w-full items-center gap-2 ${isMaximized ? "max-w-4xl" : ""}`}>
            <label className="sr-only" htmlFor="assistant-message">Ask Urugo AI</label>
            <input
              ref={inputRef}
              className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-ink outline-none placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
              id="assistant-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Kigali listings, move-in costs..."
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className={`grid size-10 shrink-0 place-items-center rounded-xl transition ${
                input.trim()
                  ? "bg-brand text-white shadow-sm shadow-brand/30 hover:bg-brand-deep cursor-pointer"
                  : "bg-line text-faint cursor-not-allowed"
              }`}
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>
      </motion.aside>
    </>
  );
}
