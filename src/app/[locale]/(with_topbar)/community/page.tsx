import { Props } from "@/types/setting";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function CommunityPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <div className="relative w-full">
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/10 dark:to-purple-900/5 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/10 dark:to-indigo-900/5 -z-10"></div>
      
      <div className="flex p-6 w-full">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* 主内容区 */}
          <div className="flex-1 order-2 md:order-1 min-w-0">
            <CommunityClient locale={locale} />
          </div>

          {/* 侧边栏 */}
          <div className="w-full md:w-80 order-1 md:order-2">
            <div className="sticky top-20">
              <SidebarClient locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 客户端组件导入
import CommunityClient from "./community-client";
import SidebarClient from "./sidebar-client";
