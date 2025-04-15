"use client";
import { PostList } from "@/components/community/PostList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CommunityContentProps {
  locale: string;
}

// 确保组件正确导出
export default function CommunityContent({ locale }: CommunityContentProps) {
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
