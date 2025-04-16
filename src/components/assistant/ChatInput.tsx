"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAssistantStore } from "@/stores/assistant.store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Loader2, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatInput() {
  const t = useTranslations("Assistant");
  const { sendMessage, isLoading, currentSession } = useAssistantStore();
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 调整文本区域高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px";
      textareaRef.current.style.height = `${Math.min(
        120,
        textareaRef.current.scrollHeight
      )}px`;
    }
  }, [message]);

  // 处理消息发送
  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
    }
  };

  // 处理按键
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 切换语音输入
  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // 在真实应用中，这里会有语音识别相关代码
  };

  // 如果没有当前会话，不显示输入框
  if (!currentSession) {
    return null;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-950 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl border-2 border-indigo-100 dark:border-indigo-900 overflow-hidden shadow-md transition-all focus-within:border-indigo-300 dark:focus-within:border-indigo-700 bg-white dark:bg-gray-900">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("typeMessage")}
            className={cn(
              "min-h-[60px] max-h-[150px] resize-none pr-24 pl-5 py-4 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600",
              isLoading && "text-gray-500 dark:text-gray-500"
            )}
            disabled={isLoading}
          />
          
          <div className="absolute right-4 bottom-[15px] flex gap-2 items-center">
            <AnimatePresence mode="wait">
              {message.trim() ? (
                <motion.div
                  key="send"
                  initial={{ opacity: 0, scale: 0.8, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    type="submit"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className={cn(
                      "h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md",
                      isLoading && "opacity-70"
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="voice"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    type="button"
                    size="icon"
                    variant={isRecording ? "destructive" : "outline"}
                    onClick={toggleVoiceRecording}
                    className={cn(
                      "h-10 w-10 rounded-full border-2 shadow-sm",
                      isRecording 
                        ? "border-red-200 bg-red-50 text-red-500 dark:border-red-900 dark:bg-red-950 dark:text-red-400 animate-pulse" 
                        : "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-400"
                    )}
                  >
                    {isRecording ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="h-6 border-r border-gray-200 dark:border-gray-800 mx-1"></div>
            
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full border-2 border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shadow-sm"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          <Sparkles className="h-3 w-3" />
          <span>{t("modelDisclaimer")}</span>
        </div>
      </div>
    </div>
  );
}
