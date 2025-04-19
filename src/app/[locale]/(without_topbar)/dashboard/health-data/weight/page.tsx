"use client";

import { HealthChart } from "@/components/dashboard/health-chart";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAverage, calculateTrend, formatHealthValue, getLatestHealthData, getTrendType } from "@/lib/health-utils";
import { mockWeightData } from "@/mock/healthData";
import { HealthDataType, WeightData } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, Download, LineChart, Plus, Printer, Share2, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function WeightPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 获取数据
  const latestWeight = getLatestHealthData(mockWeightData) as WeightData;
  
  // 计算体重数据趋势
  const weightAvg = calculateAverage(mockWeightData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const weightTrend = calculateTrend(mockWeightData, timeRange === "week" ? 7 : timeRange === "month" ? 30 : 365);
  const weightTrendType = getTrendType(weightTrend, HealthDataType.WEIGHT);
  
  // 计算BMI平均值
  const bmiAvg = mockWeightData.reduce((sum, item) => {
    const weightItem = item as WeightData;
    return sum + (weightItem.bmi || 0);
  }, 0) / mockWeightData.length;
  
  // 计算体脂率平均值
  const bodyFatAvg = mockWeightData.reduce((sum, item) => {
    const weightItem = item as WeightData;
    return sum + (weightItem.bodyFatPercentage || 0);
  }, 0) / mockWeightData.length;
  
  // 根据时间范围获取数据
  const getDataByTimeRange = () => {
    const now = new Date();
    let daysToShow = 7;
    
    if (timeRange === "month") {
      daysToShow = 30;
    } else if (timeRange === "year") {
      daysToShow = 365;
    }
    
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - daysToShow);
    
    return mockWeightData.filter(data => new Date(data.timestamp) >= cutoffDate);
  };
  
  const displayData = getDataByTimeRange();
  
  // 获取BMI分类
  const getBMICategory = (bmi: number | undefined): string => {
    if (!bmi) return "未知";
    
    if (bmi < 18.5) {
      return "偏瘦";
    } else if (bmi >= 18.5 && bmi < 24) {
      return "正常";
    } else if (bmi >= 24 && bmi < 28) {
      return "超重";
    } else if (bmi >= 28) {
      return "肥胖";
    } else {
      return "未知";
    }
  };
  
  // 获取BMI分类的颜色
  const getBMICategoryColor = (category: string): string => {
    switch (category) {
      case "偏瘦":
        return "text-blue-500";
      case "正常":
        return "text-green-500";
      case "超重":
        return "text-amber-500";
      case "肥胖":
        return "text-red-500";
      default:
        return "";
    }
  };
  
  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">{t("weightManagement")}</h1>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {t("selectDate")}
          </Button>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            {t("addData")}
          </Button>
        </div>
      </div>
      
      {/* 体重数据摘要 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("currentWeight")}
          value={latestWeight ? formatHealthValue(latestWeight.value, HealthDataType.WEIGHT) : "-"}
          description={latestWeight ? format(new Date(latestWeight.timestamp), 'yyyy-MM-dd HH:mm', { locale: zhCN }) : ""}
          icon={Target}
        />
        <StatsCard
          title={t("avgWeight")}
          value={formatHealthValue(weightAvg, HealthDataType.WEIGHT)}
          description={t("avgOverTime", { time: t(`timeRange.${timeRange}`) })}
          icon={LineChart}
          trend={weightTrendType}
          trendValue={`${Math.abs(weightTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("bmi")}
          value={bmiAvg.toFixed(1)}
          description={getBMICategory(bmiAvg)}
          icon={Target}
          className={getBMICategoryColor(getBMICategory(bmiAvg))}
        />
        <StatsCard
          title={t("bodyFat")}
          value={`${bodyFatAvg.toFixed(1)}%`}
          description={t("bodyFatDescription")}
          icon={LineChart}
        />
      </div>
      
      {/* 体重数据图表 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{t("weightTrend")}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                {t("print")}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                {t("export")}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {t("share")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="week" className="w-full" onValueChange={(value) => setTimeRange(value as any)}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">{t("timeRange.week")}</TabsTrigger>
              <TabsTrigger value="month">{t("timeRange.month")}</TabsTrigger>
              <TabsTrigger value="year">{t("timeRange.year")}</TabsTrigger>
            </TabsList>
            <TabsContent value="week" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("weight")}
                  color="#8b5cf6"
                  unit="kg"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="month" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("weight")}
                  color="#8b5cf6"
                  unit="kg"
                  className="h-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="year" className="mt-0">
              <div className="h-[400px]">
                <HealthChart
                  title=""
                  data={displayData}
                  valueLabel={t("weight")}
                  color="#8b5cf6"
                  unit="kg"
                  className="h-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* 体重数据记录 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("weightRecords")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 border-b px-4 py-2 font-medium">
              <div>{t("date")}</div>
              <div>{t("weight")}</div>
              <div>{t("bmi")}</div>
              <div>{t("bodyFat")}</div>
              <div>{t("category")}</div>
              <div>{t("notes")}</div>
            </div>
            <div className="divide-y">
              {displayData.slice(-10).reverse().map((data) => {
                const weightItem = data as WeightData;
                const category = getBMICategory(weightItem.bmi);
                
                return (
                  <div key={data.id} className="grid grid-cols-6 px-4 py-3">
                    <div>{format(new Date(data.timestamp), 'yyyy-MM-dd', { locale: zhCN })}</div>
                    <div>{formatHealthValue(data.value, HealthDataType.WEIGHT)}</div>
                    <div>{weightItem.bmi?.toFixed(1) || "-"}</div>
                    <div>{weightItem.bodyFatPercentage?.toFixed(1)}%</div>
                    <div className={getBMICategoryColor(category)}>
                      {category}
                    </div>
                    <div className="text-muted-foreground">{data.notes || "-"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* BMI指南 */}
      <Card>
        <CardHeader>
          <CardTitle>{t("bmiGuide")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">{t("bmiCategories")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-500 font-medium">偏瘦</span>
                  <span>&lt; 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-500 font-medium">正常</span>
                  <span>18.5 - 23.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-500 font-medium">超重</span>
                  <span>24.0 - 27.9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-500 font-medium">肥胖</span>
                  <span>≥ 28.0</span>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-2">{t("weightManagementTips")}</h3>
              <ul className="space-y-1 text-sm list-disc pl-5">
                <li>{t("weightTip1")}</li>
                <li>{t("weightTip2")}</li>
                <li>{t("weightTip3")}</li>
                <li>{t("weightTip4")}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
