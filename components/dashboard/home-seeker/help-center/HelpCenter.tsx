"use client";

import { useMemo, useState } from "react";
import { helpQuestions, helpTopics } from "@/data/home-seeker-data";
import { FaqList } from "./FaqList";
import { HelpContactCard } from "./HelpContactCard";
import { HelpSearch } from "./HelpSearch";

export function HelpCenter() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string>();
  const questions = useMemo(
    () =>
      helpQuestions.filter(([title, answer]) =>
        `${title} ${answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-ink">Help Center</h2>
      <p className="mt-1 text-[15px] text-body">
        Find answers or get help with your home search.
      </p>
      <HelpSearch value={query} onChange={setQuery} />
      <section className="mt-6">
        <h3 className="mb-3 text-base font-bold">Browse by topic</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {helpTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setQuery(topic)}
              className=" border border-line p-4 py-3.5 text-left text-[15px] cursor-pointer font-semibold transition hover:border-brand hover:bg-brand-tint"
            >
              {topic}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-7  border border-line bg-white p-6">
        <h3 className="mb-2 text-base font-bold">Frequently asked questions</h3>
        <FaqList
          questions={questions}
          open={open}
          onToggle={(title) => setOpen(open === title ? undefined : title)}
        />
      </section>
      <HelpContactCard />
    </div>
  );
}
