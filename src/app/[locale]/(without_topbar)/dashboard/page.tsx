"use client";

import { ActivitySummary } from "@/components/dashboard/activity-summary";
import { DeviceCard } from "@/components/dashboard/device-card";
import { HealthChart } from "@/components/dashboard/health-chart";
import { ReportCard } from "@/components/dashboard/report-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { calculateAverage, calculateTrend, formatHealthValue, getTrendType } from "@/lib/health-utils";
import { mockActivities } from "@/mock/activityData";
import { mockBloodPressureData, mockDevices, mockHeartRateData, mockHealthReports, mockSleepData, mockStepsData, mockWeightData } from "@/mock/healthData";
import { HealthDataType } from "@/types/health";
import { Activity, Calendar, Heart, Plus, Target, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 计算心率数据趋势
  const heartRateAvg = calculateAverage(mockHeartRateData);
  const heartRateTrend = calculateTrend(mockHeartRateData);
  const heartRateTrendType = getTrendType(heartRateTrend, HealthDataType.HEART_RATE);
  
  // 计算步数数据趋势
  const stepsAvg = calculateAverage(mockStepsData);
  const stepsTrend = calculateTrend(mockStepsData);
  const stepsTrendType = getTrendType(stepsTrend, HealthDataType.STEPS);
  
  // 计算睡眠数据趋势
  const sleepAvg = calculateAverage(mockSleepData);
  const sleepTrend = calculateTrend(mockSleepData);
  const sleepTrendType = getTrendType(sleepTrend, HealthDataType.SLEEP);
  
  // 计算体重数据趋势
  const weightAvg = calculateAverage(mockWeightData);
  const weightTrend = calculateTrend(mockWeightData);
  const weightTrendType = getTrendType(weightTrend, HealthDataType.WEIGHT);
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboardTitle")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t("today")}
          </Button>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            {t("addData")}
          </Button>
        </div>
      </div>
      
      {/* 健康数据摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("heartRate")}
          value={formatHealthValue(heartRateAvg, HealthDataType.HEART_RATE)}
          description={t("avgHeartRate")}
          icon={Heart}
          trend={heartRateTrendType}
          trendValue={`${Math.abs(heartRateTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("steps")}
          value={formatHealthValue(stepsAvg, HealthDataType.STEPS)}
          description={t("avgSteps")}
          icon={Activity}
          trend={stepsTrendType}
          trendValue={`${Math.abs(stepsTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("sleep")}
          value={formatHealthValue(sleepAvg, HealthDataType.SLEEP)}
          description={t("avgSleep")}
          icon={Calendar}
          trend={sleepTrendType}
          trendValue={`${Math.abs(sleepTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("weight")}
          value={formatHealthValue(weightAvg, HealthDataType.WEIGHT)}
          description={t("avgWeight")}
          icon={Target}
          trend={weightTrendType}
          trendValue={`${Math.abs(weightTrend).toFixed(1)}%`}
        />
      </div>
      
      {/* 健康数据图表和活动摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <HealthChart
          title={t("heartRateTrend")}
          data={mockHeartRateData.slice(-7)}
          valueLabel={t("heartRate")}
          color="#ef4444"
          unit="bpm"
          className="lg:col-span-1"
        />
        <HealthChart
          title={t("sleepTrend")}
          data={mockSleepData.slice(-7)}
          valueLabel={t("sleepDuration")}
          color="#3b82f6"
          unit="小时"
          className="lg:col-span-1"
        />
        <ActivitySummary
          activities={mockActivities.slice(0, 5)}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
      
      {/* 设备和报告 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 md:col-span-1">
          <h2 className="text-lg font-semibold">{t("connectedDevices")}</h2>
          {mockDevices.slice(0, 2).map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <Zap className="mr-2 h-4 w-4" />
            {t("viewAllDevices")}
          </Button>
        </div>
        
        <div className="md:col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">{t("healthReports")}</h2>
          <ReportCard report={mockHealthReports[0]} />
        </div>
      </div>
    </div>
  );
}
