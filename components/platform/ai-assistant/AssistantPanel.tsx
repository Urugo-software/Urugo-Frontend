import { motion } from "framer-motion";

import { AssistantComposer } from "./AssistantComposer";
import { AssistantConversation } from "./AssistantConversation";
import { AssistantHeader } from "./AssistantHeader";

interface AssistantPanelProps {
  onClose: () => void;
  visual: React.ReactNode;
}

export function AssistantPanel({ onClose, visual }: AssistantPanelProps) {
  return (
    <motion.aside
      aria-label="Urugo AI assistant"
      className="fixed inset-x-3 bottom-3 z-50 flex h-[min(42rem,calc(100dvh-1.5rem))] min-w-0 max-w-none flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-2xl shadow-brand/15 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[26.25rem] sm:max-w-[calc(100vw-3rem)]"
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 24 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="relative h-40 shrink-0 overflow-hidden bg-brand-tint sm:h-44">
        <div className="absolute inset-0 size-full max-w-full">{visual}</div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-brand/20" />
        <AssistantHeader onClose={onClose} />
      </div>
      <AssistantConversation />
      <AssistantComposer />
    </motion.aside>
  );
}
