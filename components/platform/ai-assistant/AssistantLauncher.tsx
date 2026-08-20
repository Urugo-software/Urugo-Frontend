import { motion } from "framer-motion";

interface AssistantLauncherProps {
  onOpen: () => void;
  visual: React.ReactNode;
}

export function AssistantLauncher({ onOpen, visual }: AssistantLauncherProps) {
  return (
    <motion.button
      type="button"
      aria-label="Open Urugo AI assistant"
      className="fixed bottom-3 right-6 z-50 size-18 overflow-hidden rounded-full border border-brand/20 bg-white shadow-xl  sm:bottom-6 sm:right-6 sm:size-[5.5rem]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onOpen}
    >
      {visual}
      <span className="absolute bottom-1 right-1 size-3 rounded-full border-2 border-white bg-success" />
    </motion.button>
  );
}
