"use client";

import { Menu } from "lucide-react";
import { useUiStore } from "@/store/ui.store";

function MobileNavWrapper() {
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore(
    (state) => state.setMobileSidebarOpen,
  );

  return (
    <div className="md:hidden">
      {!mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Open mobile navigation"
          onClick={() => setMobileSidebarOpen(true)}
          className="flex size-10 cursor-pointer items-center justify-center text-ink transition-colors hover:bg-surface"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      )}
    </div>
  );
}

export default MobileNavWrapper;
