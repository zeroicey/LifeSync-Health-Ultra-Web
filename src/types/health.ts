// 健康数据类型定义
export interface HealthData {
  id: string;
  userId: string;
  timestamp: string;
  type: HealthDataType;
  value: number;
  unit: string;
  notes?: string;
}

export enum HealthDataType {
  HEART_RATE = 'heart_rate',
  BLOOD_PRESSURE = 'blood_pressure',
  SLEEP = 'sleep',
  WEIGHT = 'weight',
  STEPS = 'steps',
  CALORIES = 'calories',
  WATER = 'water',
  MOOD = 'mood',
}

// 心率数据
export interface HeartRateData extends HealthData {
  type: HealthDataType.HEART_RATE;
  value: number; // 心率值（次/分钟）
  unit: 'bpm';
}

// 血压数据
export interface BloodPressureData extends HealthData {
  type: HealthDataType.BLOOD_PRESSURE;
  value: number; // 收缩压
  diastolicPressure: number; // 舒张压
  unit: 'mmHg';
}

// 睡眠数据
export interface SleepData extends HealthData {
  type: HealthDataType.SLEEP;
  value: number; // 睡眠时长（小时）
  unit: 'hours';
  sleepQuality: SleepQuality;
  deepSleepDuration: number; // 深度睡眠时长（小时）
  lightSleepDuration: number; // 浅度睡眠时长（小时）
  remSleepDuration: number; // REM睡眠时长（小时）
  awakeDuration: number; // 清醒时长（小时）
}

export enum SleepQuality {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

// 体重数据
export interface WeightData extends HealthData {
  type: HealthDataType.WEIGHT;
  value: number; // 体重值
  unit: 'kg' | 'lb';
  bmi?: number; // 体质指数
  bodyFatPercentage?: number; // 体脂率
  muscleMass?: number; // 肌肉量
  waterPercentage?: number; // 水分率
}

// 步数数据
export interface StepsData extends HealthData {
  type: HealthDataType.STEPS;
  value: number; // 步数
  unit: 'steps';
  distance?: number; // 距离（公里）
  caloriesBurned?: number; // 消耗的卡路里
}

// 卡路里数据
export interface CaloriesData extends HealthData {
  type: HealthDataType.CALORIES;
  value: number; // 卡路里
  unit: 'kcal';
  activityType?: string; // 活动类型
  duration?: number; // 活动时长（分钟）
}

// 水分摄入数据
export interface WaterData extends HealthData {
  type: HealthDataType.WATER;
  value: number; // 水分摄入量
  unit: 'ml' | 'oz';
}

// 情绪数据
export interface MoodData extends HealthData {
  type: HealthDataType.MOOD;
  value: number; // 情绪评分（1-10）
  unit: 'score';
  moodType: MoodType;
  notes?: string; // 情绪笔记
}

export enum MoodType {
  HAPPY = 'happy',
  EXCITED = 'excited',
  CONTENT = 'content',
  NEUTRAL = 'neutral',
  TIRED = 'tired',
  STRESSED = 'stressed',
  SAD = 'sad',
  ANXIOUS = 'anxious',
  ANGRY = 'angry',
}

// 设备类型
export interface Device {
  id: string;
  userId: string;
  name: string;
  type: DeviceType;
  brand: string;
  model: string;
  connectionStatus: ConnectionStatus;
  lastSyncTime: string;
  batteryLevel?: number;
  dataTypes: HealthDataType[];
}

export enum DeviceType {
  SMART_WATCH = 'smart_watch',
  FITNESS_TRACKER = 'fitness_tracker',
  SMART_SCALE = 'smart_scale',
  BLOOD_PRESSURE_MONITOR = 'blood_pressure_monitor',
  HEART_RATE_MONITOR = 'heart_rate_monitor',
  SLEEP_TRACKER = 'sleep_tracker',
  OTHER = 'other',
}

export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  PAIRING = 'pairing',
  ERROR = 'error',
}

// 健康报告
export interface HealthReport {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  period: ReportPeriod;
  dataTypes: HealthDataType[];
  insights: HealthInsight[];
  recommendations: string[];
}

export enum ReportPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
  CUSTOM = 'custom',
}

export interface HealthInsight {
  dataType: HealthDataType;
  title: string;
  description: string;
  trend: TrendType;
  comparisonValue?: number;
  comparisonPeriod?: ReportPeriod;
}

export enum TrendType {
  IMPROVING = 'improving',
  STABLE = 'stable',
  DECLINING = 'declining',
  FLUCTUATING = 'fluctuating',
  INSUFFICIENT_DATA = 'insufficient_data',
}
