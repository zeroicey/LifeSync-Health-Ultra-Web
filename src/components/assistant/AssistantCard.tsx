"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AIAssistant } from "@/types/assistant";
import { useAssistantStore } from "@/stores/assistant.store";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface AssistantCardProps {
  assistant: AIAssistant;
  isFavorite: boolean;
}

export function AssistantCard({ assistant, isFavorite }: AssistantCardProps) {
  const t = useTranslations("Assistant");
  const { toggleFavorite, selectAssistant } = useAssistantStore();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden cursor-pointer border border-indigo-100/50 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-lg bg-white dark:bg-gray-900 rounded-xl">
        <CardContent className="p-0 flex flex-col h-full">
          {/* 卡片顶部背景 */}
          <div className="p-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 relative">
            <div className="absolute top-3 right-3 z-10">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(assistant.id);
                }}
                className={`h-8 w-8 rounded-full shadow-sm ${isFavorite ? "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 border-amber-200 dark:border-amber-800" : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"}`}
              >
                <Star className={isFavorite ? "fill-amber-500" : ""} size={16} />
              </Button>
            </div>
            {/* 助手头像和介绍 */}
            <div className="flex items-start gap-4 p-5 pt-8 pb-6">
              <Avatar className="h-16 w-16 rounded-xl ring-4 ring-white dark:ring-gray-800 shadow-md">
                <AvatarImage src={assistant.avatar} alt={assistant.name} />
                <AvatarFallback className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                  {assistant.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {assistant.name}
                  </h3>
                  <Badge className="ml-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-0">
                    {t(`roles.${assistant.role}`)}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-snug">
                  {assistant.description}
                </p>
              </div>
            </div>
          </div>

          {/* 卡片内容区域 */}
          <div className="flex flex-col flex-grow p-5 pt-3">
            <div className="mb-2">
              <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                {t("specialty")}
              </h4>
              <div className="flex flex-wrap gap-2">
                {assistant.specialty.slice(0, isMobile ? 2 : 3).map((spec, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-2.5 py-1 rounded-full text-xs"
                  >
                    {spec}
                  </Badge>
                ))}
                {assistant.specialty.length > (isMobile ? 2 : 3) && (
                  <Badge
                    variant="outline"
                    className="bg-gray-50/50 text-gray-700 dark:bg-gray-900/80 dark:text-gray-300 border-gray-200 dark:border-gray-800 px-2.5 py-1 rounded-full text-xs"
                  >
                    +{assistant.specialty.length - (isMobile ? 2 : 3)}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mt-auto pt-3">
              <Button
                onClick={() => selectAssistant(assistant.id)}
                className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg py-5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <MessageCircle size={18} /> {t("chat")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
