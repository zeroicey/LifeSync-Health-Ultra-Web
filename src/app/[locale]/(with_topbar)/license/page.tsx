import { useTranslations } from "next-intl";

export default function LicensePage() {
  const t = useTranslations("LicensePage");
  return <div>{t("title")}</div>;
}
