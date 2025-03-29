import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "zh" | "en" | "jp";
type Theme = "light" | "dark" | "system";

export interface LanguageState {
  language: Language;
  buttonLabels: { zh: string; en: string; jp: string };
  setLanguage: (lang: Language) => void;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "theme-storage" }
  )
);

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "zh",
      buttonLabels: { zh: "汉语", en: "英文", jp: "日语" }, // 默认显示 "中 英 日"
      setLanguage: (lang) =>
        set({
          language: lang,
          buttonLabels:
            lang === "zh"
              ? { zh: "汉语", en: "英文", jp: "日语" } // 中文时
              : lang === "en"
              ? { zh: "Chinese", en: "English", jp: "Japanese" } // 英文时
              : { zh: "中国語", en: "英語", jp: "日本語" }, // 日语时
        }),
    }),
    { name: "language-storage" }
  )
);
