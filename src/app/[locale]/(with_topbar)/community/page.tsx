import { Props } from "@/types/setting";
import { setRequestLocale } from "next-intl/server";
import { PostList } from "@/components/community/PostList";
import { CommunitySidebar } from "@/components/community/CommunitySidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";

export default function CommunityPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="flex p-6 w-full">
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* 主内容区 */}
        <div className="flex-1 order-2 md:order-1 min-w-0">
          <ClientSideCommunity locale={locale} />
        </div>

        {/* 侧边栏 */}
        <div className="w-full md:w-80 order-1 md:order-2">
          <div className="sticky top-20">
            <ClientSideSidebar locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 客户端组件：社区主内容

function ClientSideCommunity({ locale }: { locale: string }) {
  const t = useTranslations("Community");

  return (
    <div className="w-full">
      {/* 移动端创建帖子按钮 */}
      <div className="flex justify-between items-center mb-6 md:hidden w-full">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("community")}
        </h1>
        <Button>
          <Link href="/community/create">
            <Plus className="h-4 w-4 mr-2" />
            {t("createPost")}
          </Link>
        </Button>
      </div>

      {/* 帖子列表 */}
      <PostList locale={locale} />
    </div>
  );
}

// 客户端组件：侧边栏

function ClientSideSidebar({ locale }: { locale: string }) {
  return <CommunitySidebar locale={locale} />;
}
