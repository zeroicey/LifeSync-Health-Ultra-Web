"use client";

import { useTranslations } from "next-intl";
import { useAssistantStore } from "@/stores/assistant.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  MessageSquare, 
  Trash2, 
  Bot 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AIModelType } from "@/types/assistant";
import { motion } from "framer-motion";

interface SessionListProps {
  assistantId?: string;
  onSelectSession?: () => void;
}

export function SessionList({ assistantId, onSelectSession }: SessionListProps) {
  const t = useTranslations("Assistant");
  const { 
    chatSessions, 
    currentSession, 
    selectSession, 
    createNewSession, 
    deleteSession,
    getAssistantById
  } = useAssistantStore();
  
  // 根据助手ID筛选会话
  const filteredSessions = assistantId
    ? chatSessions.filter(session => session.assistantId === assistantId)
    : chatSessions;
  
  // 按更新时间排序
  const sortedSessions = [...filteredSessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return t("today");
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t("yesterday");
    } else {
      return format(date, "MM-dd");
    }
  };
  
  // 获取模型名称
  const getModelName = (type: AIModelType) => {
    switch (type) {
      case AIModelType.ChatGPT:
        return "ChatGPT";
      case AIModelType.DeepSeek:
        return "DeepSeek";
      case AIModelType.Claude:
        return "Claude";
      default:
        return type;
    }
  };
  
  // 获取会话的第一条消息内容（预览）
  const getSessionPreview = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (!session || session.messages.length === 0) return "";
    
    // 获取第一条消息（一般是助手的欢迎消息）
    const firstMessage = session.messages[0];
    if (!firstMessage) return "";
    
    // 截断消息内容
    return firstMessage.content.length > 40
      ? `${firstMessage.content.substring(0, 40)}...`
      : firstMessage.content;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950 dark:to-purple-950">
        <div className="relative mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
            <Input
              placeholder={t("searchChats")}
              className="pl-10 text-sm bg-white dark:bg-gray-900 border-indigo-100 dark:border-indigo-900 rounded-lg focus-visible:ring-indigo-500 dark:focus-visible:ring-indigo-400 shadow-sm"
            />
          </div>
        </div>
        
        <Button
          onClick={() => assistantId && createNewSession(assistantId)}
          disabled={!assistantId}
          className="w-full gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-lg py-5 shadow-md hover:shadow-lg transition-all duration-200"
          size="lg"
        >
          <Plus className="h-5 w-5" /> {t("newChat")}
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <style jsx global>{`
          .session-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .session-scroll::-webkit-scrollbar-track {
            background: transparent;
          }
          .session-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.3);
            border-radius: 20px;
            border: 2px solid transparent;
          }
          .session-scroll::-webkit-scrollbar-thumb:hover {
            background-color: rgba(156, 163, 175, 0.5);
          }
          .session-scroll {
            scrollbar-width: thin;
            scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
          }
        `}</style>
        {sortedSessions.length > 0 ? (
          <div className="p-5 space-y-3">
            {sortedSessions.map((session) => {
              const assistant = getAssistantById(session.assistantId);
              const isActive = currentSession?.id === session.id;
              
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="mb-1"
                >
                  <div
                    className={cn(
                      "flex items-start p-4 rounded-xl cursor-pointer group transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/20 border border-indigo-200 dark:border-indigo-800 shadow-sm"
                        : "hover:bg-gray-50 dark:hover:bg-gray-900/60 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
                    )}
                    onClick={() => {
                      selectSession(session.id);
                      if (onSelectSession) onSelectSession();
                    }}
                  >
                    <div className="flex-shrink-0 mr-3">
                      {assistant ? (
                        <Avatar className="h-10 w-10 rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900 shadow-sm">
                          <AvatarImage
                            src={assistant.avatar}
                            alt={assistant.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                            {assistant.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center shadow-sm">
                          <Bot className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {session.title}
                        </h4>
                        <span className="text-xs bg-white dark:bg-gray-800 px-2 py-0.5 rounded-full text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0 shadow-sm border border-gray-100 dark:border-gray-700">
                          {formatDate(session.updatedAt)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1.5 bg-gray-50 dark:bg-gray-900 rounded-md px-2 py-1">
                        <MessageSquare className="h-3 w-3 mr-1.5 text-indigo-500 dark:text-indigo-400" />
                        <span className="truncate leading-relaxed">
                          {getSessionPreview(session.id)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full text-xs">
                          {getModelName(session.modelType)}
                        </Badge>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-500 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center h-60 text-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
              <MessageSquare className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">
              {assistantId 
                ? t("noChatsWithAssistant")
                : t("noChats")
              }
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {t("startNewChat")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
