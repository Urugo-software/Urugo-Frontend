"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="">
      <AnimatePresence>
        {isOpen && (
          <AssistantPanel
            onClose={() => setIsOpen(false)}
            visual={<AssistantCanvas animState="talking" />}
          />
        )}
      </AnimatePresence>
      {!isOpen && (
        <AssistantLauncher
          onOpen={() => setIsOpen(true)}
          visual={<AssistantCanvas animState="idle" />}
        />
      )}
    </section>
  );
}
