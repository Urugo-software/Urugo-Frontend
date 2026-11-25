"use client";

import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ConversationContact } from "@/types/messages";
import { landlordExtraDetails } from "@/data/landlord-profile-data";
import { LandlordHeaderCard } from "./LandlordHeaderCard";
import { LandlordContactItem } from "./LandlordContactItem";
import { LandlordQuickActions } from "./LandlordQuickActions";

export function LandlordProfileSidebar({
  contact,
}: {
  contact: ConversationContact;
}) {
  const t = useTranslations("renter.messages");
  const email = contact.email || landlordExtraDetails.email;

  return (
    <aside className="flex h-full w-80 shrink-0 flex-col overflow-y-auto border-l border-line bg-white pt-6 max-lg:hidden">
      <LandlordHeaderCard contact={contact} />

      <div className="flex-1 space-y-6 p-6">
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-faint">
            {t("directContact")}
          </div>
          <LandlordContactItem
            label={t("phoneLabel")}
            value={contact.phone}
            href={`tel:${contact.phone}`}
            icon={Phone}
          />
          <LandlordContactItem
            label={t("emailLabel")}
            value={email}
            href={`mailto:${email}`}
            icon={Mail}
          />
        </div>

        <LandlordQuickActions phone={contact.phone} />
      </div>
    </aside>
  );
}
