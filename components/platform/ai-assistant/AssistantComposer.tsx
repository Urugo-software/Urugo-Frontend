import { Send } from "lucide-react";

export function AssistantComposer() {
  return (
    <form
      className="flex min-w-0 items-center gap-2 border-t border-line bg-white p-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="sr-only" htmlFor="assistant-message">Ask Urugo AI</label>
      <input
        className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
        id="assistant-message"
        placeholder="Ask about properties..."
      />
      <button
        type="submit"
        aria-label="Send message"
        className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-sm shadow-brand/30 transition hover:bg-brand-deep focus:outline-none focus:ring-2 focus:ring-brand/30"
      >
        <Send className="size-4" />
      </button>
    </form>
  );
}
