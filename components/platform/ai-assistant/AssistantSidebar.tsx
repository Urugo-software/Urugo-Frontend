import Link from "next/link";

const conversations = [
  "2BR near Remera search",
  "Budget check — 300k income",
  "Kimironko neighborhood info",
  "Guest registration",
];

export function AssistantSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white p-3.5 md:flex">
      <Link href="/" className="px-2 pb-5 text-lg font-extrabold text-brand">
        URUGO<sub className="text-xs text-faint">rw</sub>
      </Link>
      <button className="mb-5 rounded-lg bg-brand p-2.5 text-sm font-bold text-white">+ New conversation</button>
      <p className="px-2 pb-2.5 text-[11px] font-bold uppercase tracking-wide text-faint">Recent</p>
      <nav className="space-y-0.5">
        {conversations.map((conversation, index) => (
          <button key={conversation} className={`w-full rounded-lg px-3 py-2.5 text-left text-[13px] ${index ? "text-body hover:bg-surface" : "bg-brand-tint font-semibold text-brand"}`}>
            {conversation}
          </button>
        ))}
      </nav>
      <Link href="/" className="mt-auto border-t border-line p-2 pt-4 text-sm text-body">← Back to Urugo.rw</Link>
    </aside>
  );
}
