import { useTranslations } from "next-intl";

export default function LicensePage() {
  const t = useTranslations("LicensePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <div>{t("content")}</div>
    </div>
  );
}
