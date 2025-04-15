"use client";

import { PostList } from "@/components/community/PostList";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

// 社区主内容组件
export function CommunityContent({ locale }: { locale: string }) {
  const t = useTranslations("Community");

  return (
    <div className="w-full">
      {/* 移动端创建帖子按钮 */}
      <div className="flex justify-between items-center mb-6 md:hidden w-full">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
          {t("community")}
        </h1>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg">
          <Link href="/community/create" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            {t("createPost")}
          </Link>
        </Button>
      </div>

      {/* 帖子列表 */}
      <PostList locale={locale} />
    </div>
  );
}

// 社区侧边栏组件
export function SidebarContent({ locale }: { locale: string }) {
  return <CommunitySidebar locale={locale} />;
}

// 主内容包装组件
export function MainContent({ locale }: { locale: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 order-2 md:order-1 min-w-0"
    >
      <CommunityContent locale={locale} />
    </motion.div>
  );
}

// 侧边栏包装组件
export function SidebarWrapper({ locale }: { locale: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full md:w-80 order-1 md:order-2"
    >
      <div className="sticky top-20">
        <SidebarContent locale={locale} />
      </div>
    </motion.div>
  );
}
