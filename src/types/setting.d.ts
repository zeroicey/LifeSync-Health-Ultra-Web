// types/preferences.d.ts
export type Language = "en" | "zh" | "jp";
export type Theme = "light" | "dark" | "system";
export type Props = {
  params: Promise<{ locale: Locale }>;
};

export interface UserPreferences {
  language: Language;
  theme: Theme;
}
