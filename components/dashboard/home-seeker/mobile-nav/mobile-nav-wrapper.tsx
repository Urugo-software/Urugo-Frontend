"use client";
import { useUiStore } from "@/store/ui.store";
import { Menu } from "lucide-react";

function MobileNavWrapper() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUiStore((state) => ({
    mobileSidebarOpen: state.mobileSidebarOpen,
    setMobileSidebarOpen: state.setMobileSidebarOpen,
  }));
  return (
    <div className="md:hidden flex flex-col items-end">
      {!mobileSidebarOpen && (
        <button
          aria-label="open mobile navigation"
          onClick={() => setMobileSidebarOpen(true)}
        >
          <Menu />
        </button>
      )}
    </div>
  );
}

export default MobileNavWrapper;
