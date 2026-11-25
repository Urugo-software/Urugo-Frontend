"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import { useUiStore } from "@/store/ui.store";
import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";

export function AIWidget() {
  const t = useTranslations("public.zoe");
  const isOpen = useUiStore((s) => s.assistantOpen);
  const queuedPrompt = useUiStore((s) => s.assistantPrompt);
  const openAssistant = useUiStore((s) => s.openAssistant);
  const closeAssistant = useUiStore((s) => s.closeAssistant);
  const clearAssistantPrompt = useUiStore((s) => s.clearAssistantPrompt);

  return (
    <section aria-label={t("name")}>
      <AnimatePresence>
        {isOpen && (
          <AssistantPanel
            onClose={closeAssistant}
            initialPrompt={queuedPrompt}
            onConsumePrompt={clearAssistantPrompt}
          />
        )}
      </AnimatePresence>
      {!isOpen && (
        <AssistantLauncher
          onOpen={() => openAssistant()}
          visual={<AssistantCanvas animState="idle" />}
        />
      )}
    </section>
  );
}
