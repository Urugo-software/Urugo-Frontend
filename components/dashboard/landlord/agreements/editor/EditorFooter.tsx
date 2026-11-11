"use client";

import { Send, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onSave: () => void;
  onSendToRenter: () => void;
}

export function EditorFooter({ onSave, onSendToRenter }: Props) {
  return (
    <div className="flex items-center justify-end gap-2.5 border-t border-line pt-4 mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={onSave}
        className="rounded-none border-line text-[12.5px] font-medium h-9 px-4 cursor-pointer"
      >
        <Save className="size-3.5 mr-1" />
        <span>Save Changes</span>
      </Button>

      <Button
        type="button"
        onClick={onSendToRenter}
        className="rounded-none bg-ink text-white hover:bg-black text-[12.5px] font-semibold h-9 px-5 cursor-pointer"
      >
        <Send className="size-3.5 mr-1.5" />
        <span>Send to Renter</span>
      </Button>
    </div>
  );
}
