"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { useAssistantStore } from "@/stores/assistant.store";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AssistantCard } from "./AssistantCard";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AssistantList() {
  const t = useTranslations("Assistant");
  const { assistants, favoriteAssistants } = useAssistantStore();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-3 overflow-y-auto p-4" ref={containerRef}>
      <div className="py-2">
        <h3 className="text-lg font-semibold mb-1 text-indigo-600 dark:text-indigo-400 text-center">
          {t("title")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
          {t("description")}
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-220px)]" type="always">
        <div className="grid grid-cols-1 gap-4 px-2 py-4">
          <AnimatedGrid items={assistants} />
        </div>
      </ScrollArea>
    </div>
  );
}

// 使用动画效果显示助手卡片
function AnimatedGrid({ items }: { items: any[] }) {
  const { favoriteAssistants } = useAssistantStore();
  
  if (items.length === 0) return null;
  
  return (
    <>
      {items.map((assistant, index) => (
        <motion.div
          key={assistant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
          className="h-full"
        >
          <AssistantCard
            assistant={assistant}
            isFavorite={favoriteAssistants.includes(assistant.id)}
          />
        </motion.div>
      ))}
    </>
  );
}
