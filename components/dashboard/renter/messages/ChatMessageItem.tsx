import React from "react";
import { ChatMessage } from "@/types/messages";

export function ChatMessageItem({ msg }: { msg: ChatMessage }) {
  const isRenter = msg.senderRole === "renter";

  return (
    <div
      className={`flex flex-col ${isRenter ? "items-end" : "items-start"} mb-3`}
    >
      <div className="flex items-center gap-1.5 mb-1 text-[10px] text-faint">
        <span className="font-semibold text-ink">{msg.senderName}</span>
        <span>·</span>
        <span>{msg.timestamp}</span>
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
          isRenter
            ? "bg-brand text-white rounded-tr-none shadow-xs"
            : "bg-surface border border-line text-ink rounded-tl-none shadow-2xs"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}
