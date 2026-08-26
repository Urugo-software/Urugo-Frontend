"use client";
import MobileSidebar from "./mobile-sidebar";
import { useUiStore } from "@/store/ui.store";

function MobileSidebarWrapper() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUiStore((state) => ({
    mobileSidebarOpen: state.mobileSidebarOpen,
    setMobileSidebarOpen: state.setMobileSidebarOpen,
  }));
  return (
    <>
      {mobileSidebarOpen && (
        <MobileSidebar setMobileSidebarOpen={setMobileSidebarOpen} />
      )}
    </>
  );
}

export default MobileSidebarWrapper;
