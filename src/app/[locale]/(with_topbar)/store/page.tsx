"use client";

import { useTranslations } from "next-intl";
import { StorePage } from "@/components/store/StorePage";
import { useParams } from "next/navigation";

export default function StorePageContainer() {
  const params = useParams();
  const locale = params.locale as string;
  
  return <StorePage locale={locale} />;
}
