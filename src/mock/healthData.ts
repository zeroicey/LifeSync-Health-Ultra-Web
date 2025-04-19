import {
  BloodPressureData,
  CaloriesData,
  ConnectionStatus,
  Device,
  DeviceType,
  HealthDataType,
  HealthInsight,
  HealthReport,
  HeartRateData,
  MoodData,
  MoodType,
  ReportPeriod,
  SleepData,
  SleepQuality,
  StepsData,
  TrendType,
  WaterData,
  WeightData,
} from "@/types/health";

// 生成过去30天的日期数组
const generateDates = (days: number) => {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString());
  }
  
  return dates;
};

const dates = generateDates(30);
const userId = "user123";

// 生成心率数据
export const mockHeartRateData: HeartRateData[] = dates.map((date, index) => {
  // 生成一个基础心率，并添加一些随机波动
  const baseHeartRate = 70;
  const randomVariation = Math.floor(Math.random() * 15) - 5; // -5 到 10 之间的随机数
  
  return {
    id: `hr-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.HEART_RATE,
    value: baseHeartRate + randomVariation,
    unit: 'bpm',
    notes: index % 7 === 0 ? '运动后测量' : undefined,
  };
});

// 生成血压数据
export const mockBloodPressureData: BloodPressureData[] = dates.map((date, index) => {
  // 生成一个基础收缩压和舒张压，并添加一些随机波动
  const baseSystolic = 120;
  const baseDiastolic = 80;
  const randomVariationSystolic = Math.floor(Math.random() * 20) - 10; // -10 到 10 之间的随机数
  const randomVariationDiastolic = Math.floor(Math.random() * 10) - 5; // -5 到 5 之间的随机数
  
  return {
    id: `bp-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.BLOOD_PRESSURE,
    value: baseSystolic + randomVariationSystolic,
    diastolicPressure: baseDiastolic + randomVariationDiastolic,
    unit: 'mmHg',
    notes: index % 10 === 0 ? '早晨空腹测量' : undefined,
  };
});

// 生成睡眠数据
export const mockSleepData: SleepData[] = dates.map((date, index) => {
  // 生成基础睡眠时长和质量
  const baseSleepHours = 7.5;
  const randomVariation = (Math.random() * 2) - 1; // -1 到 1 之间的随机数
  const totalSleep = Math.max(4, Math.min(10, baseSleepHours + randomVariation));
  
  // 确定睡眠质量
  let sleepQuality: SleepQuality;
  if (totalSleep >= 8) {
    sleepQuality = SleepQuality.EXCELLENT;
  } else if (totalSleep >= 7) {
    sleepQuality = SleepQuality.GOOD;
  } else if (totalSleep >= 6) {
    sleepQuality = SleepQuality.FAIR;
  } else {
    sleepQuality = SleepQuality.POOR;
  }
  
  // 计算各个睡眠阶段的时长
  const deepSleepPercentage = 0.2 + (Math.random() * 0.1); // 20-30%
  const remSleepPercentage = 0.2 + (Math.random() * 0.1); // 20-30%
  const lightSleepPercentage = 0.4 + (Math.random() * 0.1); // 40-50%
  const awakePercentage = 1 - deepSleepPercentage - remSleepPercentage - lightSleepPercentage;
  
  return {
    id: `sleep-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.SLEEP,
    value: totalSleep,
    unit: 'hours',
    sleepQuality,
    deepSleepDuration: +(totalSleep * deepSleepPercentage).toFixed(2),
    lightSleepDuration: +(totalSleep * lightSleepPercentage).toFixed(2),
    remSleepDuration: +(totalSleep * remSleepPercentage).toFixed(2),
    awakeDuration: +(totalSleep * awakePercentage).toFixed(2),
    notes: index % 5 === 0 ? '昨晚睡前读书30分钟' : undefined,
  };
});

// 生成体重数据
export const mockWeightData: WeightData[] = dates.filter((_, i) => i % 3 === 0).map((date, index) => {
  // 生成基础体重和相关指标
  const baseWeight = 70;
  const randomVariation = (Math.random() * 0.6) - 0.3; // -0.3 到 0.3 之间的随机数
  const weight = +(baseWeight + randomVariation).toFixed(1);
  const height = 1.75; // 身高（米）
  const bmi = +(weight / (height * height)).toFixed(1);
  
  return {
    id: `weight-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.WEIGHT,
    value: weight,
    unit: 'kg',
    bmi,
    bodyFatPercentage: +(20 + (Math.random() * 2) - 1).toFixed(1),
    muscleMass: +(52 + (Math.random() * 1) - 0.5).toFixed(1),
    waterPercentage: +(60 + (Math.random() * 4) - 2).toFixed(1),
    notes: index % 4 === 0 ? '早晨空腹测量' : undefined,
  };
});

// 生成步数数据
export const mockStepsData: StepsData[] = dates.map((date, index) => {
  // 生成基础步数和相关指标
  const baseSteps = 8000;
  const randomVariation = Math.floor(Math.random() * 4000) - 1000; // -1000 到 3000 之间的随机数
  const steps = Math.max(2000, baseSteps + randomVariation);
  const distance = +(steps * 0.0007).toFixed(2); // 大约每步0.7米
  const caloriesBurned = Math.floor(steps * 0.04); // 大约每步0.04卡路里
  
  return {
    id: `steps-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.STEPS,
    value: steps,
    unit: 'steps',
    distance,
    caloriesBurned,
    notes: steps > 10000 ? '今天多走路了' : undefined,
  };
});

// 生成卡路里数据
export const mockCaloriesData: CaloriesData[] = dates.map((date, index) => {
  // 生成基础卡路里消耗
  const baseCalories = 2000;
  const randomVariation = Math.floor(Math.random() * 500) - 200; // -200 到 300 之间的随机数
  const calories = Math.max(1500, baseCalories + randomVariation);
  
  // 随机选择一个活动类型
  const activityTypes = ['日常活动', '跑步', '骑行', '游泳', '健身', '瑜伽', '步行'];
  const activityType = index % 7 === 0 ? activityTypes[Math.floor(Math.random() * activityTypes.length)] : undefined;
  const duration = activityType ? Math.floor(Math.random() * 60) + 30 : undefined; // 30-90分钟
  
  return {
    id: `calories-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.CALORIES,
    value: calories,
    unit: 'kcal',
    activityType,
    duration,
    notes: activityType ? `${activityType} ${duration}分钟` : undefined,
  };
});

// 生成水分摄入数据
export const mockWaterData: WaterData[] = dates.map((date, index) => {
  // 生成基础水分摄入量
  const baseWater = 2000;
  const randomVariation = Math.floor(Math.random() * 800) - 400; // -400 到 400 之间的随机数
  const water = Math.max(1000, baseWater + randomVariation);
  
  return {
    id: `water-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.WATER,
    value: water,
    unit: 'ml',
    notes: water > 2500 ? '今天多喝水了' : undefined,
  };
});

// 生成情绪数据
export const mockMoodData: MoodData[] = dates.map((date, index) => {
  // 生成基础情绪评分和类型
  const moodTypes = [
    MoodType.HAPPY, 
    MoodType.EXCITED, 
    MoodType.CONTENT, 
    MoodType.NEUTRAL, 
    MoodType.TIRED, 
    MoodType.STRESSED, 
    MoodType.SAD, 
    MoodType.ANXIOUS, 
    MoodType.ANGRY
  ];
  
  // 根据情绪类型确定评分范围
  let moodType: MoodType;
  let moodScore: number;
  
  const moodIndex = Math.floor(Math.random() * moodTypes.length);
  moodType = moodTypes[moodIndex];
  
  switch (moodType) {
    case MoodType.HAPPY:
    case MoodType.EXCITED:
    case MoodType.CONTENT:
      moodScore = Math.floor(Math.random() * 3) + 8; // 8-10
      break;
    case MoodType.NEUTRAL:
      moodScore = Math.floor(Math.random() * 3) + 5; // 5-7
      break;
    default:
      moodScore = Math.floor(Math.random() * 4) + 1; // 1-4
  }
  
  const moodNotes = [
    '今天心情很好',
    '工作压力有点大',
    '和朋友聚会很开心',
    '睡眠不足，有点疲惫',
    '完成了一个重要项目',
    '有点焦虑',
    '放松的一天',
    '有点不舒服',
  ];
  
  return {
    id: `mood-${index}`,
    userId,
    timestamp: date,
    type: HealthDataType.MOOD,
    value: moodScore,
    unit: 'score',
    moodType,
    notes: index % 3 === 0 ? moodNotes[Math.floor(Math.random() * moodNotes.length)] : undefined,
  };
});

// 生成设备数据
export const mockDevices: Device[] = [
  {
    id: 'device-1',
    userId,
    name: '华为手表 GT3 Pro',
    type: DeviceType.SMART_WATCH,
    brand: '华为',
    model: 'GT3 Pro',
    connectionStatus: ConnectionStatus.CONNECTED,
    lastSyncTime: new Date().toISOString(),
    batteryLevel: 78,
    dataTypes: [
      HealthDataType.HEART_RATE,
      HealthDataType.SLEEP,
      HealthDataType.STEPS,
      HealthDataType.CALORIES,
    ],
  },
  {
    id: 'device-2',
    userId,
    name: '小米智能体脂秤',
    type: DeviceType.SMART_SCALE,
    brand: '小米',
    model: '体脂秤2 Pro',
    connectionStatus: ConnectionStatus.CONNECTED,
    lastSyncTime: new Date(Date.now() - 3600000).toISOString(), // 1小时前
    batteryLevel: 92,
    dataTypes: [
      HealthDataType.WEIGHT,
    ],
  },
  {
    id: 'device-3',
    userId,
    name: '欧姆龙血压计',
    type: DeviceType.BLOOD_PRESSURE_MONITOR,
    brand: '欧姆龙',
    model: 'HEM-7156',
    connectionStatus: ConnectionStatus.DISCONNECTED,
    lastSyncTime: new Date(Date.now() - 86400000 * 2).toISOString(), // 2天前
    batteryLevel: 45,
    dataTypes: [
      HealthDataType.BLOOD_PRESSURE,
    ],
  },
  {
    id: 'device-4',
    userId,
    name: 'Apple Watch Series 8',
    type: DeviceType.SMART_WATCH,
    brand: 'Apple',
    model: 'Watch Series 8',
    connectionStatus: ConnectionStatus.DISCONNECTED,
    lastSyncTime: new Date(Date.now() - 86400000 * 5).toISOString(), // 5天前
    batteryLevel: 0,
    dataTypes: [
      HealthDataType.HEART_RATE,
      HealthDataType.SLEEP,
      HealthDataType.STEPS,
      HealthDataType.CALORIES,
    ],
  },
];

// 生成健康报告数据
export const mockHealthReports: HealthReport[] = [
  {
    id: 'report-1',
    userId,
    title: '每周健康报告',
    createdAt: new Date().toISOString(),
    period: ReportPeriod.WEEKLY,
    dataTypes: [
      HealthDataType.HEART_RATE,
      HealthDataType.SLEEP,
      HealthDataType.STEPS,
      HealthDataType.WEIGHT,
    ],
    insights: [
      {
        dataType: HealthDataType.HEART_RATE,
        title: '心率状况良好',
        description: '您的平均静息心率为68bpm，处于健康范围内。',
        trend: TrendType.STABLE,
        comparisonValue: 70,
        comparisonPeriod: ReportPeriod.WEEKLY,
      },
      {
        dataType: HealthDataType.SLEEP,
        title: '睡眠质量有所提升',
        description: '本周平均睡眠时间为7.2小时，比上周增加了0.5小时。深度睡眠比例有所提高。',
        trend: TrendType.IMPROVING,
        comparisonValue: 6.7,
        comparisonPeriod: ReportPeriod.WEEKLY,
      },
      {
        dataType: HealthDataType.STEPS,
        title: '活动量略有下降',
        description: '本周平均步数为7,500步，比上周减少了500步。建议增加日常活动量。',
        trend: TrendType.DECLINING,
        comparisonValue: 8000,
        comparisonPeriod: ReportPeriod.WEEKLY,
      },
    ],
    recommendations: [
      '尝试每天增加1000步的步行量，可以通过午休时间散步实现。',
      '保持良好的睡眠习惯，建议每晚10:30前入睡。',
      '考虑增加每周2-3次的有氧运动，如快走、慢跑或游泳。',
    ],
  },
  {
    id: 'report-2',
    userId,
    title: '月度健康总结',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 7天前
    period: ReportPeriod.MONTHLY,
    dataTypes: [
      HealthDataType.HEART_RATE,
      HealthDataType.BLOOD_PRESSURE,
      HealthDataType.SLEEP,
      HealthDataType.WEIGHT,
      HealthDataType.STEPS,
      HealthDataType.MOOD,
    ],
    insights: [
      {
        dataType: HealthDataType.HEART_RATE,
        title: '心率波动在正常范围',
        description: '本月平均静息心率为72bpm，波动范围在65-80bpm之间，属于正常范围。',
        trend: TrendType.STABLE,
      },
      {
        dataType: HealthDataType.BLOOD_PRESSURE,
        title: '血压状况良好',
        description: '本月平均血压为118/78mmHg，处于理想范围内。',
        trend: TrendType.STABLE,
      },
      {
        dataType: HealthDataType.WEIGHT,
        title: '体重略有下降',
        description: '本月体重从71.5kg下降到70.8kg，减少了0.7kg。',
        trend: TrendType.IMPROVING,
        comparisonValue: 71.5,
        comparisonPeriod: ReportPeriod.MONTHLY,
      },
      {
        dataType: HealthDataType.MOOD,
        title: '情绪状态波动',
        description: '本月情绪评分平均为6.8分，有较大波动，建议关注情绪变化。',
        trend: TrendType.FLUCTUATING,
      },
    ],
    recommendations: [
      '继续保持健康的饮食习惯，多摄入蔬菜水果。',
      '尝试冥想或深呼吸练习，有助于稳定情绪。',
      '保持规律的作息时间，避免熬夜。',
      '每周至少进行150分钟中等强度的有氧运动。',
    ],
  },
];

// 合并所有健康数据
export const mockAllHealthData = [
  ...mockHeartRateData,
  ...mockBloodPressureData,
  ...mockSleepData,
  ...mockWeightData,
  ...mockStepsData,
  ...mockCaloriesData,
  ...mockWaterData,
  ...mockMoodData,
];
