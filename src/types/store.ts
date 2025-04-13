// 课程类型
export interface Course {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string; // 例如：'2h 30m'
  instructor: string;
  tags: string[];
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  releaseDate: string; // ISO 日期字符串
  learningPoints: string[]; // 学习要点列表
}

// 课程类别
export type CourseCategory = 
  | 'yoga' 
  | 'fitness' 
  | 'nutrition' 
  | 'meditation'
  | 'mental_health'
  | 'sleep'
  | 'traditional_medicine';

// 课程难度级别
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

// 积分历史记录类型
export interface PointHistory {
  id: string;
  amount: number; // 可以是正数(获得)或负数(消费)
  reason: PointReason;
  date: string; // ISO 日期字符串
}

// 积分原因类型
export type PointReason = 
  | 'post_creation'
  | 'comment'
  | 'daily_check_in'
  | 'health_data_sync'
  | 'challenge_completion'
  | 'course_purchase'
  | 'other';

// 用户积分类型
export interface UserPoints {
  total: number;
  history: PointHistory[];
}

// 课程购买结果
export interface PurchaseResult {
  success: boolean;
  message: string;
}
