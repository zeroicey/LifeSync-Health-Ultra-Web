"use client";

import { useTranslations } from "next-intl";
import { useEvaluateStore } from "@/stores/evaluate.store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileBarChart,
  Lightbulb,
  Award,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { zhCN, ja, enUS } from "date-fns/locale";

interface UserRecentTestResultsProps {
  locale: string;
}

export function UserRecentTestResults({ locale }: UserRecentTestResultsProps) {
  const t = useTranslations("Evaluate");
  const testHistory = useEvaluateStore((state) => state.testHistory);
  const tests = useEvaluateStore((state) => state.tests);
  const router = useRouter();

  // 没有测试历史记录
  if (testHistory.length === 0) {
    return (
      <Card className="border-dashed border-2 bg-gray-50 dark:bg-gray-900/50">
        <CardContent className="py-8 flex flex-col items-center justify-center text-center">
          <FileBarChart className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("noTestResults")}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            {t("takeYourFirstTest")}
          </p>
          <Button
            onClick={() =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              })
            }
            className="gap-2"
          >
            {t("exploreTests")} <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 获取最新的三个测试结果
  const recentTests = [...testHistory]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  // 格式化日期
  const getLocale = () => {
    switch (locale) {
      case "zh":
        return zhCN;
      case "ja":
        return ja;
      default:
        return enUS;
    }
  };

  // 获取类别徽章颜色
  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "personality":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "anxiety":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "depression":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "sleep":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("yourAssessment")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {t("assessmentDescription")}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> {t("takeNewTest")}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {recentTests.map((testItem, index) => {
          const testInfo = tests.find((test) => test.id === testItem.testId);
          const formattedDate = formatDistanceToNow(new Date(testItem.date), {
            addSuffix: true,
            locale: getLocale(),
          });

          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formattedDate}
                  </p>
                  {testInfo && (
                    <Badge
                      className={`${getCategoryColor(
                        testInfo.category
                      )} px-3 py-1`}
                    >
                      {t(`categories.${testInfo.category}`)}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-indigo-100 dark:border-indigo-900/30">
                    <AvatarImage src={testInfo?.imageUrl} />
                    <AvatarFallback className="bg-indigo-500 text-white">
                      {testInfo?.title.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                      {testItem.result.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {testInfo?.title}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      <FileBarChart className="h-4 w-4 text-indigo-500" />{" "}
                      {t("resultAnalysis")}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                      {testItem.result.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />{" "}
                      {t("topRecommendation")}
                    </h4>
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {testItem.result.recommendations[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 dark:bg-gray-900/30">
                <div className="w-full">
                  <Button
                    variant="outline"
                    onClick={() =>
                      router.push(`/${locale}/evaluate/${testItem.testId}`)
                    }
                    className="gap-2 w-full"
                    size="sm"
                  >
                    {t("viewDetails")} <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}
