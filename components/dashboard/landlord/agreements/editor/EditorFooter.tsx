"use client";

import { Send, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSave: () => void;
  onSendToRenter: () => void;
}

export function EditorFooter({ onSave, onSendToRenter }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-line bg-white px-4 py-4 sm:px-8 lg:px-16">
      <Button
        type="button"
        variant="outline"
        onClick={onSave}
        className="h-9 cursor-pointer rounded-none border-line px-4 text-[12.5px] font-medium"
      >
        <Save className="mr-1 size-3.5" />
        <span>Save Changes</span>
      </Button>

      <Button
        type="button"
        onClick={onSendToRenter}
        className="h-9 cursor-pointer rounded-none bg-ink px-5 text-[12.5px] font-semibold text-white hover:bg-black"
      >
        <Send className="mr-1.5 size-3.5" />
        <span>Send to Renter</span>
      </Button>
    </div>
  );
}
