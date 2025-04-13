"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Brain, Dumbbell, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MotivationalBanner() {
  const t = useTranslations("Store");
  const [quoteIndex, setQuoteIndex] = useState(0);
  
  // 激励语句列表
  const quotes = [
    "motivationalQuote1",
    "motivationalQuote2",
    "motivationalQuote3",
    "motivationalQuote4",
    "motivationalQuote5"
  ];

  // 对应的图标
  const icons = [
    <Heart key="heart" className="h-6 w-6 text-pink-500" />,
    <Sparkles key="sparkles" className="h-6 w-6 text-amber-500" />,
    <Brain key="brain" className="h-6 w-6 text-purple-500" />,
    <Dumbbell key="dumbbell" className="h-6 w-6 text-blue-500" />,
    <Leaf key="leaf" className="h-6 w-6 text-green-500" />
  ];
  
  // 每次加载页面随机选择一条激励语句
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuoteIndex(randomIndex);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-none shadow-md">
        <div className="relative">
          {/* 修改背景颜色，使用更柔和的渐变 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20" />
          <div className="absolute -bottom-6 -right-6 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-32 w-32 text-primary" />
            </motion.div>
          </div>
          
          <CardContent className="p-6 relative">
            <div className="flex items-start space-x-4">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  {icons[quoteIndex]}
                </motion.div>
              </div>
              
              <div className="flex-1">
                <motion.p 
                  className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t(quotes[quoteIndex])}
                </motion.p>
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {t("motivationalSubtext")}
                </motion.p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
