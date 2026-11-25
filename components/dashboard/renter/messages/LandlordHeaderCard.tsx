"use client";

import { useTranslations } from "next-intl";
import type { ConversationContact } from "@/types/messages";
import { getInitials } from "@/utils/renter-helpers";

export function LandlordHeaderCard({
  contact,
}: {
  contact: ConversationContact;
}) {
  const t = useTranslations("renter.messages");
  const roleLabel =
    contact.role.trim().toLowerCase() === "landlord"
      ? t("landlordRole")
      : contact.role;

  return (
    <div className="border-b border-line p-6 text-center">
      <div className="relative mx-auto mb-3 inline-block">
        <div className="grid size-20 place-items-center rounded-full border-2 border-brand/20 bg-brand-tint text-2xl font-extrabold text-brand shadow-2xs">
          {getInitials(contact.name)}
        </div>
        {contact.online && (
          <span
            className="absolute right-1 bottom-1 size-4 rounded-full bg-emerald-500 ring-4 ring-white"
            title={t("onlineNow")}
          />
        )}
      </div>
      <h3 className="text-base font-bold text-ink">{contact.name}</h3>
      <span className="mt-1 inline-block text-xs font-semibold text-brand">
        {roleLabel}
      </span>
    </div>
  );
}
