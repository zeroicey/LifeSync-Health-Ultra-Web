import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Logo() {
  const t = useTranslations("RootLayout");
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center group">
        <div className="relative overflow-hidden rounded-full mr-2 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/30 dark:to-slate-900 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <Image
            src="/logo.png"
            alt="LifeSync Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-300 dark:to-blue-300 transition-all duration-300 group-hover:tracking-wide">
          {t("title")}
        </span>
      </Link>
    </div>
  );
}
