"use client";

import React, { useEffect, useRef } from "react";
import { useLandlordMessages } from "@/hooks/query/messages.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { ChatContactHeader } from "./ChatContactHeader";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatInputForm } from "./ChatInputForm";
import { LandlordProfileSidebar } from "./LandlordProfileSidebar";

export function RenterMessagesView() {
  const { data, isLoading, isError } = useLandlordMessages();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.messages]);

  if (isLoading) return <SectionLoading message="Loading conversation..." />;
  if (isError || !data) return <SectionError message="Unable to load messages." />;

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden bg-white">
      {/* Main Chat Box Area */}
      <div className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden">
        <ChatContactHeader contact={data.contact} />

        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
          {data.messages.map((msg) => (
            <ChatMessageItem key={msg.id} msg={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        <ChatInputForm />
      </div>

      {/* Landlord Profile Sidebar on the Right */}
      <LandlordProfileSidebar contact={data.contact} />
    </div>
  );
}
