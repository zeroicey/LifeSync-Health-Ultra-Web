"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  PenLine, 
  MessageSquare, 
  Calendar, 
  Activity, 
  Trophy, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export function EarnPointsGuide() {
  const t = useTranslations("Store");
  
  // 积分获取方式数据
  const earnMethods = [
    {
      id: "post_creation",
      icon: <PenLine className="h-5 w-5" />,
      title: t("earnMethods.postCreation.title"),
      description: t("earnMethods.postCreation.description"),
      points: 100,
      color: "from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700"
    },
    {
      id: "comment",
      icon: <MessageSquare className="h-5 w-5" />,
      title: t("earnMethods.comment.title"),
      description: t("earnMethods.comment.description"),
      points: 50,
      color: "from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700"
    },
    {
      id: "daily_check_in",
      icon: <Calendar className="h-5 w-5" />,
      title: t("earnMethods.dailyCheckIn.title"),
      description: t("earnMethods.dailyCheckIn.description"),
      points: 200,
      color: "from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700"
    },
    {
      id: "health_data_sync",
      icon: <Activity className="h-5 w-5" />,
      title: t("earnMethods.healthDataSync.title"),
      description: t("earnMethods.healthDataSync.description"),
      points: 300,
      color: "from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700"
    },
    {
      id: "challenge_completion",
      icon: <Trophy className="h-5 w-5" />,
      title: t("earnMethods.challengeCompletion.title"),
      description: t("earnMethods.challengeCompletion.description"),
      points: 600,
      color: "from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700"
    }
  ];
  
  return (
    <div className="space-y-6 relative">
      {/* 背景装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/10 rounded-full blur-3xl dark:from-purple-900/20 dark:to-indigo-900/10 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-300/20 to-blue-300/10 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-blue-900/10 -z-10"></div>
      
      <Card className="border-[1.5px] border-indigo-100 dark:border-indigo-900/60 shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500 dark:text-indigo-400" />
              {t("earnPointsGuide")}
            </CardTitle>
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 text-sm font-medium rounded-full">
              {t("earnPoints")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("earnPointsDescription")}
          </p>
          
          <div className="space-y-4">
            {earnMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${method.color} text-white flex items-center justify-center shadow-md`}>
                    {method.icon}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{method.title}</h3>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        +{method.points} {t("points")}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {method.description}
                    </p>
                    
                    <div className="mt-2">
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-sm text-indigo-600 dark:text-indigo-400 font-medium flex items-center"
                      >
                        {t("learnMore")}
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
