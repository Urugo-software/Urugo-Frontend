import { X } from "lucide-react";

interface AssistantHeaderProps {
  onClose: () => void;
}

export function AssistantHeader({ onClose }: AssistantHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
      <div className="rounded-2xl border border-line bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
        <p className="text-sm font-bold text-ink">Urugo Assistant</p>
      </div>
      <button
        type="button"
        aria-label="Close Urugo AI assistant"
        className="rounded-xl border border-line bg-white/90 p-2 text-body shadow-sm backdrop-blur transition hover:bg-white hover:text-ink"
        onClick={onClose}
      >
        <X className="size-4" />
      </button>
    </header>
  );
}
