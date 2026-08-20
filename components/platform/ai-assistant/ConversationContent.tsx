"use client";
import { ArrowRight } from "lucide-react";
import { PropertyMatches } from "./PropertyMatches";

const userMessages = [
  "Yes, first time",
  "Let's register first — I'm Yves Kamanzi, 0788 445 221, yves.k@gmail.com",
  "2 bedroom near Remera, budget around 200k, I need parking",
];

function Message({
  children,
  user = false,
}: {
  children: React.ReactNode;
  user?: boolean;
}) {
  return (
    <div
      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${user ? "self-end rounded-br-sm bg-brand text-white" : "rounded-bl-sm bg-surface text-ink"}`}
    >
      {children}
    </div>
  );
}

export function ConversationContent() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 overflow-y-auto px-5 py-7 sm:px-7">
        <Message>Hi! Welcome to Urugo. Is this your first time here?</Message>
        <Message user>{userMessages[0]}</Message>
        <Message>
          Great! I can register you as a guest in under a minute — just your
          name, phone, and email. Want to do that now, or start by telling me
          what kind of place you&apos;re looking for?
        </Message>
        <Message user>{userMessages[1]}</Message>
        <Message>
          <strong className="mb-1.5 block text-[11px] uppercase tracking-wide text-brand">
            Account created
          </strong>
          Perfect, Yves — you&apos;re all set as a guest. Now, what are you
          looking for?
        </Message>
        <Message user>{userMessages[2]}</Message>
        <Message>
          <strong className="mb-1.5 block text-[11px] uppercase tracking-wide text-brand">
            3 matches found
          </strong>
          Here are 3 verified 2-bedroom properties near Remera with parking, all
          within your budget:
        </Message>
        <PropertyMatches />
        <Message>
          Want a move-in cost breakdown for any of these, or should I schedule a
          viewing?
        </Message>
        <div className="flex flex-wrap gap-2">
          {["Move-in cost for #1", "Schedule a viewing", "Compare all 3"].map(
            (option) => (
              <button
                className="rounded-full border border-brand px-4 py-2 text-[13px] font-semibold text-brand hover:bg-brand-tint"
                key={option}
              >
                {option}
              </button>
            ),
          )}
        </div>
      </section>
      <form
        className="border-t border-line p-4 sm:px-7"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl bg-surface py-1.5 pl-4 pr-1.5">
          <input
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-faint"
            placeholder="Describe what you're looking for…"
          />
          <button
            aria-label="Send message"
            className="grid size-10 place-items-center rounded-xl bg-brand text-white"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
