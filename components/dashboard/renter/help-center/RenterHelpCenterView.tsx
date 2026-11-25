"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Compass,
  DollarSign,
  FileText,
  HelpCircle,
  Mail,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockRenterFaqs } from "@/data/renter-extra-data";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterSupportTicket } from "@/types/renter";
import { RenterSupportModal } from "./RenterSupportModal";

const CATEGORIES = [
  { key: "Payments", msgKey: "payments", icon: DollarSign },
  { key: "Lease & Documents", msgKey: "leaseDocuments", icon: FileText },
  { key: "Maintenance", msgKey: "maintenance", icon: Wrench },
  { key: "Rental History", msgKey: "rentalHistory", icon: ShieldCheck },
  { key: "Discovery", msgKey: "discovery", icon: Compass },
] as const;

const FAQ_KEY_MAP: Record<string, string> = {
  "rfaq-1": "rfaq1",
  "rfaq-2": "rfaq2",
  "rfaq-3": "rfaq3",
  "rfaq-4": "rfaq4",
  "rfaq-5": "rfaq5",
  "rfaq-6": "rfaq6",
};

const TOPIC_KEY_MAP: Record<string, string> = {
  Payments: "payments",
  "Lease & Documents": "leaseDocuments",
  Maintenance: "maintenance",
  "Rental History": "rentalHistory",
  Account: "account",
};

const TICKET_STATUS_KEYS: Record<RenterSupportTicket["status"], string> = {
  Submitted: "submitted",
  "In Review": "inReview",
};

export function RenterHelpCenterView() {
  const t = useTranslations("renter.helpCenter");
  const supportTickets = useRenterWorkspace((s) => s.supportTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>("rfaq-1");
  const [supportOpen, setSupportOpen] = useState(false);

  const localizedFaqs = mockRenterFaqs.map((faq) => {
    const faqKey = FAQ_KEY_MAP[faq.id];
    const cat = CATEGORIES.find((c) => c.key === faq.category);
    return {
      ...faq,
      question: faqKey ? t(`faqs.${faqKey}.question`) : faq.question,
      answer: faqKey ? t(`faqs.${faqKey}.answer`) : faq.answer,
      categoryLabel: cat ? t(`categories.${cat.msgKey}.label`) : faq.category,
    };
  });

  const filteredFaqs = localizedFaqs.filter((faq) => {
    if (selectedCategory && faq.category !== selectedCategory) return false;
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return `${faq.question} ${faq.answer} ${faq.category} ${faq.categoryLabel}`
      .toLowerCase()
      .includes(q);
  });

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
        </div>

        <DashboardSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("searchPlaceholder")}
          label={t("searchLabel")}
          className="max-w-2xl"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {CATEGORIES.map(({ key, msgKey, icon: Icon }) => {
          const active = selectedCategory === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedCategory(active ? null : key)}
              className={`cursor-pointer space-y-2.5 border p-4 text-left shadow-2xs transition-colors ${
                active
                  ? "border-brand-blue bg-brand-tint/40"
                  : "border-line bg-white hover:border-ink/40"
              }`}
            >
              <div className="flex size-9 items-center justify-center border border-line bg-surface/60 text-brand-blue">
                <Icon aria-hidden="true" className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">
                  {t(`categories.${msgKey}.label`)}
                </h3>
                <p className="mt-0.5 text-xs text-body">
                  {t(`categories.${msgKey}.desc`)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <section className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen aria-hidden="true" className="size-4 text-faint" />
            <h3 className="text-base font-bold text-ink">{t("faqHeading")}</h3>
          </div>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="cursor-pointer text-xs font-semibold text-brand-blue hover:underline"
            >
              {t("showAllTopics")}
            </button>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <EmptyStateBox
            icon={HelpCircle}
            title={t("emptyTitle")}
            description={t("emptyDescription")}
            action={
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="cursor-pointer rounded-none"
              >
                {t("clearSearch")}
              </Button>
            }
          />
        ) : (
          <div className="space-y-2.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="border border-line bg-surface/20">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-sm font-bold text-ink hover:text-brand-blue"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="size-4 shrink-0 text-faint" />
                    ) : (
                      <ChevronDown className="size-4 shrink-0 text-faint" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="border-t border-line/60 px-4 pb-4 pt-3 text-sm leading-relaxed text-body">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {supportTickets.length > 0 && (
        <section className="space-y-3 border border-line bg-white p-5 shadow-2xs sm:p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("recentTicketsHeading", { count: supportTickets.length })}
          </h3>
          <div className="divide-y divide-line">
            {supportTickets.map((ticket) => {
              const topicKey = TOPIC_KEY_MAP[ticket.category];
              const categoryLabel = topicKey
                ? t(`supportModal.topics.${topicKey}`)
                : ticket.category;
              return (
                <div
                  key={ticket.id}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
                >
                  <div>
                    <span className="font-semibold text-ink">
                      {ticket.subject}
                    </span>
                    <span className="block text-xs text-faint">
                      {categoryLabel} &middot; {ticket.createdAt}
                    </span>
                  </div>
                  <StatusBadge
                    label={t(
                      `ticketStatuses.${TICKET_STATUS_KEYS[ticket.status]}`,
                    )}
                    tone="info"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="flex flex-col items-center justify-between gap-4 border border-line bg-white p-5 shadow-2xs sm:flex-row sm:p-8">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-ink">{t("stillNeedHelp")}</h3>
          <p className="text-sm text-body">{t("supportHours")}</p>
        </div>

        <Button
          type="button"
          onClick={() => setSupportOpen(true)}
          className="h-10 cursor-pointer rounded-none px-5 text-xs font-semibold"
        >
          <Mail aria-hidden="true" className="size-4" />
          {t("contactSupport")}
        </Button>
      </div>

      <RenterSupportModal
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
      />
    </div>
  );
}
