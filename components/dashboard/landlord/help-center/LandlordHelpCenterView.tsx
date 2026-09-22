"use client";

import { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  ShieldCheck,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Mail,
} from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordFaqs } from "@/data/landlord-data";
import { LandlordFAQItem } from "@/types/landlord";

export function LandlordHelpCenterView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const filteredFaqs = mockLandlordFaqs.filter(
    (faq: LandlordFAQItem) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7 bg-surface/30">
      {/* Header Banner */}
      <div className="border border-line bg-white p-6 sm:p-8 shadow-2xs space-y-4 rounded-none">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand block">
            Support & Knowledge Base
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-1">
            Landlord Help Center
          </h1>
          <p className="mt-1 text-sm text-body">
            Find quick answers on managing tenancies, rent collections, lease agreements, and dispute resolution.
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
          <input
            type="text"
            placeholder="Search landlord guides, payment help, or dispute rules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm border border-line bg-surface/40 text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>
      </div>

      {/* Quick Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Tenancy Management", desc: "Creating, renewing & ending leases", icon: FileText },
          { title: "Rent Collection", desc: "Mobile Money & payout verification", icon: DollarSign },
          { title: "Blacklist & Disputes", desc: "Handling unpaid bills & claims", icon: ShieldCheck },
          { title: "Legal & Guidelines", desc: "Rwandan rental regulations & terms", icon: BookOpen },
        ].map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="border border-line bg-white p-5 shadow-2xs hover:border-brand/50 transition-colors rounded-none space-y-3"
            >
              <div className="flex h-10 w-10 items-center justify-center border border-line bg-surface/50 text-brand rounded-none">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">{cat.title}</h3>
                <p className="text-xs text-faint mt-0.5">{cat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Accordion Section */}
      <div className="border border-line bg-white p-6 sm:p-8 shadow-2xs space-y-6 rounded-none">
        <h2 className="text-lg font-bold text-ink">Frequently Asked Questions</h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-line bg-surface/20 transition-colors rounded-none"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-ink hover:text-brand"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-faint" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-faint" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-body leading-relaxed border-t border-line/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Need More Help Card */}
      <div className="border border-line bg-white p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-6 rounded-none">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold text-ink">Still need assistance?</h3>
          <p className="text-xs text-body">
            Our landlord support team is available Monday to Saturday 08:00 AM - 06:00 PM CAT.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <CustomButton title="Contact Support" variant="colored" className="rounded-none">
            <Mail className="h-4 w-4" />
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
