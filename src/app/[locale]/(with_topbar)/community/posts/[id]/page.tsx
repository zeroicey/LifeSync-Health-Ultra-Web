import { setRequestLocale } from "next-intl/server";
import { PostDetail } from "@/components/community/PostDetail";

interface PostDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { locale, id } = params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6 w-full">
      <PostDetail locale={locale} postId={id} />
    </div>
  );
}
