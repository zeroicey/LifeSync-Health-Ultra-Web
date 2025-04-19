"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { HealthData } from "@/types/health";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface HealthChartProps {
  title: string;
  data: HealthData[];
  valueLabel: string;
  color?: string;
  className?: string;
  showAverage?: boolean;
  unit: string;
  dateFormat?: string;
}

export function HealthChart({
  title,
  data,
  valueLabel,
  color = "#3b82f6",
  className,
  showAverage = true,
  unit,
  dateFormat = "MM-dd",
}: HealthChartProps) {
  const t = useTranslations("Dashboard");
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">{t("loading")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 按日期排序数据
  const sortedData = [...data].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // 获取最近7天的数据
  const recentData = sortedData.slice(-7);

  // 计算平均值
  const average = recentData.reduce((sum, item) => sum + item.value, 0) / recentData.length;

  // 格式化数据以适应recharts
  const chartData = recentData.map(item => ({
    date: format(new Date(item.timestamp), dateFormat, { locale: zhCN }),
    value: item.value,
    timestamp: item.timestamp
  }));

  // 自定义tooltip内容
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-foreground">
            {valueLabel}: {payload[0].value.toFixed(1)} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
              />
              <YAxis 
                hide={false}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#color-${title})`}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              {showAverage && (
                <CartesianGrid 
                  horizontal={false} 
                  vertical={false}
                  strokeDasharray="3 3" 
                  opacity={0.5}
                  strokeWidth={1}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{valueLabel}</span>
            <span className="text-sm font-medium">
              {recentData[recentData.length - 1]?.value.toFixed(1)} {unit}
            </span>
          </div>
          {showAverage && (
            <div className="text-xs text-muted-foreground mt-1">
              {t("avg")}: {average.toFixed(1)} {unit}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
