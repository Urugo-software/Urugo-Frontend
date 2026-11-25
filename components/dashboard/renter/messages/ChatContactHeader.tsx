import { Phone } from "lucide-react";
import type { ConversationContact } from "@/types/messages";
import { getInitials } from "@/utils/renter-helpers";

export function ChatContactHeader({
  contact,
}: {
  contact: ConversationContact;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line bg-white p-4 shadow-2xs">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative shrink-0">
          <div className="grid size-10 place-items-center rounded-full bg-brand-tint text-sm font-bold text-brand">
            {getInitials(contact.name)}
          </div>
          {contact.online && (
            <span className="absolute right-0 bottom-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-ink">
            {contact.name}
          </h3>
          <p className="truncate text-xs text-body">
            {contact.property} &middot; {contact.unit}
          </p>
        </div>
      </div>

      <a
        href={`tel:${contact.phone}`}
        className="flex shrink-0 items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-semibold text-body hover:bg-surface"
      >
        <Phone aria-hidden="true" className="size-3.5 text-brand" />
        <span className="max-sm:hidden">{contact.phone}</span>
      </a>
    </div>
  );
}
