"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useEvaluateStore } from "@/stores/evaluate.store";
import { TestQuestion } from "./TestQuestion";
import { TestResult } from "./TestResult";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestPageProps {
  testId: string;
  locale: string;
}

export function TestPage({ testId, locale }: TestPageProps) {
  const t = useTranslations("Evaluate");
  const [isLoading, setIsLoading] = useState(true);
  const { 
    getTestById, 
    startTest, 
    currentTest, 
    testState, 
    testQuestions,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    completeTest,
    resetTest
  } = useEvaluateStore();

  // 初始化测试
  useEffect(() => {
    const initTest = async () => {
      setIsLoading(true);
      await startTest(testId);
      setIsLoading(false);
    };
    
    initTest();
    
    // 组件卸载时重置测试
    return () => {
      resetTest();
    };
  }, [testId, startTest, resetTest]);

  // 如果正在加载
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          {t("loadingTest")}
        </p>
      </div>
    );
  }

  // 如果测试不存在
  if (!currentTest) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <Card className="max-w-lg mx-auto p-6">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t("testNotFound")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t("testNotFoundDescription")}
            </p>
            <Button asChild>
              <Link href="/evaluate">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToTests")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 获取当前问题
  const currentQuestion = testQuestions[testState.currentQuestionIndex];
  const currentAnswer = currentQuestion ? testState.answers[currentQuestion.id] : undefined;

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link 
          href="/evaluate"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("backToTests")}
        </Link>
      </div>

      {/* 测试标题 */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
        >
          {currentTest.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-gray-300"
        >
          {currentTest.description}
        </motion.p>
      </div>

      {/* 测试内容 */}
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          {testState.isCompleted && testState.result ? (
            // 显示测试结果
            <TestResult 
              result={testState.result} 
              testTitle={currentTest.title}
              locale={locale}
            />
          ) : (
            // 显示测试问题
            currentQuestion && (
              <TestQuestion
                question={currentQuestion}
                totalQuestions={testQuestions.length}
                currentIndex={testState.currentQuestionIndex}
                selectedAnswer={currentAnswer}
                onAnswer={answerQuestion}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                onComplete={completeTest}
              />
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
