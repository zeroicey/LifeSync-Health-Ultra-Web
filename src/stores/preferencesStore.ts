// stores/preferencesStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Language, Theme, UserPreferences } from "../types/preferences";

interface PreferencesState extends UserPreferences {
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      language: "zh" as Language, // Default language
      theme: "light" as Theme, // Default theme
      
      setLanguage: (language: Language) => set({ language }),
      
      setTheme: (theme: Theme) => set({ theme }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === "light" ? "dark" : "light" 
      })),
    }),
    {
      name: "user-preferences", // Unique storage name
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePreferencesStore;
