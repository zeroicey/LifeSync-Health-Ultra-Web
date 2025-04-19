import { HealthData, HealthDataType } from "@/types/health";

/**
 * 获取最新的健康数据
 * @param data 健康数据数组
 * @returns 最新的健康数据
 */
export function getLatestHealthData(data: HealthData[]): HealthData | null {
  if (!data || data.length === 0) return null;
  
  return data.reduce((latest, current) => {
    const latestDate = new Date(latest.timestamp);
    const currentDate = new Date(current.timestamp);
    return currentDate > latestDate ? current : latest;
  }, data[0]);
}

/**
 * 计算健康数据的平均值
 * @param data 健康数据数组
 * @param days 天数，默认为7
 * @returns 平均值
 */
export function calculateAverage(data: HealthData[], days: number = 7): number {
  if (!data || data.length === 0) return 0;
  
  // 按日期排序
  const sortedData = [...data].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // 获取最近n天的数据
  const recentData = sortedData.slice(-days);
  
  // 计算平均值
  return recentData.reduce((sum, item) => sum + item.value, 0) / recentData.length;
}

/**
 * 计算健康数据的趋势
 * @param data 健康数据数组
 * @param days 天数，默认为7
 * @returns 趋势百分比，正数表示上升，负数表示下降
 */
export function calculateTrend(data: HealthData[], days: number = 7): number {
  if (!data || data.length < 2) return 0;
  
  // 按日期排序
  const sortedData = [...data].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // 获取最近n天的数据
  const recentData = sortedData.slice(-days);
  
  if (recentData.length < 2) return 0;
  
  // 计算第一个值和最后一个值
  const firstValue = recentData[0].value;
  const lastValue = recentData[recentData.length - 1].value;
  
  // 计算变化百分比
  return ((lastValue - firstValue) / firstValue) * 100;
}

/**
 * 获取健康数据的趋势类型
 * @param trendPercentage 趋势百分比
 * @param dataType 数据类型
 * @returns 趋势类型：'up'、'down' 或 'neutral'
 */
export function getTrendType(trendPercentage: number, dataType: HealthDataType): 'up' | 'down' | 'neutral' {
  // 某些数据类型，上升是好的（如步数），某些数据类型，下降是好的（如血压）
  const positiveWhenIncreasing = [
    HealthDataType.STEPS,
    HealthDataType.WATER,
  ];
  
  const negativeWhenIncreasing = [
    HealthDataType.HEART_RATE,
    HealthDataType.BLOOD_PRESSURE,
    HealthDataType.WEIGHT,
  ];
  
  // 判断趋势方向
  if (Math.abs(trendPercentage) < 1) {
    return 'neutral';
  }
  
  if (positiveWhenIncreasing.includes(dataType)) {
    return trendPercentage > 0 ? 'up' : 'down';
  }
  
  if (negativeWhenIncreasing.includes(dataType)) {
    return trendPercentage < 0 ? 'up' : 'down';
  }
  
  // 默认情况
  return trendPercentage > 0 ? 'up' : 'down';
}

/**
 * 格式化健康数据值
 * @param value 数据值
 * @param dataType 数据类型
 * @returns 格式化后的字符串
 */
export function formatHealthValue(value: number, dataType: HealthDataType): string {
  switch (dataType) {
    case HealthDataType.HEART_RATE:
      return `${Math.round(value)} bpm`;
    case HealthDataType.BLOOD_PRESSURE:
      return `${Math.round(value)} mmHg`;
    case HealthDataType.SLEEP:
      return `${value.toFixed(1)} 小时`;
    case HealthDataType.WEIGHT:
      return `${value.toFixed(1)} kg`;
    case HealthDataType.STEPS:
      return `${value.toLocaleString()} 步`;
    case HealthDataType.CALORIES:
      return `${Math.round(value)} kcal`;
    case HealthDataType.WATER:
      return `${Math.round(value)} ml`;
    case HealthDataType.MOOD:
      return `${value} 分`;
    default:
      return `${value}`;
  }
}
