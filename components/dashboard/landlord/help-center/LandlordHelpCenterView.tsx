"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  BookOpen,
  Building2,
  ChevronDown,
  ChevronUp,
  DollarSign,
  FileText,
  HelpCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { mockLandlordFaqs } from "@/data/landlord-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

interface SupportFormValues {
  subject: string;
  message: string;
}

const CATEGORIES = [
  {
    key: "Listings",
    title: "Listings & Viewings",
    desc: "Publishing, pausing & tenant leads",
    icon: Building2,
  },
  {
    key: "Tenancies",
    title: "Tenancy Management",
    desc: "Onboarding, renewing & closing leases",
    icon: FileText,
  },
  {
    key: "Payments",
    title: "Rent Collection",
    desc: "Mobile Money & payment verification",
    icon: DollarSign,
  },
  {
    key: "Rental History",
    title: "Rental History & Disputes",
    desc: "3-day notice window & dispute proof",
    icon: ShieldCheck,
  },
];

export function LandlordHelpCenterView() {
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-5");
  const [supportOpen, setSupportOpen] = useState(false);

  const supportForm = useForm<SupportFormValues>({
    defaultValues: { subject: "", message: "" },
  });

  const scopedFaqs = mockLandlordFaqs.filter(
    (faq) =>
      serviceMode === "managed" ||
      faq.serviceScope === "all" ||
      faq.serviceScope === "listing_only",
  );

  const filteredFaqs = scopedFaqs.filter((faq) => {
    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;
    const q = searchTerm.trim().toLowerCase();
    const matchesQuery =
      !q ||
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q) ||
      faq.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="space-y-4 border border-line bg-white p-5 shadow-2xs sm:p-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Landlord Help Center
          </h2>
          <p className="mt-1 text-sm text-body">
            Find answers on publishing listings, handling viewings, managing
            tenancies, verifying rent, and resolving rental history notices.
          </p>
        </div>

        <DashboardSearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search landlord guides, payment help, or 3-day notice rules..."
          label="Search landlord help center"
          className="max-w-2xl"
        />
      </div>

      {/* Interactive Category Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map(({ key, title, desc, icon: Icon }) => {
          const active = selectedCategory === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedCategory(active ? null : key)}
              className={`cursor-pointer space-y-3 border p-5 text-left shadow-2xs transition-colors ${
                active
                  ? "border-brand-blue bg-brand-tint/40"
                  : "border-line bg-white hover:border-ink/40"
              }`}
            >
              <div className="flex size-10 items-center justify-center border border-line bg-surface/60 text-brand-blue">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">{title}</h3>
                <p className="mt-0.5 text-xs text-body">{desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-5 border border-line bg-white p-5 shadow-2xs sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen aria-hidden="true" className="size-4 text-faint" />
            <h3 className="text-base font-bold text-ink">
              Frequently Asked Questions
            </h3>
          </div>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="cursor-pointer text-xs font-semibold text-brand-blue hover:underline"
            >
              Show all categories
            </button>
          )}
        </div>

        {filteredFaqs.length === 0 ? (
          <EmptyStateBox
            icon={HelpCircle}
            title="No matching help articles"
            description="Try a different search term or clear your category filter."
            action={
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-none"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
              >
                Clear search
              </Button>
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border border-line bg-surface/20 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-sm font-bold text-ink hover:text-brand-blue"
                  >
                    <span className="text-[15px]">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp
                        aria-hidden="true"
                        className="size-4 shrink-0 text-faint"
                      />
                    ) : (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-4 shrink-0 text-faint"
                      />
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
      </div>

      {/* Support Banner */}
      <div className="flex flex-col items-center justify-between gap-4 border border-line bg-white p-5 shadow-2xs sm:flex-row sm:p-8">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-[15px] font-bold text-ink">
            Still need assistance?
          </h3>
          <p className="text-sm text-body">
            Our landlord support team is available Monday to Saturday, 08:00 AM
            – 06:00 PM CAT.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setSupportOpen(true)}
          className="cursor-pointer rounded-none"
        >
          <Mail aria-hidden="true" className="size-4" />
          <span>Contact Support</span>
        </Button>
      </div>

      <ModalDialog
        open={supportOpen}
        onClose={() => setSupportOpen(false)}
        title="Contact Landlord Support"
        description="Send a message to the Urugo team and we will respond by email or phone."
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSupportOpen(false)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="landlord-support-form"
              className="cursor-pointer rounded-none"
            >
              Send Request
            </Button>
          </>
        }
      >
        <form
          id="landlord-support-form"
          noValidate
          onSubmit={supportForm.handleSubmit(() => {
            toast.success("Support request sent. Our team will respond shortly.");
            supportForm.reset();
            setSupportOpen(false);
          })}
          className="space-y-4"
        >
          <Field>
            <FieldLabel htmlFor="support-subject">
              Subject <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="support-subject"
              placeholder="e.g., Question about lease renewal or payment proof"
              className="h-10 rounded-none"
              {...supportForm.register("subject", {
                validate: (v) =>
                  v.trim().length >= 4 || "Enter a short subject.",
              })}
            />
            <FieldError>
              {supportForm.formState.errors.subject?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="support-message">
              Message <span className="text-rose-600">*</span>
            </FieldLabel>
            <textarea
              id="support-message"
              rows={4}
              placeholder="Describe how we can help..."
              className="w-full rounded-none border border-input bg-white p-3 text-sm"
              {...supportForm.register("message", {
                validate: (v) =>
                  v.trim().length >= 10 || "Please describe your issue.",
              })}
            />
            <FieldError>
              {supportForm.formState.errors.message?.message}
            </FieldError>
          </Field>
        </form>
      </ModalDialog>
    </div>
  );
}
