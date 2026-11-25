"use client";

import { AnimatePresence } from "framer-motion";
import { useUiStore } from "@/store/ui.store";
import MobileSidebar from "./mobile-sidebar";

function MobileSidebarWrapper() {
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore(
    (state) => state.setMobileSidebarOpen,
  );

  return (
    <AnimatePresence>
      {mobileSidebarOpen && (
        <MobileSidebar setMobileSidebarOpen={setMobileSidebarOpen} />
      )}
    </AnimatePresence>
  );
}

export default MobileSidebarWrapper;
