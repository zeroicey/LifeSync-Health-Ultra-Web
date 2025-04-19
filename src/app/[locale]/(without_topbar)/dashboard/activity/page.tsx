"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Clock,
  Filter,
  Plus,
  Target,
  TrendingUp,
  PieChart as PieChartIcon,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/stats-card";
import { HealthChart } from "@/components/dashboard/health-chart";
import { ActivitySummary } from "@/components/dashboard/activity-summary";

import { mockActivities } from "@/mock/activityData";
import { mockStepsData } from "@/mock/healthData";
import { HealthDataType } from "@/types/health";
import {
  calculateAverage,
  calculateTrend,
  formatHealthValue,
  getTrendType,
} from "@/lib/health-utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ActivityPage() {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [timeFilter, setTimeFilter] = useState("week");
  const [activityType, setActivityType] = useState("all");

  useEffect(() => {
    setMounted(true);
  }, []);

  // 计算步数数据趋势
  const stepsAvg = calculateAverage(mockStepsData);
  const stepsTrend = calculateTrend(mockStepsData);
  const stepsTrendType = getTrendType(stepsTrend, HealthDataType.STEPS);

  // 根据活动类型过滤活动
  const filteredActivities =
    activityType === "all"
      ? mockActivities
      : mockActivities.filter((activity) => activity.type === activityType);

  // 活动类型统计
  const activityTypeStats = {
    data_record: mockActivities.filter((a) => a.type === "data_record").length,
    device_sync: mockActivities.filter((a) => a.type === "device_sync").length,
    achievement: mockActivities.filter((a) => a.type === "achievement").length,
    reminder: mockActivities.filter((a) => a.type === "reminder").length,
  };

  if (!mounted) {
    return <div className="p-6">{t("loading")}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("activityTracking")}
        </h1>
        <div className="flex items-center space-x-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder={t("timeRange")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{t("today")}</SelectItem>
              <SelectItem value="week">{t("thisWeek")}</SelectItem>
              <SelectItem value="month">{t("thisMonth")}</SelectItem>
              <SelectItem value="year">{t("thisYear")}</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="default">
            <Plus className="mr-2 h-4 w-4" />
            {t("recordActivity")}
          </Button>
        </div>
      </div>

      {/* 活动统计 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("totalActivities")}
          value={mockActivities.length.toString()}
          description={t("last24Hours")}
          icon={Target}
          trend="up"
          trendValue="12%"
        />
        <StatsCard
          title={t("steps")}
          value={formatHealthValue(stepsAvg, HealthDataType.STEPS)}
          description={t("avgSteps")}
          icon={TrendingUp}
          trend={stepsTrendType}
          trendValue={`${Math.abs(stepsTrend).toFixed(1)}%`}
        />
        <StatsCard
          title={t("achievements")}
          value={activityTypeStats.achievement.toString()}
          description={t("goalsReached")}
          icon={Target}
          trend="up"
          trendValue="5%"
        />
        <StatsCard
          title={t("activeTime")}
          value="45 分钟"
          description={t("dailyActiveTime")}
          icon={Clock}
          trend="up"
          trendValue="8%"
        />
      </div>

      {/* 活动趋势和过滤 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("activityTrends")}</CardTitle>
          </CardHeader>
          <CardContent>
            <HealthChart
              title=""
              data={mockStepsData.slice(-7)}
              valueLabel={t("steps")}
              color="#10b981"
              unit="步"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("activityTypes")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: t("dataRecords"), value: activityTypeStats.data_record, color: "#3b82f6" },
                      { name: t("deviceSyncs"), value: activityTypeStats.device_sync, color: "#10b981" },
                      { name: t("achievements"), value: activityTypeStats.achievement, color: "#f59e0b" },
                      { name: t("reminders"), value: activityTypeStats.reminder, color: "#ef4444" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {[
                      { name: t("dataRecords"), value: activityTypeStats.data_record, color: "#3b82f6" },
                      { name: t("deviceSyncs"), value: activityTypeStats.device_sync, color: "#10b981" },
                      { name: t("achievements"), value: activityTypeStats.achievement, color: "#f59e0b" },
                      { name: t("reminders"), value: activityTypeStats.reminder, color: "#ef4444" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--border)",
                      borderRadius: "0.5rem",
                      fontSize: "0.75rem",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActivityType}
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="all">{t("allActivities")}</TabsTrigger>
                <TabsTrigger value="data_record">
                  {t("dataRecords")}
                </TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="device_sync">
                  {t("deviceSyncs")}
                </TabsTrigger>
                <TabsTrigger value="achievement">
                  {t("achievements")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* 活动历史 */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t("activityHistory")}</h2>
        <ActivitySummary activities={filteredActivities} showAll={true} />
      </div>
    </div>
  );
}
