"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { TestList } from "./TestList";
import { UserRecentTestResults } from "./UserRecentTestResults";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, Brain, Activity, Moon } from "lucide-react";

interface EvaluatePageProps {
  locale: string;
}

export function EvaluatePage({ locale }: EvaluatePageProps) {
  const t = useTranslations("Evaluate");

  return (
    <div className="container mx-auto py-8 px-4">
      {/* 用户评测结果 */}
      <div className="mb-12">
        <UserRecentTestResults locale={locale} />
      </div>

      {/* 特色区域 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-indigo-500" />}
          title={t("features.personality.title")}
          description={t("features.personality.description")}
        />
        <FeatureCard
          icon={<Activity className="h-8 w-8 text-purple-500" />}
          title={t("features.anxiety.title")}
          description={t("features.anxiety.description")}
        />
        <FeatureCard
          icon={<ClipboardCheck className="h-8 w-8 text-blue-500" />}
          title={t("features.depression.title")}
          description={t("features.depression.description")}
        />
        <FeatureCard
          icon={<Moon className="h-8 w-8 text-indigo-500" />}
          title={t("features.sleep.title")}
          description={t("features.sleep.description")}
        />
      </motion.div>

      {/* 测试列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t("availableTests")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">{t("chooseTest")}</p>
        </div>

        <TestList locale={locale} />
      </motion.div>
    </div>
  );
}

// 特色卡片组件
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="transition-all duration-300">
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 w-14 h-14 flex items-center justify-center mb-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
