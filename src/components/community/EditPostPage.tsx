"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useCommunityStore } from "@/stores/community.store";
import { CreatePostForm } from "./CreatePostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Link } from "@/i18n/navigation";

interface EditPostPageProps {
  locale: string;
  postId: string;
}

export function EditPostPage({ locale, postId }: EditPostPageProps) {
  const t = useTranslations("Community");
  const { currentPost, fetchPostById, isLoading } = useCommunityStore();

  // 加载帖子详情
  useEffect(() => {
    fetchPostById(postId);
  }, [fetchPostById, postId]);

  // 如果正在加载，显示加载状态
  if (isLoading || !currentPost) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-gray-500 dark:text-gray-400">{t("loadingPost")}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 返回按钮 */}
      <Button variant="ghost" size="sm" className="mb-4">
        <Link href={`/community`}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("backToCommunity")}
        </Link>
      </Button>

      {/* 页面标题 */}
      <PageHeader 
        title={t("editPost")} 
        description={t("editPostDescription")} 
      />

      {/* 编辑帖子表单 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <CreatePostForm locale={locale} postToEdit={currentPost} />
      </div>
    </div>
  );
}
