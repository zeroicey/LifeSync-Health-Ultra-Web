import { HealthDataType } from "@/types/health";

// 生成过去24小时的时间戳
const generateTimeStamps = (hours: number) => {
  const timestamps: string[] = [];
  const now = new Date();
  
  for (let i = hours - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    timestamps.push(date.toISOString());
  }
  
  return timestamps;
};

const timestamps = generateTimeStamps(24);

// 活动类型
export type ActivityType = "data_record" | "device_sync" | "achievement" | "reminder";

// 活动项
export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  dataType?: HealthDataType;
  value?: number | string;
  deviceId?: string;
}

// 生成模拟活动数据
export const mockActivities: ActivityItem[] = [
  {
    id: "activity-1",
    type: "data_record",
    title: "心率记录",
    description: "记录了静息心率 68 bpm",
    timestamp: timestamps[2],
    dataType: HealthDataType.HEART_RATE,
    value: 68,
  },
  {
    id: "activity-2",
    type: "device_sync",
    title: "设备同步",
    description: "华为手表 GT3 Pro 已同步最新数据",
    timestamp: timestamps[3],
    deviceId: "device-1",
  },
  {
    id: "activity-3",
    type: "data_record",
    title: "睡眠记录",
    description: "昨晚睡眠时长 7.5 小时，睡眠质量良好",
    timestamp: timestamps[5],
    dataType: HealthDataType.SLEEP,
    value: 7.5,
  },
  {
    id: "activity-4",
    type: "achievement",
    title: "达成目标",
    description: "今日步数已达到 10,000 步目标",
    timestamp: timestamps[7],
    dataType: HealthDataType.STEPS,
    value: 10000,
  },
  {
    id: "activity-5",
    type: "data_record",
    title: "体重记录",
    description: "当前体重 70.5 kg，比上次减少 0.3 kg",
    timestamp: timestamps[9],
    dataType: HealthDataType.WEIGHT,
    value: 70.5,
  },
  {
    id: "activity-6",
    type: "reminder",
    title: "喝水提醒",
    description: "请记得保持水分摄入，今日已喝水 1200ml",
    timestamp: timestamps[11],
    dataType: HealthDataType.WATER,
    value: 1200,
  },
  {
    id: "activity-7",
    type: "data_record",
    title: "血压记录",
    description: "血压 118/78 mmHg，状态正常",
    timestamp: timestamps[13],
    dataType: HealthDataType.BLOOD_PRESSURE,
    value: "118/78",
  },
  {
    id: "activity-8",
    type: "device_sync",
    title: "设备同步",
    description: "小米智能体脂秤已同步最新数据",
    timestamp: timestamps[15],
    deviceId: "device-2",
  },
  {
    id: "activity-9",
    type: "data_record",
    title: "情绪记录",
    description: "今日情绪评分 8 分，心情愉快",
    timestamp: timestamps[17],
    dataType: HealthDataType.MOOD,
    value: 8,
  },
  {
    id: "activity-10",
    type: "achievement",
    title: "连续记录",
    description: "已连续记录健康数据 7 天",
    timestamp: timestamps[19],
  },
];
