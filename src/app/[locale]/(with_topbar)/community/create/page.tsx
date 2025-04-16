import { setRequestLocale } from "next-intl/server";
import { CreatePostPage } from "@/components/community/CreatePostPage";

interface CreatePostPageProps {
  params: {
    locale: string;
  };
}

export default function CreatePost({ params }: CreatePostPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <div className="relative w-full">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/10 dark:to-purple-900/5 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/10 dark:to-indigo-900/5 -z-10"></div>

      <div className="flex flex-col p-6 w-full">
        <CreatePostPage locale={locale} />
      </div>
    </div>
  );
}
