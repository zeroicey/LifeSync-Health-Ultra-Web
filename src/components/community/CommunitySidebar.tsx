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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {currentUser.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              <span>
                {currentUser.followers} {t("followers")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {currentUser.postsCount}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t("posts")}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {currentUser.following.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t("following")}
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Link
            href={`/community/create`}
            className="flex items-center w-full justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("createPost")}
          </Link>
        </Button>
      </div>

      {/* 搜索框 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* 分类列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {t("categories")}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                queryParams.categoryId === category.id &&
                  "bg-gray-100 dark:bg-gray-700"
              )}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center flex-row">
                <div className="mr-3 text-gray-500 dark:text-gray-400">
                  {getIconComponent(category.iconName)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-gray-100 flex gap-2">
                    {category.name}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {category.postCount} {t("posts")}
                    </span>
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* 热门标签 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
          {t("popularTags")}
        </h3>
        <div className="flex flex-wrap gap-2">
          {mockTags.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              variant={queryParams.tag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleTagClick(tag)}
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
