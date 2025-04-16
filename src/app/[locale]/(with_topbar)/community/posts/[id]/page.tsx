import { setRequestLocale } from "next-intl/server";
import { PostDetail } from "@/components/community/PostDetail";

interface PostDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // 在 Next.js 15 中，动态路由参数是异步的，需要先 await
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6 w-full">
      <PostDetail locale={locale} postId={id} />
    </div>
  );
}
