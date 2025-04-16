import { setRequestLocale } from "next-intl/server";
import { PostDetail } from "@/components/community/PostDetail";
import { use } from "react";

interface PostDetailPageProps {
  params: {
    locale: Promise<string>;
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { locale, id } = await use(params);
  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6 w-full">
      <PostDetail locale={locale} postId={id} />
    </div>
  );
}
