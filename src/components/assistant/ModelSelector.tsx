"use client";

import { useTranslations } from "next-intl";
import { useAssistantStore } from "@/stores/assistant.store";
import { AIModelType } from "@/types/assistant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

export function ModelSelector() {
  const t = useTranslations("Assistant");
  const { changeModel, preferredModel, currentSession } = useAssistantStore();

  const handleModelChange = (value: string) => {
    changeModel(value as AIModelType);
  };

  // 模型信息
  const modelInfo = {
    [AIModelType.ChatGPT]: {
      name: "ChatGPT",
      description: t("models.chatgpt"),
    },
    [AIModelType.DeepSeek]: {
      name: "DeepSeek",
      description: t("models.deepseek"),
    },
    [AIModelType.Claude]: {
      name: "Claude",
      description: t("models.claude"),
    },
  };

  // 如果没有当前会话，不显示选择器
  if (!currentSession) {
    return null;
  }

  // 当前使用的模型
  const currentModel = currentSession.modelType || preferredModel;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 p-5 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-50/40 to-purple-50/40 dark:from-indigo-950/40 dark:to-purple-950/40">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-1.5 rounded-full">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
        </div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
          {t("modelLabel")}:
        </span>
      </div>

      <div className="flex-1">
        <Select value={currentModel} onValueChange={handleModelChange}>
          <SelectTrigger className="text-sm border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-700 focus:ring-indigo-500 dark:focus:ring-indigo-700">
            <SelectValue placeholder={t("selectModel")} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 border-indigo-200 dark:border-indigo-800">
            {Object.values(AIModelType).map((model) => (
              <SelectItem
                key={model}
                value={model}
                className="text-sm py-1 focus:bg-indigo-50 dark:focus:bg-indigo-950"
              >
                <div className="flex flex-col py-1">
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {modelInfo[model].name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
