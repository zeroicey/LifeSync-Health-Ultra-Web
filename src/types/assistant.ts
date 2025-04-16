// AI助手类型定义

// AI模型类型
export enum AIModelType {
  ChatGPT = "chatgpt",
  DeepSeek = "deepseek",
  Claude = "claude"
}

// AI助手角色
export enum AIAssistantRole {
  HealthCoach = "health_coach",         // 健康教练
  NutritionExpert = "nutrition_expert", // 营养专家
  SleepAdvisor = "sleep_advisor",       // 睡眠顾问
  MeditationGuide = "meditation_guide", // 冥想指导
  FitnessTrainer = "fitness_trainer",   // 健身教练
  MentalHealthCounselor = "mental_health_counselor", // 心理健康顾问
  TCMSpecialist = "tcm_specialist",     // 中医专家
  StressManager = "stress_manager",     // 压力管理专家
  YogaInstructor = "yoga_instructor",   // 瑜伽教练
  LifestyleCoach = "lifestyle_coach",   // 生活方式教练
  EmotionalSupport = "emotional_support", // 情感支持顾问
  HealthDataAnalyst = "health_data_analyst" // 健康数据分析师
}

// AI助手信息接口
export interface AIAssistant {
  id: string;
  role: AIAssistantRole;
  name: string;
  avatar: string;
  description: string;
  specialty: string[];
  introduction: string;
  capabilities: string[];
  greeting: string;
  popularTopics: string[];
}

// 对话消息接口
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isThinking?: boolean;
}

// 对话会话接口
export interface ChatSession {
  id: string;
  assistantId: string;
  modelType: AIModelType;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

// 用户助手设置
export interface AssistantUserSettings {
  preferredModel: AIModelType;
  recentAssistants: string[]; // 最近使用的助手ID
  favoriteAssistants: string[]; // 收藏的助手ID
  chatHistory: ChatSession[];
}
