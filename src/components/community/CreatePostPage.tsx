"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CreatePostForm } from "./CreatePostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Link } from "@/i18n/navigation";

interface CreatePostPageProps {
  locale: string;
}

export function CreatePostPage({ locale }: CreatePostPageProps) {
  const t = useTranslations("Community");

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
        title={t("createPost")}
        description={t("createPostDescription")}
      />

      {/* 创建帖子表单 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
        <CreatePostForm locale={locale} />
      </div>
    </div>
  );
}
