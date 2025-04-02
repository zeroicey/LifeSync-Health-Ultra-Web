"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCommunityStore } from "@/stores/community.store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentList } from "./CommentList";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS, ja } from "date-fns/locale";
import { Heart, MessageCircle, Share2, Edit, Trash2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { PostDetailSkeleton } from "./PostDetailSkeleton";
import { CommentForm } from "./CommentForm";

interface PostDetailProps {
  postId: string;
  locale: string;
}

export function PostDetail({ postId, locale }: PostDetailProps) {
  const t = useTranslations("Community");
  const router = useRouter();
  const { currentPost, fetchPostById, likePost, deletePost, isLoading, currentUser } = useCommunityStore();
  const [isDeleting, setIsDeleting] = useState(false);

  // 检查当前用户是否是帖子作者
  const isAuthor = currentPost?.authorId === currentUser.id;

  // 格式化日期
  const getLocale = () => {
    switch (locale) {
      case "zh":
        return zhCN;
      case "ja":
        return ja;
      default:
        return enUS;
    }
  };

  const formattedDate = currentPost
    ? formatDistanceToNow(new Date(currentPost.createdAt), {
        addSuffix: true,
        locale: getLocale(),
      })
    : "";

  // 加载帖子详情
  useEffect(() => {
    fetchPostById(postId);
  }, [fetchPostById, postId]);

  // 处理帖子点赞
  const handleLike = () => {
    if (currentPost) {
      likePost(currentPost.id);
    }
  };

  // 处理帖子删除
  const handleDelete = async () => {
    if (currentPost && confirm(t("confirmDeletePost"))) {
      setIsDeleting(true);
      await deletePost(currentPost.id);
      setIsDeleting(false);
      router.push("/community");
    }
  };

  // 返回上一页
  const handleGoBack = () => {
    router.back();
  };

  // 如果正在加载，显示骨架屏
  if (isLoading || !currentPost) {
    return <PostDetailSkeleton />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={handleGoBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("backToCommunity")}
      </Button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        {/* 帖子头部 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={currentPost.authorAvatar} alt={currentPost.authorName} />
              <AvatarFallback>{currentPost.authorName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {currentPost.authorName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </p>
            </div>
          </div>

          {/* 作者操作按钮 */}
          {isAuthor && (
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <Link href={`/community/edit/${currentPost.id}`}>
                  <Edit className="h-4 w-4 mr-1" />
                  {t("edit")}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                {isDeleting ? t("deleting") : t("delete")}
              </Button>
            </div>
          )}
        </div>

        {/* 帖子标题 */}
        {currentPost.title && (
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {currentPost.title}
          </h1>
        )}

        {/* 帖子内容 */}
        <div className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-lg">
            {currentPost.content}
          </p>
        </div>

        {/* 帖子图片 */}
        {currentPost.imageUrls && currentPost.imageUrls.length > 0 && (
          <div className="mb-6">
            <div
              className={cn(
                "grid gap-3",
                currentPost.imageUrls.length === 1
                  ? "grid-cols-1"
                  : currentPost.imageUrls.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              )}
            >
              {currentPost.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative rounded-lg overflow-hidden",
                    currentPost.imageUrls!.length === 1 ? "h-96" : "h-64"
                  )}
                >
                  <Image
                    src={url}
                    alt={`Post image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 帖子标签 */}
        {currentPost.tags && currentPost.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {currentPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* 帖子交互按钮 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1",
              currentPost.isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
            )}
            onClick={handleLike}
          >
            <Heart
              className={cn("h-5 w-5", currentPost.isLiked ? "fill-red-500" : "")}
            />
            <span>{currentPost.likes}</span>
            <span className="ml-1">{t("likes")}</span>
          </Button>

          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MessageCircle className="h-5 w-5 mr-1" />
            <span>{currentPost.commentsCount}</span>
            <span className="ml-1">{t("comments")}</span>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">
            <Share2 className="h-5 w-5 mr-1" />
            {t("share")}
          </Button>
        </div>
      </div>

      {/* 评论表单 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {t("leaveComment")}
        </h2>
        <CommentForm postId={currentPost.id} />
      </div>

      {/* 评论列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {t("comments")} ({currentPost.commentsCount})
        </h2>
        <CommentList postId={currentPost.id} locale={locale} />
      </div>
    </div>
  );
}
