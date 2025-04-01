"use client";
import { useEffect, useState } from "react";
import { useCommunityStore } from "@/stores/community.store";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { useTranslations } from "next-intl";
import { PostsQueryParams } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface PostListProps {
  locale: string;
  initialQueryParams?: PostsQueryParams;
}

export function PostList({ locale, initialQueryParams }: PostListProps) {
  const t = useTranslations("Community");
  const { posts, isLoading, fetchPosts, queryParams } = useCommunityStore();
  const [initialLoading, setInitialLoading] = useState(true);

  // 初始加载帖子
  useEffect(() => {
    const loadPosts = async () => {
      setInitialLoading(true);
      await fetchPosts(initialQueryParams);
      setInitialLoading(false);
    };
    
    loadPosts();
  }, [fetchPosts, initialQueryParams]);

  // 加载更多帖子
  const handleLoadMore = () => {
    fetchPosts({
      ...queryParams,
      page: (queryParams.page || 1) + 1,
    });
  };

  // 刷新帖子
  const handleRefresh = () => {
    setInitialLoading(true);
    fetchPosts({
      ...queryParams,
      page: 1,
    }).finally(() => {
      setInitialLoading(false);
    });
  };

  // 渲染骨架屏
  const renderSkeletons = () => {
    return (
      <div className="w-full">
        {Array(3)
          .fill(0)
          .map((_, index) => <PostCardSkeleton key={index} />)}
      </div>
    );
  };

  // 渲染空状态
  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center w-full">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 mb-4">
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          {t("noPostsFound")}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          {t("tryDifferentKeywords")}
        </p>
        <Button onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("refreshPosts")}
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end mb-4 w-full">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading || initialLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${(isLoading || initialLoading) ? 'animate-spin' : ''}`} />
          {t("refreshPosts")}
        </Button>
      </div>
      
      {initialLoading ? (
        renderSkeletons()
      ) : posts.length > 0 ? (
        <div className="w-full">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
          <div className="flex justify-center mt-6 w-full">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoading}
              className="w-full max-w-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loading")}
                </>
              ) : (
                t("loadMore")
              )}
            </Button>
          </div>
        </div>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
