"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAssistantStore } from "@/stores/assistant.store";
import { AssistantList } from "./AssistantList";
import { SessionList } from "./SessionList";
import { ChatInterface } from "./ChatInterface";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Menu, MessageSquare, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AssistantPage() {
  const t = useTranslations("Assistant");
  const { currentAssistant } = useAssistantStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [sidebarTab, setSidebarTab] = useState<string>("assistants");

  // 在移动设备上，如果选择了助手，则隐藏侧边栏
  useEffect(() => {
    if (isMobile && currentAssistant) {
      setShowSidebar(false);
    }
  }, [isMobile, currentAssistant]);

  // 响应窗口大小变化
  useEffect(() => {
    setShowSidebar(!isMobile || !currentAssistant);
  }, [isMobile, currentAssistant]);

  // 切换侧边栏显示状态
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // 当在移动设备上选择助手后关闭侧边栏
  const handleSelectAssistant = () => {
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <main className="flex h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900 overflow-hidden fixed inset-x-0 bottom-0 top-16">
      {/* 侧边栏 - 仅在showSidebar为true时显示 */}
      {showSidebar && (
        <aside
          className={`${
            isMobile ? "w-full" : "w-80 xl:w-96"
          } bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden shadow-xl dark:shadow-indigo-900/10`}
        >
          <AssistantList />
        </aside>
      )}

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-950 shadow-sm rounded-l-lg">
        {/* 移动设备返回按钮 - 仅在isMobile为true且显示聊天界面时显示 */}
        {isMobile && currentAssistant && (
          <div className="p-2 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t("back")}
            </Button>
          </div>
        )}

        {/* 桌面版汉堡菜单 - 仅在非移动设备且侧边栏隐藏时显示 */}
        {!isMobile && !showSidebar && (
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full h-10 w-10 shadow-md"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}

        {/* 聊天界面 */}
        <ChatInterface
          onToggleSidebar={toggleSidebar}
          onSelectAssistant={handleSelectAssistant}
        />
      </div>
    </main>
  );
}
