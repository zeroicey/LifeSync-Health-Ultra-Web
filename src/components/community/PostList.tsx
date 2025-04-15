"use client";
import { useEffect, useState } from "react";
import { useCommunityStore } from "@/stores/community.store";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { useTranslations } from "next-intl";
import { PostsQueryParams } from "@/types/community";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="w-full space-y-4">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <PostCardSkeleton />
            </motion.div>
          ))}
      </div>
    );
  };

  // 渲染空状态
  const renderEmptyState = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center py-12 text-center w-full"
      >
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/20 rounded-full p-8 mb-6 shadow-md">
          <MessageSquare className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
        </div>
        <h3 className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 mb-3">
          {t("noPostsFound")}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          {t("tryDifferentKeywords")}
        </p>
        <Button 
          onClick={handleRefresh}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("refreshPosts")}
        </Button>
      </motion.div>
    );
  };

  // 帖子列表项动画
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-end mb-4 w-full">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading || initialLoading}
          className="bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${(isLoading || initialLoading) ? 'animate-spin' : ''}`} />
          {t("refreshPosts")}
        </Button>
      </div>
      
      {initialLoading ? (
        renderSkeletons()
      ) : posts.length > 0 ? (
        <motion.div 
          className="w-full space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {posts.map((post, index) => (
            <motion.div key={post.id} variants={itemVariants}>
              <PostCard post={post} locale={locale} />
            </motion.div>
          ))}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mt-8 w-full"
          >
            <Button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="w-full max-w-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 rounded-lg"
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
          </motion.div>
        </motion.div>
      ) : (
        renderEmptyState()
      )}
    </div>
  );
}
