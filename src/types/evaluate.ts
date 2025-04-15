// 评估测试类型定义
export interface EvaluationTest {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: TestCategory;
  duration: number; // 预计完成时间（分钟）
  questionCount: number;
  popularity: number; // 人气指数
  tags: string[];
}

// 测试问题类型定义
export interface TestQuestion {
  id: string;
  text: string;
  options: TestOption[];
}

// 测试选项类型定义
export interface TestOption {
  id: string;
  text: string;
  value: number | string;
}

// 测试结果类型定义
export interface TestResult {
  id: string;
  title: string;
  description: string;
  recommendations: string[];
}

// 测试类别枚举
export enum TestCategory {
  Personality = "personality",
  Mood = "mood",
  Anxiety = "anxiety",
  Depression = "depression",
  Sleep = "sleep",
  Stress = "stress",
  Relationship = "relationship"
}

// 测试状态类型
export interface TestState {
  currentQuestionIndex: number;
  answers: Record<string, string | number>;
  isCompleted: boolean;
  result: TestResult | null;
}
