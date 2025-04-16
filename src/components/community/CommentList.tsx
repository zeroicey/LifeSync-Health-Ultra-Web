"use client";
import { Comment } from "@/types/community";
import { useCommunityStore } from "@/stores/community.store";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { CommentItem } from "./CommentItem";
import {
  CommentSkeleton,
  CommentFormSkeleton,
  ReplyCommentSkeleton,
} from "./CommentSkeleton";

interface CommentListProps {
  postId: string;
  locale: string;
}

export function CommentList({ postId, locale }: CommentListProps) {
  const t = useTranslations("Community");
  const { comments, createComment, currentUser, fetchComments } =
    useCommunityStore();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初始加载评论
  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      await fetchComments(postId);
      setIsLoading(false);
    };

    loadComments();
  }, [fetchComments, postId]);

  // 处理评论提交
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    await createComment({
      postId,
      content: newComment,
    });
    setNewComment("");
    setIsSubmitting(false);
  };

  // 渲染加载状态
  const renderSkeletons = () => {
    return (
      <>
        <CommentFormSkeleton />
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <CommentSkeleton key={index} />
          ))}
      </>
    );
  };

  return (
    <div className="space-y-6 w-full">
      {isLoading ? (
        renderSkeletons()
      ) : (
        <>
          {/* 评论表单 */}

          {/* 评论列表 */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments
                .filter((comment) => !comment.parentId)
                .map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    postId={postId}
                    locale={locale}
                  />
                ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  {t("noCommentsYet")}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
