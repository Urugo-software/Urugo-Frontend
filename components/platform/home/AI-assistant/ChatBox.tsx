function ChatBox() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-brand/5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-white px-5 py-3.5">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-xl bg-brand flex items-center justify-center shadow-sm shadow-brand/30">
            <span className="text-white font-extrabold text-[13px] leading-none">
              U
            </span>
          </div>
          <div>
            <p className="text-[13px] font-bold text-ink leading-none mb-0.5">
              Urugo Assistant
            </p>
          </div>
        </div>
        <div className="rounded-full border border-brand/20 bg-brand-tint px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-brand">
          AI · Live
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-4 bg-surface p-5 min-h-[220px]">
        {/* User message */}
        <div className="self-end flex flex-col items-end gap-1 max-w-[82%]">
          <div className="rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-md shadow-brand/20">
            I need a 2-bedroom near Remera, budget around 200k
          </div>
          <span className="text-[10px] text-faint">just now</span>
        </div>

        {/* AI reply */}
        <div className="self-start flex flex-col items-start gap-1 max-w-[82%]">
          <div className="rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-[13px] leading-relaxed text-ink shadow-sm">
            <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand">
              <span className="w-1 h-1 rounded-full bg-brand inline-block" />8
              matches found
            </span>
            Got it cheapest first, or best-rated landlords?
          </div>
          <span className="text-[10px] text-faint">Urugo AI</span>
        </div>

        {/* User message */}
        <div className="self-end flex flex-col items-end gap-1 max-w-[82%]">
          <div className="rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-md shadow-brand/20">
            {`Best rated, and I'll need parking`}
          </div>
          <span className="text-[10px] text-faint">just now</span>
        </div>

        {/* AI reply */}
        <div className="self-start flex flex-col items-start gap-1 max-w-[86%]">
          <div className="rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-[13px] leading-relaxed text-ink shadow-sm">
            <span className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand">
              <span className="w-1 h-1 rounded-full bg-brand inline-block" />
              Filtered · 3 results
            </span>
            Here are 3 verified properties with parking, all 4.5★+. Want a
            move-in cost breakdown?
          </div>
          <span className="text-[10px] text-faint">Urugo AI</span>
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2.5 border-t border-line bg-white px-4 py-3">
        <div className="flex flex-1 items-center rounded-xl border border-line bg-surface px-4 py-2.5 text-[13px] text-faint">
          {`Describe what you're looking for…`}
        </div>
        <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand text-white transition-all duration-200 hover:bg-brand-deep hover:scale-105 shadow-sm shadow-brand/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
