import { setRequestLocale } from "next-intl/server";
import { EditPostPage } from "@/components/community/EditPostPage";

interface EditPostPageProps {
  params: {
    locale: string;
    id: string;
  }
}

export default function EditPost({ params }: EditPostPageProps) {
  const { locale, id } = params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col p-6 w-full">
      <EditPostPage locale={locale} postId={id} />
    </div>
  );
}