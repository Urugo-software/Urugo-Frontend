import React from "react";
import { Phone } from "lucide-react";
import { ConversationContact } from "@/types/messages";

export function ChatContactHeader({
  contact,
}: {
  contact: ConversationContact;
}) {
  return (
    <div className="flex items-center justify-between border-b border-line bg-white p-4 shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="grid size-10 place-items-center rounded-full bg-brand-tint font-bold text-brand text-sm">
            EN
          </div>
          {contact.online && (
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            {contact.name}
          </h3>
          <p className="text-[11px] text-body">
            {contact.property} · {contact.unit}
          </p>
        </div>
      </div>
      <a
        href={`tel:${contact.phone}`}
        className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface"
      >
        <Phone className="size-3.5 text-brand" />
        <span className="max-sm:hidden">{contact.phone}</span>
      </a>
    </div>
  );
}
