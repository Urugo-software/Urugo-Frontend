"use client";

import { useMemo, useState } from "react";
import { ChevronDown, MessageCircle, Search } from "lucide-react";

const RENTER_TOPICS = [
  "Rent & Payments",
  "Lease Agreement",
  "Maintenance Requests",
  "Account & Security",
] as const;

const RENTER_QUESTIONS: readonly (readonly [string, string])[] = [
  [
    "How do I view my lease agreement and rent schedule?",
    "Open the Lease tab in your renter dashboard to review your active tenancy details, monthly rent amount, and payment due dates.",
  ],
  [
    "Where can I see my past rent payments?",
    "Visit the Payments section to view your recorded payment history, payment statuses, and any overdue day counts.",
  ],
  [
    "How do I submit a maintenance issue?",
    "Go to the Maintenance page to log a new repair request and track updates from your landlord.",
  ],
  [
    "How can I update my password?",
    "Navigate to Settings in your renter dashboard and use the Change Password form with your current password.",
  ],
] as const;

export function RenterHelpCenterView() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string>();
  const questions = useMemo(
    () =>
      RENTER_QUESTIONS.filter(([title, answer]) =>
        `${title} ${answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-ink">Help Center</h2>
      <p className="mt-1 text-[15px] text-body">
        Find answers about your tenancy, rent records, and account settings.
      </p>
      <label className="relative mt-7 block">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for help"
          className="w-full border border-line py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
        />
      </label>
      <section className="mt-6">
        <h3 className="mb-3 text-base font-bold">Browse by topic</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {RENTER_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setQuery(topic)}
              className="border border-line p-4 py-3.5 text-left text-[15px] cursor-pointer font-semibold transition hover:border-brand hover:bg-brand-tint"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-7 border border-line bg-white p-6">
        <h3 className="mb-2 text-base font-bold">Frequently asked questions</h3>
        {!questions.length ? (
          <p className="py-5 text-sm text-body">
            No answers found. Try a different search.
          </p>
        ) : (
          questions.map(([title, answer]) => (
            <div key={title} className="border-b border-line last:border-0">
              <button
                onClick={() => setOpen(open === title ? undefined : title)}
                className="flex w-full items-center justify-between gap-3 py-4 text-left text-[15px] font-semibold"
              >
                <span>{title}</span>
                <ChevronDown
                  className={`size-4 transition ease-in-out duration-300 ${open === title ? "rotate-180" : ""}`}
                />
              </button>
              {open === title && (
                <p className="pb-4 text-[15px] leading-6 text-body">{answer}</p>
              )}
            </div>
          ))
        )}
      </section>
      <section className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white">
        <div>
          <h3 className="font-bold">Still need help?</h3>
          <p className="mt-1 text-sm text-white/80">
            Our support team is ready to assist you.
          </p>
        </div>
        <button className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand">
          <MessageCircle className="size-4" />
          Contact us
        </button>
      </section>
    </div>
  );
}
