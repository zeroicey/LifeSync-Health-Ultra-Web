"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAssistantStore } from "@/stores/assistant.store";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ModelSelector } from "./ModelSelector";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Info, List, MessageSquare, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// 移除ScrollArea导入，使用原生滚动

interface ChatInterfaceProps {
  onToggleSidebar?: () => void;
  onSelectAssistant?: () => void;
}

export function ChatInterface({ onToggleSidebar, onSelectAssistant }: ChatInterfaceProps) {
  const t = useTranslations("Assistant");
  const { currentAssistant, currentSession, createNewSession, selectAssistant } =
    useAssistantStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 滚动到聊天底部 - 使用更可靠的方法
  useEffect(() => {
    if (messagesEndRef.current) {
      // 延迟滚动以确保内容已渲染
      setTimeout(() => {
        const scrollContainer = document.getElementById("chat-scroll-container");
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }, 100);
    }
  }, [currentSession?.messages]);
  
  // 当选择助手时通知父组件
  const handleSelectAssistant = (assistantId: string) => {
    selectAssistant(assistantId);
    if (onSelectAssistant) {
      onSelectAssistant();
    }
  };

  // 如果没有选择助手，显示欢迎界面
  if (!currentAssistant || !currentSession) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      >
        <Card className="w-full max-w-md border-0 shadow-lg dark:shadow-indigo-900/10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Bot className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">
              {t("welcomeTitle")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t("welcomeDescription")}
            </p>

            <Button 
              onClick={onToggleSidebar} 
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              size="lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              {t("selectAssistant")}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 聊天头部 */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <List className="h-5 w-5" />
        </Button>

        <Avatar className="h-10 w-10 ring-2 ring-indigo-100 dark:ring-indigo-900">
          <AvatarImage
            src={currentAssistant.avatar}
            alt={currentAssistant.name}
          />
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium">
            {currentAssistant.name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">{currentAssistant.name}</h3>
            <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800">
              {t(`roles.${currentAssistant.role}`)}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {currentAssistant.description}
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            if (currentAssistant) {
              createNewSession(currentAssistant.id);
              if (onSelectAssistant) onSelectAssistant();
            }
          }}
          className="text-xs flex items-center gap-1 bg-white dark:bg-gray-950"
          size="sm"
        >
          <Plus className="h-3.5 w-3.5" />
          {t("newChat")}
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {/* 模型选择器 */}
      <ModelSelector />

      {/* 聊天内容区域 - 使用原生滚动 */}
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent" id="chat-scroll-container">
          <style jsx global>{`
            #chat-scroll-container::-webkit-scrollbar {
              width: 8px;
            }
            #chat-scroll-container::-webkit-scrollbar-track {
              background: transparent;
            }
            #chat-scroll-container::-webkit-scrollbar-thumb {
              background-color: rgba(156, 163, 175, 0.3);
              border-radius: 20px;
              border: 3px solid transparent;
            }
            #chat-scroll-container::-webkit-scrollbar-thumb:hover {
              background-color: rgba(156, 163, 175, 0.5);
            }
            #chat-scroll-container {
              scrollbar-width: thin;
              scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
            }
          `}</style>
          <div className="max-w-4xl mx-auto px-4 pt-4 pb-8">
            {/* 助手简介 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Card className="border border-indigo-100 dark:border-indigo-900 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-5">
                    <Avatar className="h-16 w-16 rounded-xl ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-md">
                      <AvatarImage
                        src={currentAssistant.avatar}
                        alt={currentAssistant.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">
                        {currentAssistant.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
                          {currentAssistant.name}
                        </h3>
                        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 border-0">
                          {t(`roles.${currentAssistant.role}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                        {currentAssistant.introduction}
                      </p>

                      <div className="bg-indigo-50/70 dark:bg-indigo-950/50 rounded-lg p-3">
                        <p className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
                          {t("capabilities")}:
                        </p>
                        <ul className="grid gap-2 text-gray-700 dark:text-gray-300">
                          {currentAssistant.capabilities.map((capability, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="h-5 w-5 bg-indigo-200 dark:bg-indigo-800 rounded-full flex items-center justify-center text-xs text-indigo-800 dark:text-indigo-200 mt-0.5">{index + 1}</div>
                              <span className="flex-1">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* 消息列表 */}
            <div className="space-y-6" id="chat-messages">
              {currentSession.messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 3) }}
                >
                  <ChatMessage
                    message={message}
                    isLast={index === currentSession.messages.length - 1}
                  />
                </motion.div>
              ))}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* 输入区域 */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg">
        <ChatInput />
      </div>
    </div>
  );
}
