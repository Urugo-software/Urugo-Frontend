"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { AssistantCanvas } from "./AssistantCanvas";
import { AssistantAnimState } from "@/types/ai-assistant";

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const animState: AssistantAnimState = isOpen ? "greeting" : "idle";

  return (
    <motion.div
      layout
      className="fixed bottom-6 right-6 z-50 overflow-hidden"
      initial={false}
      animate={{
        width: isOpen ? 420 : 90,
        height: isOpen ? 620 : 90,
        borderRadius: isOpen ? 28 : 999,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
      style={{
        background: isOpen ? "rgba(255,255,255,0.96)" : "transparent",
        boxShadow: isOpen ? "0 20px 60px rgba(0,0,0,0.15)" : "none",
      }}
    >
      {!isOpen && (
        <motion.button
          className="absolute inset-0 z-10"
          onClick={() => setIsOpen(true)}
          aria-label="Open Urugo AI"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      )}

      <motion.div
        layout
        className={
          isOpen
            ? "absolute left-1/2 top-6 h-40 w-40 -translate-x-1/2"
            : "absolute inset-0"
        }
      >
        <AssistantCanvas animState={animState} />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.3,
            }}
            className="absolute inset-x-0 bottom-0 top-44 flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <h3 className="font-semibold">Urugo AI</h3>

                <p className="text-xs text-gray-500">
                  Your home search assistant
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close Urugo AI"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 px-5">
              <div className="rounded-2xl bg-gray-50 p-4">
                Hi! 👋 How can I help you find your next home?
              </div>
            </div>

            <div className="p-4">
              <div className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-400">
                Ask about properties...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
