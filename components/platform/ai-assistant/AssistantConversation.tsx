const suggestions = ["Homes in Remera", "Two bedrooms", "Under 200k RWF"];

export function AssistantConversation() {
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto bg-surface px-4 py-5">
      <div className="max-w-[86%] self-start rounded-2xl rounded-tl-md border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink shadow-sm">
        Hi! I’m Urugo AI. Tell me what kind of home you’re looking for and I’ll
        help you narrow it down.
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-body">Try asking about</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              type="button"
              className="rounded-full border border-brand/20 bg-brand-tint px-3 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand hover:text-white"
              key={suggestion}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
