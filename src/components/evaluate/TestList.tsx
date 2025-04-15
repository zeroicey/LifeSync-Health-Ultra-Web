"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { TestCard } from "./TestCard";
import { useEvaluateStore } from "@/stores/evaluate.store";
import { TestCategory } from "@/types/evaluate";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface TestListProps {
  locale: string;
}

export function TestList({ locale }: TestListProps) {
  const t = useTranslations("Evaluate");
  const { getTests } = useEvaluateStore();
  const tests = getTests();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState(tests);
  const [isLoading, setIsLoading] = useState(true);
  
  // 模拟加载数据
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 过滤测试
  useEffect(() => {
    let filtered = tests;
    
    // 按类别过滤
    if (selectedCategory !== "all") {
      filtered = filtered.filter(test => test.category === selectedCategory);
    }
    
    // 按搜索词过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(test => 
        test.title.toLowerCase().includes(query) || 
        test.description.toLowerCase().includes(query) ||
        test.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredTests(filtered);
  }, [selectedCategory, searchQuery, tests]);
  
  return (
    <div className="space-y-6">
      {/* 搜索和过滤 */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={t("searchTests")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs 
          defaultValue="all" 
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="w-full md:w-auto"
        >
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-1">
            <TabsTrigger value="all">{t("categories.all")}</TabsTrigger>
            <TabsTrigger value={TestCategory.Personality}>{t("categories.personality")}</TabsTrigger>
            <TabsTrigger value={TestCategory.Mood}>{t("categories.mood")}</TabsTrigger>
            <TabsTrigger value={TestCategory.Sleep}>{t("categories.sleep")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>
      
      {/* 测试列表 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{t("loadingTests")}</p>
        </div>
      ) : filteredTests.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <TestCard test={test} locale={locale} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {t("noTestsFound")}
          </p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            {t("tryDifferentSearch")}
          </p>
        </motion.div>
      )}
    </div>
  );
}
