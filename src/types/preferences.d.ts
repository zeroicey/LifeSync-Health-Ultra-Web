// types/preferences.d.ts
export type Language = "en" | "zh" | "ja";
export type Theme = "light" | "dark";

export interface UserPreferences {
  language: Language;
  theme: Theme;
}
