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

  return (
    <Link
      href={`/community/posts/${post.id}`}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 mb-4 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
            <AvatarFallback>{post.authorName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {post.authorName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
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
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href={`/community/edit/${post.id}`}
                  className="flex items-center w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {t("edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? t("deleting") : t("delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {post.title && (
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
          {post.title}
        </h2>
      )}

      <p className="text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">
        {post.content}
      </p>

      {post.imageUrls && post.imageUrls.length > 0 && (
        <div
          className={cn(
            "grid gap-2 mb-3",
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
                "relative rounded-lg overflow-hidden",
                post.imageUrls!.length === 1 ? "h-64" : "h-40"
              )}
            >
              <Image
                src={url}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          ))}
        </div>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex items-center gap-1",
            post.isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          )}
          onClick={handleLike}
        >
          <Heart
            className={cn("h-5 w-5", post.isLiked ? "fill-red-500" : "")}
          />
          <span>{post.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = `/community/posts/${post.id}#comments`;
          }}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.commentsCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          onClick={(e) => e.stopPropagation()}
        >
          <Share2 className="h-5 w-5" />
          <span>{t("share")}</span>
        </Button>
      </div>
    </Link>
  );
}
