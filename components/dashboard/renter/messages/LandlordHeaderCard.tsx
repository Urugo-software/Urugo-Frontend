"use client";

import React from "react";
import { ConversationContact } from "@/types/messages";

export function LandlordHeaderCard({ contact }: { contact: ConversationContact }) {
  return (
    <div className="p-6 border-b border-line text-center">
      <div className="relative inline-block mx-auto mb-3">
        <div className="grid size-20 place-items-center rounded-full bg-brand-tint font-extrabold text-brand text-2xl border-2 border-brand/20 shadow-xs">
          EN
        </div>
        {contact.online && (
          <span
            className="absolute bottom-1 right-1 size-4 rounded-full bg-emerald-500 ring-4 ring-white"
            title="Online now"
          />
        )}
      </div>
      <h3 className="text-base font-bold text-ink">{contact.name}</h3>
      <span className="inline-block mt-1 rounded-full bg-brand-tint px-3 py-0.5 text-xs font-semibold text-brand">
        {contact.role}
      </span>
    </div>
  );
}
