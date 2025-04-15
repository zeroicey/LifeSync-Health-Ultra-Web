"use client";

import { useLocale } from "next-intl";
import { EvaluatePage } from "@/components/evaluate/EvaluatePage";
import { PageHeader } from "@/components/ui/page-header";
import { useTranslations } from "next-intl";

export default function EvaluatePageRoute() {
  const locale = useLocale();
  const t = useTranslations("Evaluate");

  return (
    <main className="min-h-screen">
      <PageHeader
        title={t("evaluateTitle")}
        description={t("evaluateDescription")}
        gradient="from-indigo-600 to-purple-600"
      />
      <EvaluatePage locale={locale} />
    </main>
  );
}
