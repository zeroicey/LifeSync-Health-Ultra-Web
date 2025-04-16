import { Props } from "@/types/setting";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AssistantPage } from "@/components/assistant/AssistantPage";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "Assistant" });
  
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function Page({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <AssistantPage />;
}
