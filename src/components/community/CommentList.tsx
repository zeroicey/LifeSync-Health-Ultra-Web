import { Comment } from "@/types/community";
import { useCommunityStore } from "@/stores/community.store";
import { formatDistanceToNow } from "date-fns";
import { zhCN, enUS, ja } from "date-fns/locale";
import { Heart, Reply, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CommentListProps {
  postId: string;
  locale: string;
}

export function CommentList({ postId, locale }: CommentListProps) {
  const t = useTranslations("Community");
  const { comments, createComment, likeComment, currentUser } = useCommunityStore();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
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
  
  // 处理评论提交
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    await createComment({
      postId,
      content: newComment
    });
    setNewComment("");
    setIsSubmitting(false);
  };
  
  // 处理回复提交
  const handleReplySubmit = async (parentId: string) => {
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    await createComment({
      postId,
      content: replyContent,
      parentId
    });
    setReplyContent("");
    setReplyingTo(null);
    setIsSubmitting(false);
  };
  
  // 处理评论点赞
  const handleLikeComment = (commentId: string) => {
    likeComment(commentId);
  };
  
  // 渲染回复表单
  const renderReplyForm = (commentId: string) => {
    if (replyingTo !== commentId) return null;
    
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
            onClick={() => setReplyingTo(null)}
            disabled={isSubmitting}
          >
            {t("cancel")}
          </Button>
          <Button
            size="sm"
            onClick={() => handleReplySubmit(commentId)}
            disabled={isSubmitting || !replyContent.trim()}
          >
            {isSubmitting ? t("publishing") : t("reply")}
          </Button>
        </div>
      </div>
    );
  };
  
  // 渲染单个评论
  const renderComment = (comment: Comment) => {
    return (
      <div key={comment.id} className="mb-4 last:mb-0">
        <div className="flex">
          <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
            <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
            <AvatarFallback>{comment.authorName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">{comment.authorName}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{comment.content}</p>
            </div>
            
            <div className="flex items-center mt-1 space-x-4 pl-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-2 text-xs",
                  comment.isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                )}
                onClick={() => handleLikeComment(comment.id)}
              >
                <Heart className={cn("h-4 w-4 mr-1", comment.isLiked ? "fill-red-500" : "")} />
                <span>{comment.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-gray-500 dark:text-gray-400"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="h-4 w-4 mr-1" />
                <span>{t("reply")}</span>
              </Button>
            </div>
            
            {renderReplyForm(comment.id)}
            
            {/* 渲染回复评论 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 pl-6 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex">
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src={reply.authorAvatar} alt={reply.authorName} />
                      <AvatarFallback>{reply.authorName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{reply.authorName}</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(reply.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                      </div>
                      
                      <div className="flex items-center mt-1 space-x-4 pl-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "h-6 px-2 text-xs",
                            reply.isLiked ? "text-red-500" : "text-gray-500 dark:text-gray-400"
                          )}
                          onClick={() => handleLikeComment(reply.id)}
                        >
                          <Heart className={cn("h-3 w-3 mr-1", reply.isLiked ? "fill-red-500" : "")} />
                          <span>{reply.likes}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {t("comment")} ({comments.length})
      </h2>
      
      {/* 评论表单 */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder={t("writeComment")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] mb-2"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
              >
                {isSubmitting ? t("publishing") : t("postComment")}
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map(renderComment)
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">{t("noCommentsYet")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
