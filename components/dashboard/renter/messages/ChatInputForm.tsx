"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { useSendMessage } from "@/hooks/mutations/useSendMessage";

interface Inputs {
  messageText: string;
}

export function ChatInputForm() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const sendMutation = useSendMessage();

  const onSubmit = (data: Inputs) => {
    const trimmed = data.messageText?.trim();
    if (!trimmed) return;
    sendMutation.mutate(trimmed, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 border-t border-line bg-white p-3"
    >
      <input
        type="text"
        {...register("messageText", { required: true })}
        placeholder="Type a message to your landlord..."
        className="flex-1 rounded-full border border-line bg-surface px-4 py-2 text-xs text-ink focus:bg-white focus:outline-brand"
      />
      <button
        type="submit"
        disabled={sendMutation.isPending}
        className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition hover:bg-brand/90 disabled:opacity-50"
      >
        <Send className="size-4" />
      </button>
    </form>
  );
}
