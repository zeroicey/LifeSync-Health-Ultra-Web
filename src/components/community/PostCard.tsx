"use client";
import { Post } from "@/types/community";
import { useCommunityStore } from "@/stores/community.store";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS, ja } from "date-fns/locale";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Trash2,
  Edit,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

interface PostCardProps {
  post: Post;
  locale: string;
}

export function PostCard({ post, locale }: PostCardProps) {
  const t = useTranslations("Community");
  const { likePost, deletePost, currentUser } = useCommunityStore();
  const [isDeleting, setIsDeleting] = useState(false);

  // 检查当前用户是否是帖子作者
  const isAuthor = post.authorId === currentUser.id;

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

  const formattedDate = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: getLocale(),
  });

  // 处理帖子点赞
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(post.id);
  };

  // 处理帖子删除
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(t("confirmDeletePost"))) {
      setIsDeleting(true);
      await deletePost(post.id);
      setIsDeleting(false);
    }
  };

  // 处理帖子编辑
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 根据标签获取渐变色
  const getTagGradient = (tag: string) => {
    const tagMap: Record<string, string> = {
      "健身": "from-blue-500 to-indigo-600 text-white",
      "营养": "from-green-500 to-emerald-600 text-white",
      "瑜伽": "from-purple-500 to-pink-600 text-white",
      "跑步": "from-orange-500 to-amber-600 text-white",
      "冥想": "from-indigo-500 to-purple-600 text-white",
      "健康食谱": "from-emerald-500 to-teal-600 text-white",
      "减肥": "from-rose-500 to-pink-600 text-white",
      "增肌": "from-blue-600 to-indigo-700 text-white",
      "压力管理": "from-violet-500 to-purple-600 text-white",
      "睡眠": "from-blue-400 to-indigo-500 text-white",
      "户外活动": "from-green-600 to-emerald-700 text-white",
      "心理健康": "from-pink-500 to-rose-600 text-white",
      "饮食计划": "from-teal-500 to-green-600 text-white",
      "健康习惯": "from-cyan-500 to-blue-600 text-white",
      "运动恢复": "from-amber-500 to-orange-600 text-white",
    };
    
    return tagMap[tag] || "from-gray-500 to-gray-600 text-white";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/community/posts/${post.id}`}
        className="block relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 mb-5 cursor-pointer border border-indigo-100/50 dark:border-indigo-900/30"
      >
        {/* 背景装饰 */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-purple-900/10 -z-10"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-indigo-900/10 -z-10"></div>
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-11 w-11 mr-3 border-2 border-indigo-100 dark:border-indigo-800 shadow-sm">
              <AvatarImage src={post.authorAvatar} alt={post.authorName} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {post.authorName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {post.authorName}
              </h3>
              <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80">
                {formattedDate}
              </p>
            </div>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                >
                  <MoreHorizontal className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border border-indigo-100 dark:border-indigo-800 shadow-lg">
                <DropdownMenuItem className="focus:bg-indigo-50 dark:focus:bg-indigo-900/30">
                  <Link
                    href={`/community/edit/${post.id}`}
                    className="flex items-center w-full text-indigo-600 dark:text-indigo-400"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {t("edit")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-900/30"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? t("deleting") : t("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {post.title && (
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 line-clamp-2">
            {post.title}
          </h2>
        )}

        <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-line line-clamp-3">
          {post.content}
        </p>

        {post.imageUrls && post.imageUrls.length > 0 && (
          <div
            className={cn(
              "grid gap-3 mb-4",
              post.imageUrls.length === 1
                ? "grid-cols-1"
                : post.imageUrls.length === 2
                ? "grid-cols-2"
                : post.imageUrls.length === 3
                ? "grid-cols-3"
                : "grid-cols-2"
            )}
          >
            {post.imageUrls.map((url, index) => (
              <div
                key={index}
                className={cn(
                  "relative rounded-xl overflow-hidden shadow-md border border-indigo-100/50 dark:border-indigo-900/30",
                  post.imageUrls!.length === 1 ? "h-64" : "h-40"
                )}
              >
                <Image
                  src={url}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge 
                key={tag} 
                className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getTagGradient(tag)} shadow-sm`}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-indigo-100 dark:border-indigo-900/30">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex items-center gap-1 rounded-full px-3",
              post.isLiked 
                ? "text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30" 
                : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            )}
            onClick={handleLike}
          >
            <Heart
              className={cn("h-5 w-5", post.isLiked ? "fill-red-500" : "")}
            />
            <span className="font-medium">{post.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 rounded-full px-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/community/posts/${post.id}#comments`;
            }}
          >
            <MessageCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium">{post.commentsCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 rounded-full px-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-medium">{t("share")}</span>
          </Button>
        </div>
      </Link>
    </motion.div>
  );
}
