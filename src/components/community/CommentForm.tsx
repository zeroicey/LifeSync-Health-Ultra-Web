"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCommunityStore } from "@/stores/community.store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCancel?: () => void;
}

export function CommentForm({ postId, parentId, onCancel }: CommentFormProps) {
  const t = useTranslations("Community");
  const { createComment, isSubmitting, currentUser } = useCommunityStore();
  const [content, setContent] = useState("");

  // 处理评论提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length === 0) return;
    
    await createComment({
      postId,
      content,
      parentId
    });
    
    setContent("");
    
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 mt-1">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <Textarea
            placeholder={parentId ? t("replyPlaceholder") : t("commentPlaceholder")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          
          <div className="flex justify-end gap-2 mt-2">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                {t("cancel")}
              </Button>
            )}
            
            <Button 
              type="submit" 
              disabled={content.trim().length === 0 || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                parentId ? t("reply") : t("comment")
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
