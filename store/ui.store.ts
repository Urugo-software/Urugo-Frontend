import { create } from "zustand";

interface UiStore {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
}));
