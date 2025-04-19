"use client";

import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverage, calculateTrend, formatHealthValue, getTrendType } from "@/lib/health-utils";
import { mockHeartRateData, mockSleepData, mockStepsData, mockWeightData } from "@/mock/healthData";
import { HealthDataType } from "@/types/health";
import { Activity, Calendar, Download, Heart, LineChart, Printer, Share2, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function TrendsPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 计算心率数据趋势
  const heartRateAvg = calculateAverage(mockHeartRateData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const heartRateTrend = calculateTrend(mockHeartRateData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const heartRateTrendType = getTrendType(heartRateTrend, HealthDataType.HEART_RATE);
  
  // 计算步数数据趋势
  const stepsAvg = calculateAverage(mockStepsData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const stepsTrend = calculateTrend(mockStepsData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const stepsTrendType = getTrendType(stepsTrend, HealthDataType.STEPS);
  
  // 计算睡眠数据趋势
  const sleepAvg = calculateAverage(mockSleepData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const sleepTrend = calculateTrend(mockSleepData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const sleepTrendType = getTrendType(sleepTrend, HealthDataType.SLEEP);
  
  // 计算体重数据趋势
  const weightAvg = calculateAverage(mockWeightData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const weightTrend = calculateTrend(mockWeightData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const weightTrendType = getTrendType(weightTrend, HealthDataType.WEIGHT);
  
  // 根据时间范围获取数据
  const getDataByTimeRange = (data: any[]) => {
    const now = new Date();
    let daysToShow = 7;
    
    if (timeRange === "month") {
      daysToShow = 30;
    } else if (timeRange === "year") {
      daysToShow = 365;
    }
    
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysToShow);
    
    return data.filter(item => new Date(item.timestamp) >= cutoffDate);
  };
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("trendsAnalysis")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            {t("print")}
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("export")}
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            {t("share")}
          </Button>
        </div>
      </div>
      
      {/* 时间范围选择 */}
      <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setTimeRange(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="week">{t("timeRange.week")}</TabsTrigger>
          <TabsTrigger value="month">{t("timeRange.month")}</TabsTrigger>
          <TabsTrigger value="year">{t("timeRange.year")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="week" className="mt-0 space-y-6">
          {/* 趋势摘要 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={t("heartRate")}
              value={formatHealthValue(heartRateAvg, HealthDataType.HEART_RATE)}
              description={t("avgOverTime", { time: t("timeRange.week") })}
              icon={Heart}
              trend={heartRateTrendType}
              trendValue={`${Math.abs(heartRateTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("steps")}
              value={formatHealthValue(stepsAvg, HealthDataType.STEPS)}
              description={t("avgOverTime", { time: t("timeRange.week") })}
              icon={Activity}
              trend={stepsTrendType}
              trendValue={`${Math.abs(stepsTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("sleep")}
              value={formatHealthValue(sleepAvg, HealthDataType.SLEEP)}
              description={t("avgOverTime", { time: t("timeRange.week") })}
              icon={Calendar}
              trend={sleepTrendType}
              trendValue={`${Math.abs(sleepTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("weight")}
              value={formatHealthValue(weightAvg, HealthDataType.WEIGHT)}
              description={t("avgOverTime", { time: t("timeRange.week") })}
              icon={Target}
              trend={weightTrendType}
              trendValue={`${Math.abs(weightTrend).toFixed(1)}%`}
            />
          </div>
          
          {/* 趋势图表 */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("heartRateTrend")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px]">
                  <HealthChart
                    title=""
                    data={getDataByTimeRange(mockHeartRateData)}
                    valueLabel={t("heartRate")}
                    color="#ef4444"
                    unit="bpm"
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("sleepTrend")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px]">
                  <HealthChart
                    title=""
                    data={getDataByTimeRange(mockSleepData)}
                    valueLabel={t("sleepDuration")}
                    color="#3b82f6"
                    unit="小时"
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("stepsTrend")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px]">
                  <HealthChart
                    title=""
                    data={getDataByTimeRange(mockStepsData)}
                    valueLabel={t("steps")}
                    color="#10b981"
                    unit="步"
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t("weightTrend")}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px]">
                  <HealthChart
                    title=""
                    data={getDataByTimeRange(mockWeightData)}
                    valueLabel={t("weight")}
                    color="#8b5cf6"
                    unit="kg"
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 趋势分析 */}
          <Card>
            <CardHeader>
              <CardTitle>{t("trendInsights")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t("heartRateInsight")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {heartRateTrendType === "up" 
                        ? t("heartRateIncreasingInsight") 
                        : heartRateTrendType === "down" 
                          ? t("heartRateDecreasingInsight") 
                          : t("heartRateStableInsight")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t("stepsInsight")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {stepsTrendType === "up" 
                        ? t("stepsIncreasingInsight") 
                        : stepsTrendType === "down" 
                          ? t("stepsDecreasingInsight") 
                          : t("stepsStableInsight")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t("sleepInsight")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {sleepTrendType === "up" 
                        ? t("sleepIncreasingInsight") 
                        : sleepTrendType === "down" 
                          ? t("sleepDecreasingInsight") 
                          : t("sleepStableInsight")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{t("weightInsight")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {weightTrendType === "up" 
                        ? t("weightIncreasingInsight") 
                        : weightTrendType === "down" 
                          ? t("weightDecreasingInsight") 
                          : t("weightStableInsight")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="month" className="mt-0 space-y-6">
          {/* 月度趋势摘要 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={t("heartRate")}
              value={formatHealthValue(heartRateAvg, HealthDataType.HEART_RATE)}
              description={t("avgOverTime", { time: t("timeRange.month") })}
              icon={Heart}
              trend={heartRateTrendType}
              trendValue={`${Math.abs(heartRateTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("steps")}
              value={formatHealthValue(stepsAvg, HealthDataType.STEPS)}
              description={t("avgOverTime", { time: t("timeRange.month") })}
              icon={Activity}
              trend={stepsTrendType}
              trendValue={`${Math.abs(stepsTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("sleep")}
              value={formatHealthValue(sleepAvg, HealthDataType.SLEEP)}
              description={t("avgOverTime", { time: t("timeRange.month") })}
              icon={Calendar}
              trend={sleepTrendType}
              trendValue={`${Math.abs(sleepTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("weight")}
              value={formatHealthValue(weightAvg, HealthDataType.WEIGHT)}
              description={t("avgOverTime", { time: t("timeRange.month") })}
              icon={Target}
              trend={weightTrendType}
              trendValue={`${Math.abs(weightTrend).toFixed(1)}%`}
            />
          </div>
          
          {/* 月度趋势图表 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("monthlyTrends")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={getDataByTimeRange(mockHeartRateData)}
                  valueLabel={t("heartRate")}
                  color="#ef4444"
                  unit="bpm"
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="year" className="mt-0 space-y-6">
          {/* 年度趋势摘要 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={t("heartRate")}
              value={formatHealthValue(heartRateAvg, HealthDataType.HEART_RATE)}
              description={t("avgOverTime", { time: t("timeRange.year") })}
              icon={Heart}
              trend={heartRateTrendType}
              trendValue={`${Math.abs(heartRateTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("steps")}
              value={formatHealthValue(stepsAvg, HealthDataType.STEPS)}
              description={t("avgOverTime", { time: t("timeRange.year") })}
              icon={Activity}
              trend={stepsTrendType}
              trendValue={`${Math.abs(stepsTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("sleep")}
              value={formatHealthValue(sleepAvg, HealthDataType.SLEEP)}
              description={t("avgOverTime", { time: t("timeRange.year") })}
              icon={Calendar}
              trend={sleepTrendType}
              trendValue={`${Math.abs(sleepTrend).toFixed(1)}%`}
            />
            <StatsCard
              title={t("weight")}
              value={formatHealthValue(weightAvg, HealthDataType.WEIGHT)}
              description={t("avgOverTime", { time: t("timeRange.year") })}
              icon={Target}
              trend={weightTrendType}
              trendValue={`${Math.abs(weightTrend).toFixed(1)}%`}
            />
          </div>
          
          {/* 年度趋势图表 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t("yearlyTrends")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={getDataByTimeRange(mockHeartRateData)}
                  valueLabel={t("heartRate")}
                  color="#ef4444"
                  unit="bpm"
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
