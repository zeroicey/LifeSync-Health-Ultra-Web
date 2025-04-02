import { setRequestLocale } from "next-intl/server";
import { CreatePostPage } from "@/components/community/CreatePostPage";

interface CreatePostPageProps {
  params: {
    locale: string;
  }
}

export default function CreatePost({ params }: CreatePostPageProps) {
  const { locale } = params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6 w-full">
      <CreatePostPage locale={locale} />
    </div>
  );
}