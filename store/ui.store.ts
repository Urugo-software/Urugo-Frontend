import { create } from "zustand";

interface UiStore {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  assistantOpen: boolean;
  assistantPrompt: string | null;
  openAssistant: (prompt?: string) => void;
  closeAssistant: () => void;
  clearAssistantPrompt: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open: boolean) => set({ mobileSidebarOpen: open }),
  assistantOpen: false,
  assistantPrompt: null,
  openAssistant: (prompt?: string) =>
    set({
      assistantOpen: true,
      assistantPrompt: prompt?.trim() ? prompt.trim() : null,
    }),
  closeAssistant: () => set({ assistantOpen: false, assistantPrompt: null }),
  clearAssistantPrompt: () => set({ assistantPrompt: null }),
}));
