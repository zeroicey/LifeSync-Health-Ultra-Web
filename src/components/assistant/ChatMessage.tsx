"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from "@/types/assistant";
import { useAssistantStore } from "@/stores/assistant.store";
import { format } from "date-fns";
import { Loader2, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface ChatMessageProps {
  message: ChatMessageType;
  isLast: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const { currentAssistant } = useAssistantStore();
  const isUser = message.role === "user";
  
  const formattedTime = message.timestamp 
    ? format(new Date(message.timestamp), "HH:mm")
    : "";

  return (
    <div 
      className={cn(
        "flex w-full items-start gap-3 py-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* 助手头像 */}
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10 rounded-xl ring-2 ring-indigo-100 dark:ring-indigo-900">
            <AvatarImage src={currentAssistant?.avatar} alt={currentAssistant?.name} />
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
              {currentAssistant?.name?.substring(0, 2) || "AI"}
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "max-w-[85%] flex flex-col",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* 消息气泡 */}
        <Card 
          className={cn(
            "px-4 py-3 border-0 shadow-sm",
            isUser 
              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-tr-sm" 
              : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm"
          )}
        >
          {message.isThinking ? (
            <div className="flex items-center min-h-[24px] min-w-[120px]">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              <span className="text-sm font-medium">思考中...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          )}
        </Card>

        {/* 时间戳 */}
        <div className="flex items-center gap-1.5 mt-1 px-1">
          {isUser ? (
            <User className="h-3 w-3 text-gray-400 dark:text-gray-600" />
          ) : (
            <MessageSquare className="h-3 w-3 text-gray-400 dark:text-gray-600" />
          )}
          <span className="text-xs text-gray-400 dark:text-gray-600">
            {formattedTime}
          </span>
        </div>
      </motion.div>

      {/* 用户头像 */}
      {isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-10 w-10 rounded-xl ring-2 ring-emerald-100 dark:ring-emerald-900">
            <AvatarImage src="/images/user-avatar.png" alt="You" />
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold">
              您
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
