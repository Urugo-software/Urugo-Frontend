function ChatBox() {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_24px_60px_-28px_rgba(14,17,22,.22)]">
      <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col text-ink text-xs justify-center items-center leading-3">
            <h1 className="font-extrabold text-sm">U</h1>
            <p className="font-bold uppercase">urugo</p>
          </div>
        </div>
        <div className="rounded-full border border-line bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
          Live help
        </div>
      </div>

      <div className="flex flex-col gap-3 bg-surface p-5">
        <div className="self-end max-w-[82%] rounded-[20px] rounded-br-[6px] bg-brand px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-[0_10px_24px_-16px_rgba(14,17,22,.35)]">
          I need a 2-bedroom near Remera, budget around 200k
        </div>

        <div className="self-start max-w-[82%] rounded-[20px] rounded-bl-[6px] border border-line bg-white px-4 py-2 text-[13px] leading-relaxed text-ink shadow-[0_8px_20px_-16px_rgba(14,17,22,.2)]">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-brand">
            8 matches found
          </span>
          Got it, want the cheapest first, or the best-rated landlords?
        </div>

        <div className="self-end max-w-[82%] rounded-[20px] rounded-br-[6px] bg-brand px-4 py-2.5 text-[13.5px] leading-relaxed text-white shadow-[0_10px_24px_-16px_rgba(14,17,22,.35)]">
          Best rated, and I'll need parking
        </div>

        <div className="self-start max-w-[82%] rounded-[20px] rounded-bl-[6px] border border-line bg-white px-4 py-2 text-[13px] leading-relaxed text-ink shadow-[0_8px_20px_-16px_rgba(14,17,22,.2)]">
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.1em] text-brand">
            Filtered · 3 results
          </span>
          Here are 3 verified properties with parking, all 4.5★+. Want a move-in
          cost breakdown?
        </div>
      </div>

      <div className="flex items-center gap-2.5 border-t border-line bg-white px-5 py-3.5">
        <div className="flex flex-1 items-center rounded-full border border-line bg-surface px-4 py-2 text-[13px] text-faint shadow-[inset_0_1px_0_rgba(14,17,22,0.03)]">
          Describe what you're looking for…
        </div>
        <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand text-lg font-semibold text-white transition-transform duration-200 hover:scale-[1.03]">
          →
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
