"use client";
import { useCommunityStore } from "@/stores/community.store";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Users,
  Dumbbell,
  Apple,
  Brain,
  Moon,
  Leaf,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { mockTags } from "@/mock/communityData";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface CommunitySidebarProps {
  locale: string;
  isLoading?: boolean;
}

export function CommunitySidebar({
  locale,
  isLoading = false,
}: CommunitySidebarProps) {
  const t = useTranslations("Community");
  const { categories, currentUser, queryParams, fetchPosts, fetchCategories } =
    useCommunityStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // 初始加载分类
  useEffect(() => {
    const loadCategories = async () => {
      await fetchCategories();
      setIsInitialLoading(false);
    };

    loadCategories();
  }, [fetchCategories]);

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts({ searchQuery, page: 1 });
  };

  // 处理分类点击
  const handleCategoryClick = (categoryId: string) => {
    const isActive = queryParams.categoryId === categoryId;
    fetchPosts({
      categoryId: isActive ? undefined : categoryId,
      page: 1,
    });
  };

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    const isActive = queryParams.tag === tag;
    fetchPosts({
      tag: isActive ? undefined : tag,
      page: 1,
    });
  };

  // 获取图标组件
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Dumbbell":
        return <Dumbbell className="h-5 w-5" />;
      case "Apple":
        return <Apple className="h-5 w-5" />;
      case "Brain":
        return <Brain className="h-5 w-5" />;
      case "Moon":
        return <Moon className="h-5 w-5" />;
      case "Leaf":
        return <Leaf className="h-5 w-5" />;
      default:
        return <Dumbbell className="h-5 w-5" />;
    }
  };

  // 获取分类对应的颜色
  const getCategoryColor = (iconName: string) => {
    switch (iconName) {
      case "Dumbbell":
        return "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700";
      case "Apple":
        return "from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700";
      case "Brain":
        return "from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700";
      case "Moon":
        return "from-indigo-500 to-violet-600 dark:from-indigo-600 dark:to-violet-700";
      case "Leaf":
        return "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700";
      default:
        return "from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700";
    }
  };

  // 如果正在加载，则导入并返回骨架屏组件
  if (isLoading || isInitialLoading) {
    // 使用动态导入避免服务端渲染问题
    const CommunitySidebarSkeleton =
      require("./CommunitySidebarSkeleton").CommunitySidebarSkeleton;
    return <CommunitySidebarSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* 用户信息卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-5 border border-indigo-100/50 dark:border-indigo-900/30"
      >
        {/* 背景装饰 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-purple-900/10 -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-indigo-900/10 -z-10"></div>
        
        <div className="flex items-center mb-5">
          <Avatar className="h-12 w-12 mr-3 border-2 border-indigo-100 dark:border-indigo-800 shadow-sm">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              {currentUser.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {currentUser.name}
            </h3>
            <div className="flex items-center text-sm text-indigo-600/80 dark:text-indigo-400/80">
              <Users className="h-4 w-4 mr-1" />
              <span>
                {currentUser.followers} {t("followers")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-lg p-3 text-center shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
            <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {currentUser.postsCount}
            </div>
            <div className="text-xs text-indigo-500/80 dark:text-indigo-400/80 font-medium">
              {t("posts")}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/20 rounded-lg p-3 text-center shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {currentUser.following.length}
            </div>
            <div className="text-xs text-purple-500/80 dark:text-purple-400/80 font-medium">
              {t("following")}
            </div>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg">
          <Link
            href={`/community/create`}
            className="flex items-center w-full justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("createPost")}
          </Link>
        </Button>
      </motion.div>

      {/* 搜索框 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-5 border border-indigo-100/50 dark:border-indigo-900/30"
      >
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="pl-10 bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/50 focus:border-indigo-300 dark:focus:border-indigo-700 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </motion.div>

      {/* 分类列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-5 border border-indigo-100/50 dark:border-indigo-900/30"
      >
        <h3 className="font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
          {t("categories")}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = queryParams.categoryId === category.id;
            const gradientColor = getCategoryColor(category.iconName);
            
            return (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start rounded-lg transition-all duration-200 hover:shadow-md",
                  isActive
                    ? `bg-gradient-to-r ${gradientColor} text-white shadow-sm`
                    : "bg-indigo-50/50 dark:bg-indigo-900/20 text-gray-700 dark:text-gray-300 hover:bg-indigo-100/70 dark:hover:bg-indigo-800/30"
                )}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex items-center flex-row w-full">
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full mr-3",
                    isActive
                      ? "bg-white/20"
                      : `bg-gradient-to-r ${gradientColor} text-white`
                  )}>
                    {getIconComponent(category.iconName)}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div className="font-medium">
                      {category.name}
                    </div>
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      isActive
                        ? "bg-white/20"
                        : "bg-white/70 dark:bg-gray-800/70 text-indigo-600 dark:text-indigo-400"
                    )}>
                      {category.postCount}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </motion.div>

      {/* 热门标签 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-5 border border-indigo-100/50 dark:border-indigo-900/30"
      >
        <h3 className="font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
          {t("popularTags")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {mockTags.slice(0, 12).map((tag) => {
            const isActive = queryParams.tag === tag;
            
            return (
              <Badge
                key={tag}
                variant={isActive ? "default" : "outline"}
                className={cn(
                  "cursor-pointer px-3 py-1 text-sm transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none shadow-sm"
                    : "border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                )}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </Badge>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
