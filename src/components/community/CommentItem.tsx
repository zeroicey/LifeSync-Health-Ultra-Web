import { Comment } from "@/types/community";
import { useCommunityStore } from "@/stores/community.store";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS, ja } from "date-fns/locale";
import { Heart, Reply } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CommentItemProps {
  comment: Comment;
  postId: string;
  locale: string;
  level?: number;
}

export function CommentItem({ comment, postId, locale, level = 0 }: CommentItemProps) {
  const t = useTranslations("Community");
  const { createComment, likeComment } = useCommunityStore();
  const [replyingTo, setReplyingTo] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 格式化日期
  const getLocale = () => {
    switch (locale) {
      case "zh": return zhCN;
      case "ja": return ja;
      default: return enUS;
    }
  };
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: getLocale()
    });
  };
  
  // 处理回复提交
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    await createComment({
      postId,
      content: replyContent,
      parentId: comment.id
    });
    setReplyContent("");
    setReplyingTo(false);
    setIsSubmitting(false);
  };
  
  // 处理评论点赞
  const handleLikeComment = () => {
    likeComment(comment.id);
  };
  
  // 渲染回复表单
  const renderReplyForm = () => {
    if (!replyingTo) return null;
    
    return (
      <div className="mt-2 pl-12">
        <Textarea
          placeholder={t("writeComment")}
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="min-h-[80px] mb-2"
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReplyingTo(false)}
            disabled={isSubmitting}
          >
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            onClick={handleReplySubmit}
            disabled={isSubmitting || !replyContent.trim()}
          >
            {isSubmitting ? t("publishing") : t("reply")}
          </Button>
        </div>
      </div>
    );
  };

  const isReply = level > 0;
  
  return (
    <div className={cn("mb-4 last:mb-0", isReply ? "mt-3 pl-6" : "")}>
      <div className="flex">
        <Avatar className={cn(isReply ? "h-8 w-8 mr-2" : "h-10 w-10 mr-3", "flex-shrink-0")}>
          <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
          <AvatarFallback>{comment.authorName.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between items-start mb-1">
              <h4 className={cn(
                "font-semibold text-gray-900 dark:text-gray-100",
                isReply ? "text-sm" : ""
              )}>
                {comment.authorName}
              </h4>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className={cn(
              "text-gray-700 dark:text-gray-300 whitespace-pre-line",
              isReply ? "text-sm" : ""
            )}>
              {comment.content}
            </p>
          </div>
          
          <div className="flex items-center mt-1 space-x-4 pl-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                isReply ? "h-6 px-2 text-xs" : "h-8 px-2 text-xs",
                comment.isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
              )}
              onClick={handleLikeComment}
            >
              <Heart className={cn(
                isReply ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1", 
                comment.isLiked ? "fill-red-500" : ""
              )} />
              <span>{comment.likes}</span>
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-gray-500 dark:text-gray-400"
                onClick={() => setReplyingTo(!replyingTo)}
              >
                <Reply className="h-4 w-4 mr-1" />
                <span>{t("reply")}</span>
              </Button>
            )}
          </div>
          
          {renderReplyForm()}
          
          {/* 渲染回复评论 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  postId={postId} 
                  locale={locale} 
                  level={level + 1} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
