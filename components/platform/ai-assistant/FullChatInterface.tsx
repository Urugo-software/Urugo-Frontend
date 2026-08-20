"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Building2,
  MapPin,
  Calculator,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  Bot,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Info,
  Zap,
} from "lucide-react";
import { PropertyMatches, PropertyMatchItem } from "./PropertyMatches";
import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantAnimState } from "@/types/ai-assistant";

export interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  propertyMatches?: PropertyMatchItem[];
  suggestedActions?: string[];
  badge?: string;
}

const quickPrompts = [
  {
    icon: Building2,
    title: "Find 2-BR in Remera",
    prompt: "Show me verified 2-bedroom apartments in Remera under 200,000 RWF with parking.",
    tag: "Property Search",
  },
  {
    icon: Calculator,
    title: "Move-In Cost Breakdown",
    prompt: "Can you break down all upfront costs (rent, deposit, contract fee) for a 200k RWF listing?",
    tag: "Finance",
  },
  {
    icon: UserCheck,
    title: "Guest Registration",
    prompt: "How can I quickly register as a renter on Urugo to book viewings?",
    tag: "Account",
  },
  {
    icon: MapPin,
    title: "Kacyiru & Kimironko Homes",
    prompt: "Compare available homes in Kacyiru vs Kimironko under 250,000 RWF.",
    tag: "Location Guide",
  },
];

const mockKigaliProperties: Record<string, PropertyMatchItem[]> = {
  remera: [
    {
      id: "rem-1",
      image: "/assets/home/prop1.jpg",
      name: "2BR Modern Flat — Remera Corner",
      location: "Remera, near Stadium",
      details: "★ 4.8 · Parking · High-speed WiFi · Water included",
      price: "180,000 RWF",
      badge: "Verified Registry",
    },
    {
      id: "rem-2",
      image: "/assets/home/prop2.jpg",
      name: "2BR Serviced Apartment — Remera",
      location: "Remera, Airport Rd",
      details: "★ 4.6 · Gated Security · Dedicated Parking",
      price: "195,000 RWF",
      badge: "Instant View",
    },
  ],
  kimironko: [
    {
      id: "kim-1",
      image: "/assets/home/prop3.jpg",
      name: "2BR Sunny Residence — Kimironko",
      location: "Kimironko, Market area",
      details: "★ 4.9 · Parking · Water & Security included",
      price: "150,000 RWF",
      badge: "Verified",
    },
  ],
  kacyiru: [
    {
      id: "kac-1",
      image: "/assets/home/prop4.jpg",
      name: "2BR Executive Residence — Kacyiru",
      location: "Kacyiru, Ministeries area",
      details: "★ 4.9 · City View · Fully Furnished · Backup Power",
      price: "240,000 RWF",
      badge: "Premium Verified",
    },
  ],
};

const defaultPropertiesList: PropertyMatchItem[] = [
  {
    id: "prop-1",
    image: "/assets/home/prop1.jpg",
    name: "2BR Apartment — Kimironko",
    location: "Kimironko, Kigali",
    details: "★ 4.8 · Parking · WiFi included",
    price: "150,000 RWF",
    badge: "Verified",
  },
  {
    id: "prop-2",
    image: "/assets/home/prop2.jpg",
    name: "2BR Apartment — Kabeza",
    location: "Kabeza, Kigali",
    details: "★ 4.6 · Parking · Water incl.",
    price: "180,000 RWF",
    badge: "Verified",
  },
  {
    id: "prop-3",
    image: "/assets/home/prop3.jpg",
    name: "2BR Residence — Kacyiru",
    location: "Kacyiru, Kigali",
    details: "★ 4.9 · Parking · Furnished",
    price: "195,000 RWF",
    badge: "Instant Tour",
  },
];

export function FullChatInterface() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [animState, setAnimState] = useState<AssistantAnimState>("idle");
  const [showRobot, setShowRobot] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: "up" | "down") => {
    setFeedback((prev) => ({ ...prev, [id]: type }));
  };

  const generateAIResponse = (userText: string) => {
    setIsTyping(true);
    setAnimState("thinking");

    const query = userText.toLowerCase();

    setTimeout(() => {
      let responseText = "";
      let matches: PropertyMatchItem[] | undefined;
      let actions: string[] = [];
      let badgeTag = "Urugo AI Recommendation";

      if (query.includes("remera") || query.includes("kimironko") || query.includes("kacyiru")) {
        let loc = "Remera";
        if (query.includes("kimironko")) loc = "Kimironko";
        if (query.includes("kacyiru")) loc = "Kacyiru";

        matches = mockKigaliProperties[loc.toLowerCase()] || defaultPropertiesList;
        badgeTag = `${matches.length} Matches Found in ${loc}`;
        responseText = `I found **${matches.length} verified listings** matching your search criteria in **${loc}**. All properties are directly registered with verified Kigali property managers and include parking options.`;
        actions = [`Move-in breakdown for ${matches[0]?.name || "listing"}`, "Schedule physical viewing", "Filter by price"];
      } else if (query.includes("move-in") || query.includes("cost") || query.includes("breakdown") || query.includes("deposit")) {
        badgeTag = "Move-In Financial Calculator";
        responseText = `Here is the estimated **Upfront Move-In Cost Breakdown** based on standard Kigali rental registry guidelines:

• **First Month's Rent**: 200,000 RWF
• **Security Deposit** (1 Month): 200,000 RWF (Refundable upon checkout)
• **Legal Contract & Registration Fee**: ~20,000 RWF (10%)
• **Water & Electricity Meter Connection**: ~15,000 RWF

**Total Estimated Initial Payment**: **435,000 RWF**

*Note: You can request tailored payment schedules directly through verified Urugo landlords.*`;
        actions = ["Find listings under 200k", "Schedule a viewing", "Speak to support"];
      } else if (query.includes("register") || query.includes("guest") || query.includes("account") || query.includes("sign up")) {
        badgeTag = "Guest Account Verification";
        responseText = `Creating a **Guest Renter Account** on Urugo takes less than **60 seconds**:

1. Provide your **Full Name**, **Phone Number**, and **Email Address**.
2. Receive your instant guest verification PIN via SMS.
3. Access direct landlord contacts, schedule free physical viewings, and save favorite properties!

Would you like me to register your guest session right now?`;
        actions = ["Register Guest Account", "Continue as Guest", "View Privacy Policy"];
      } else {
        matches = defaultPropertiesList;
        badgeTag = "Smart Rental Concierge";
        responseText = `Welcome to Urugo AI Assistant! I can help you find verified homes, estimate move-in costs, or connect with certified Kigali property managers.

Here are a few verified listings currently active on the Urugo registry:`;
        actions = ["2BR under 200k in Remera", "Move-in cost calculator", "Schedule viewing"];
      }

      const assistantMsg: MessageItem = {
        id: `msg-${Date.now()}`,
        role: "assistant",
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        propertyMatches: matches,
        suggestedActions: actions,
        badge: badgeTag,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      setAnimState("talking");

      setTimeout(() => setAnimState("idle"), 3000);
    }, 1200);
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    generateAIResponse(messageText);
  };

  const handleClearChat = () => {
    setMessages([]);
    setAnimState("greeting");
    setTimeout(() => setAnimState("idle"), 2000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-surface">
      {/* Top Professional Header Bar */}
      <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-line bg-white/90 px-4 py-3 shadow-xs backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative grid size-10 place-items-center rounded-2xl bg-brand text-white shadow-md shadow-brand/20">
            <Bot className="size-5" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-success" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-ink">Urugo AI Assistant</h1>
              <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-[11px] font-bold text-brand border border-brand/10">
                v2.4 Live
              </span>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-body">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              Connected to Kigali Property Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowRobot(!showRobot)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              showRobot
                ? "border-brand bg-brand-tint text-brand shadow-xs"
                : "border-line bg-surface text-body hover:bg-white hover:text-ink"
            }`}
          >
            <Sparkles className="size-3.5 text-brand" />
            <span className="hidden sm:inline">{showRobot ? "Hide 3D Robot" : "3D Robot Visualizer"}</span>
            <span className="sm:hidden">3D</span>
          </button>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleClearChat}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-body transition hover:bg-white hover:text-ink"
              title="Reset conversation"
            >
              <RotateCcw className="size-3.5" />
              <span className="hidden sm:inline">New Chat</span>
            </button>
          )}

          <div className="hidden items-center gap-1 rounded-full bg-success-tint px-3 py-1 text-xs font-bold text-success md:flex">
            <ShieldCheck className="size-3.5" />
            Guest Session Active
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">
        {/* Chat Thread Container */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6 md:px-8">
          {messages.length === 0 ? (
            /* Welcome / Empty Hero Screen (ChatGPT Style) */
            <div className="my-auto mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center py-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-tint px-4 py-1.5 text-xs font-bold text-brand shadow-xs">
                <Zap className="size-3.5 text-brand" />
                Next-Gen Kigali Real Estate Concierge
              </div>

              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
                What home are you looking for?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-body sm:text-base">
                Ask about verified rental listings, upfront move-in breakdowns, location comparisons, or direct landlord viewings in Kigali.
              </p>

              {/* 4 Quick Prompt Cards Grid */}
              <div className="mt-8 grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2">
                {quickPrompts.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleSend(item.prompt)}
                      className="group flex flex-col items-start rounded-2xl border border-line bg-white p-4 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md hover:shadow-brand/5"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="grid size-9 place-items-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                          <IconComponent className="size-4" />
                        </span>
                        <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-faint group-hover:text-body">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 text-sm font-bold text-ink group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-body line-clamp-2 leading-relaxed">
                        &quot;{item.prompt}&quot;
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Message Stream */
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  {/* User Message Bubble */}
                  {msg.role === "user" ? (
                    <div className="flex max-w-[85%] flex-col items-end gap-1 sm:max-w-[75%]">
                      <div className="rounded-2xl rounded-tr-xs bg-brand px-5 py-3.5 text-sm text-white shadow-md shadow-brand/10 leading-relaxed">
                        {msg.content}
                      </div>
                      <span className="text-[11px] text-faint px-1">{msg.timestamp}</span>
                    </div>
                  ) : (
                    /* Assistant Message Card */
                    <div className="flex max-w-[95%] sm:max-w-[90%] gap-3 items-start">
                      <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand font-bold text-white shadow-sm mt-1">
                        <Bot className="size-4" />
                      </div>

                      <div className="flex flex-1 flex-col gap-3 rounded-2xl rounded-tl-xs border border-line bg-white p-4 text-sm text-ink shadow-xs">
                        {msg.badge && (
                          <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-brand-tint px-3 py-1 text-[11px] font-bold text-brand">
                            <Sparkles className="size-3 text-brand" />
                            {msg.badge}
                          </div>
                        )}

                        <div className="prose prose-sm max-w-none text-ink leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </div>

                        {/* Property Cards Embedded inside Assistant Stream */}
                        {msg.propertyMatches && msg.propertyMatches.length > 0 && (
                          <PropertyMatches items={msg.propertyMatches} onSelectProperty={(name) => handleSend(`Tell me more about ${name}`)} />
                        )}

                        {/* Interactive Suggestion Chips */}
                        {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2 pt-2 border-t border-line/50">
                            {msg.suggestedActions.map((action) => (
                              <button
                                key={action}
                                type="button"
                                onClick={() => handleSend(action)}
                                className="inline-flex items-center gap-1 rounded-full border border-brand/20 bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white"
                              >
                                {action}
                                <ChevronRight className="size-3" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Message Toolbar */}
                        <div className="mt-1 flex items-center justify-between pt-2 border-t border-line/40 text-xs text-faint">
                          <span>{msg.timestamp}</span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="rounded-lg p-1.5 transition hover:bg-surface hover:text-ink"
                              title="Copy message"
                            >
                              {copiedId === msg.id ? (
                                <span className="inline-flex items-center gap-1 text-success font-bold text-[11px]">
                                  <Check className="size-3.5" /> Copied
                                </span>
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, "up")}
                              className={`rounded-lg p-1.5 transition ${
                                feedback[msg.id] === "up" ? "text-brand bg-brand-tint" : "hover:bg-surface hover:text-ink"
                              }`}
                              title="Helpful"
                            >
                              <ThumbsUp className="size-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, "down")}
                              className={`rounded-lg p-1.5 transition ${
                                feedback[msg.id] === "down" ? "text-warn bg-warn-tint" : "hover:bg-surface hover:text-ink"
                              }`}
                              title="Not helpful"
                            >
                              <ThumbsDown className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Animated Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand font-bold text-white shadow-sm mt-1">
                    <Bot className="size-4 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-line bg-white px-4 py-3 text-sm text-body shadow-xs">
                    <span className="text-xs font-semibold text-brand mr-1">Urugo AI thinking</span>
                    <span className="size-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-brand animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-brand animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* 3D Robot Visualizer Side Drawer */}
        <AnimatePresence>
          {showRobot && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "320px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="hidden lg:flex shrink-0 flex-col border-l border-line bg-white/70 backdrop-blur-md overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-line p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-brand" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ink">3D Robot Companion</h3>
                </div>
                <span className="rounded-full bg-brand-tint px-2 py-0.5 text-[10px] font-bold text-brand capitalize">
                  {animState}
                </span>
              </div>
              <div className="relative flex-1 min-h-[300px] w-full bg-gradient-to-b from-brand-tint/30 to-white">
                <AssistantCanvas animState={animState} />
              </div>
              <div className="p-4 border-t border-line text-center text-xs text-body">
                <p className="font-semibold text-ink">Urugo AI Assistant Bot</p>
                <p className="mt-0.5 text-[11px] text-faint">Reacts visually as it searches listings & answers queries.</p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* ChatGPT-Style Bottom Composer Bar */}
      <footer className="sticky bottom-0 z-20 shrink-0 border-t border-line bg-white/95 p-3 sm:p-4 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-2">
          {/* Quick Suggestion Pills above input */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-faint shrink-0">Suggestions:</span>
            {["2BR under 200k", "Remera listings", "Upfront move-in breakdown", "Guest sign up"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSend(tag)}
                className="shrink-0 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-body transition-colors hover:border-brand hover:bg-brand-tint hover:text-brand"
              >
                {tag}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="group relative flex items-center rounded-2xl border border-line bg-surface p-1.5 shadow-sm transition-all focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Urugo AI about properties, locations, or move-in costs..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-faint"
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className={`grid size-10 shrink-0 place-items-center rounded-xl transition-all ${
                input.trim()
                  ? "bg-brand text-white shadow-md shadow-brand/25 hover:bg-brand-deep cursor-pointer scale-100"
                  : "bg-line text-faint cursor-not-allowed scale-95"
              }`}
              title="Send message"
            >
              <Send className="size-4" />
            </button>
          </form>

          <p className="text-center text-[11px] text-faint">
            Urugo AI provides real-time rental insights and property estimates based on Kigali registry data.
          </p>
        </div>
      </footer>
    </div>
  );
}
