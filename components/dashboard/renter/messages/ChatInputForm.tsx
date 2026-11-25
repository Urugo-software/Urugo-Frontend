"use client";

import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessage } from "@/hooks/mutate/useSendMessage";

interface Inputs {
  messageText: string;
}

export function ChatInputForm() {
  const { register, handleSubmit, reset } = useForm<Inputs>({
    defaultValues: { messageText: "" },
  });
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
      className="flex items-center gap-2 border-t border-line bg-white p-3 sm:px-5 sm:py-4"
    >
      <Input
        type="text"
        aria-label="Message to landlord"
        placeholder="Type a message to your landlord..."
        className="h-10 flex-1 rounded-none border-line bg-surface text-sm text-ink focus:bg-white"
        {...register("messageText", { required: true })}
      />
      <Button
        type="submit"
        size="icon"
        aria-label="Send message"
        disabled={sendMutation.isPending}
        className="size-10 shrink-0 cursor-pointer rounded-none"
      >
        <Send aria-hidden="true" className="size-4" />
      </Button>
    </form>
  );
}
