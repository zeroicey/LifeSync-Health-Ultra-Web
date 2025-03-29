import { Props } from "@/types/setting";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function LicensePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("LicensePage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <div>{t("content")}</div>
    </div>
  );
}
