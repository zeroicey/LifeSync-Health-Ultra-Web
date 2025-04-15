"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CreatePostForm } from "./CreatePostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit3 } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface CreatePostPageProps {
  locale: string;
}

export function CreatePostPage({ locale }: CreatePostPageProps) {
  const t = useTranslations("Community");

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* 返回按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg"
        >
          <Link href={`/community`} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backToCommunity")}
          </Link>
        </Button>
      </motion.div>

      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <PageHeader
          title={t("createPost")}
          description={t("createPostDescription")}
        />
      </motion.div>

      {/* 创建帖子表单 */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-6 mt-6 border border-indigo-100/50 dark:border-indigo-900/30"
      >
        {/* 背景装饰 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-purple-900/10 -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-indigo-900/10 -z-10"></div>
        
        {/* 表单图标 */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-full p-4 shadow-md">
            <Edit3 className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
          </div>
        </div>
        
        <CreatePostForm locale={locale} />
      </motion.div>
    </motion.div>
  );
}
