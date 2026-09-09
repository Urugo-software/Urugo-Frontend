"use client";
import MobileSidebar from "./mobile-sidebar";
import { useUiStore } from "@/store/ui.store";

function MobileSidebarWrapper() {
  const mobileSidebarOpen = useUiStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore(
    (state) => state.setMobileSidebarOpen,
  );
  return (
    <>
      {mobileSidebarOpen && (
        <MobileSidebar setMobileSidebarOpen={setMobileSidebarOpen} />
      )}
    </>
  );
}

export default MobileSidebarWrapper;
