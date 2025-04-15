"use client";

import { useTranslations } from "next-intl";
import { TestResult as ITestResult } from "@/types/evaluate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Share2, Download, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface TestResultProps {
  result: ITestResult;
  testTitle: string;
  locale: string;
}

export function TestResult({ result, testTitle, locale }: TestResultProps) {
  const t = useTranslations("Evaluate");
  
  // 结果页面加载时播放庆祝效果
  useEffect(() => {
    // 播放五彩纸屑效果
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 结果标题 */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex justify-center items-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4"
        >
          <CheckCircle className="h-10 w-10 text-white" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
        >
          {t("testCompleted")}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 dark:text-gray-300"
        >
          {t("testCompletedDescription", { testName: testTitle })}
        </motion.p>
      </div>
      
      {/* 结果卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
            <h3 className="text-xl font-bold text-white">
              {result.title}
            </h3>
          </div>
          
          <CardContent className="p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {result.description}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {t("recommendations")}
              </h4>
              
              <ul className="space-y-2">
                {result.recommendations.map((recommendation, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {recommendation}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button 
          variant="outline" 
          asChild
          className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
        >
          <Link href={`/${locale}/evaluate`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToTests")}
          </Link>
        </Button>
        
        <Button
          variant="outline"
          className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
        >
          <Share2 className="h-4 w-4 mr-2" />
          {t("shareResult")}
        </Button>
        
        <Button
          variant="outline"
          className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
        >
          <Download className="h-4 w-4 mr-2" />
          {t("downloadResult")}
        </Button>
        
        <Button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          {t("learnMore")}
        </Button>
      </motion.div>
    </motion.div>
  );
}
