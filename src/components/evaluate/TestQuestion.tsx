"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TestQuestion as ITestQuestion, TestOption } from "@/types/evaluate";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface TestQuestionProps {
  question: ITestQuestion;
  totalQuestions: number;
  currentIndex: number;
  selectedAnswer: string | number | undefined;
  onAnswer: (questionId: string, answer: string | number) => void;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export function TestQuestion({
  question,
  totalQuestions,
  currentIndex,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrev,
  onComplete
}: TestQuestionProps) {
  const t = useTranslations("Evaluate");
  const [localAnswer, setLocalAnswer] = useState<string | number | undefined>(selectedAnswer);
  const isLastQuestion = currentIndex === totalQuestions - 1;
  
  // 同步外部选择的答案
  useEffect(() => {
    setLocalAnswer(selectedAnswer);
  }, [selectedAnswer, question.id]);
  
  // 处理选择答案
  const handleSelectOption = (value: string) => {
    // 找到对应的选项
    const option = question.options.find(opt => opt.id === value);
    if (!option) return;
    
    setLocalAnswer(option.value);
    onAnswer(question.id, option.value);
  };
  
  // 处理下一步
  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      onNext();
    }
  };
  
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* 进度指示器 */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {t("questionProgress", { current: currentIndex + 1, total: totalQuestions })}
          </span>
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* 问题 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-6">
          {question.text}
        </h3>
        
        <RadioGroup 
          value={localAnswer ? question.options.find(opt => opt.value === localAnswer)?.id : undefined}
          onValueChange={handleSelectOption}
          className="space-y-3"
        >
          <AnimatePresence mode="wait">
            {question.options.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <div className="flex items-center space-x-2 w-full">
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className="text-indigo-600 border-gray-300 dark:border-gray-600"
                  />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 py-3 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    {option.text}
                  </Label>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </RadioGroup>
      </div>
      
      {/* 导航按钮 */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t("previous")}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={localAnswer === undefined}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          {isLastQuestion ? (
            <>
              {t("complete")}
              <Check className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              {t("next")}
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
