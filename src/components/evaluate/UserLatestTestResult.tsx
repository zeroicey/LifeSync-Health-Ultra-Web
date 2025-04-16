"use client";

import { useTranslations } from "next-intl";
import { useEvaluateStore } from "@/stores/evaluate.store";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileBarChart, Lightbulb, Award, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { zhCN, ja, enUS } from "date-fns/locale";

interface UserLatestTestResultProps {
  locale: string;
}

export function UserLatestTestResult({ locale }: UserLatestTestResultProps) {
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
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            className="gap-2"
          >
            {t("exploreTests")} <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 获取最新的测试结果
  const latestTest = [...testHistory].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  // 查找对应的测试
  const testInfo = tests.find((test) => test.id === latestTest.testId);

  // 格式化日期
  const getLocale = () => {
    switch (locale) {
      case "zh": return zhCN;
      case "ja": return ja;
      default: return enUS;
    }
  };

  const formattedDate = formatDistanceToNow(new Date(latestTest.date), { 
    addSuffix: true,
    locale: getLocale()
  });

  // 获取类别徽章颜色
  const getCategoryColor = () => {
    switch (testInfo?.category) {
      case "personality": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      case "anxiety": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "depression": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "sleep": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {t("latestTestResult")}
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {formattedDate}
              </p>
            </div>
            {testInfo && (
              <Badge className={`${getCategoryColor()} px-3 py-1`}>
                {t(`categories.${testInfo.category}`)}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-14 w-14 border-2 border-indigo-100 dark:border-indigo-900/30">
              <AvatarImage src={testInfo?.imageUrl} />
              <AvatarFallback className="bg-indigo-500 text-white">
                {testInfo?.title.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {latestTest.result.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {testInfo?.title}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                <FileBarChart className="h-5 w-5 text-indigo-500" /> {t("resultAnalysis")}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {latestTest.result.description}
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="flex items-center gap-2 text-md font-medium text-gray-800 dark:text-gray-200 mb-2">
                <Lightbulb className="h-5 w-5 text-amber-500" /> {t("recommendations")}
              </h4>
              <ul className="space-y-2">
                {latestTest.result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-gray-50 dark:bg-gray-900/30">
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {testInfo?.questionCount} {t("questions")} • {testInfo?.duration} {t("minutes")}
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.push(`/${locale}/evaluate/${latestTest.testId}`)}
              className="gap-2"
            >
              {t("takeAgain")} <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
