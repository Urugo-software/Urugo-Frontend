import { X, Maximize2, Minimize2 } from "lucide-react";

interface AssistantHeaderProps {
  onClose: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export function AssistantHeader({ onClose, isMaximized = false, onToggleMaximize }: AssistantHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3.5 sm:p-4">
      <div className="flex items-center gap-2 rounded-2xl border border-line bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur">
        <span className="size-2 rounded-full bg-success animate-pulse" />
        <p className="text-xs sm:text-sm font-bold text-ink">Urugo Assistant</p>
      </div>

      <div className="flex items-center gap-1.5">
        {onToggleMaximize && (
          <button
            type="button"
            aria-label={isMaximized ? "Restore size" : "Maximize widget"}
            title={isMaximized ? "Restore size" : "Maximize widget"}
            className="rounded-xl border border-line bg-white/90 p-2 text-body shadow-sm backdrop-blur transition hover:bg-white hover:text-ink cursor-pointer"
            onClick={onToggleMaximize}
          >
            {isMaximized ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        )}

        <button
          type="button"
          aria-label="Close Urugo AI assistant"
          title="Close assistant"
          className="rounded-xl border border-line bg-white/90 p-2 text-body shadow-sm backdrop-blur transition hover:bg-white hover:text-ink cursor-pointer"
          onClick={onClose}
        >
          <X className="size-4" />
        </button>
      </div>
    </header>
  );
}
