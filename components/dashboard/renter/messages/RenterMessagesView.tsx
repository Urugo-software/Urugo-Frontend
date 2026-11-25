"use client";

import { useEffect, useRef } from "react";
import { useLandlordMessages } from "@/hooks/query/messages.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { ChatContactHeader } from "./ChatContactHeader";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatInputForm } from "./ChatInputForm";
import { LandlordProfileSidebar } from "./LandlordProfileSidebar";

export function RenterMessagesView() {
  const { data, isLoading, isError, refetch } = useLandlordMessages();
  const liveMessages = useRenterWorkspace((s) => s.messages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = liveMessages.length > 0 ? liveMessages : (data?.messages ?? []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (isLoading) return <SectionLoading message="Loading conversation..." />;
  if (isError || !data) {
    return (
      <SectionError
        message="Unable to load messages."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden bg-white">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <ChatContactHeader contact={data.contact} />

        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50/50 p-4 sm:p-6">
          {messages.map((msg) => (
            <ChatMessageItem key={msg.id} msg={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        <ChatInputForm />
      </div>

      <LandlordProfileSidebar contact={data.contact} />
    </div>
  );
}
