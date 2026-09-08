import { Phone, Mail } from "lucide-react";
import { ConversationContact } from "@/types/messages";
import { landlordExtraDetails } from "@/data/landlord-profile-data";
import { LandlordHeaderCard } from "./LandlordHeaderCard";
import { LandlordContactItem } from "./LandlordContactItem";
import { LandlordQuickActions } from "./LandlordQuickActions";

export function LandlordProfileSidebar({
  contact,
}: {
  contact: ConversationContact;
}) {
  return (
    <aside className="w-130 pt-18 shrink-0 border-l border-line bg-white flex flex-col h-full overflow-y-auto max-lg:hidden">
      <LandlordHeaderCard contact={contact} />

      <div className="p-6 space-y-6 flex-1">
        <div className="space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-faint">
            Direct Contact
          </div>
          <LandlordContactItem
            label="Phone"
            value={contact.phone}
            href={`tel:${contact.phone}`}
            icon={Phone}
          />
          <LandlordContactItem
            label="Email"
            value={landlordExtraDetails.email}
            href={`mailto:${landlordExtraDetails.email}`}
            icon={Mail}
          />
        </div>

        <LandlordQuickActions phone={contact.phone} />
      </div>
    </aside>
  );
}
