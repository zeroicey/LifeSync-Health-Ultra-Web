"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Course } from "@/types/store";
import { useStoreStore } from "@/stores/store.store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { CourseDetailDialog } from "./CourseDetailDialog";
import { motion } from "framer-motion";
import { Coins, Clock, User, Tag, ChevronRight, Award, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturedCoursesProps {
  courses: Course[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  const t = useTranslations("Store");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { userPoints, purchaseCourse } = useStoreStore();

  const handlePurchase = async (course: Course) => {
    if (userPoints.total < course.points) {
      toast.error(t("notifications.insufficientPoints"));
      return;
    }

    try {
      const success = await purchaseCourse(course.id);
      if (success) {
        toast.success(t("notifications.purchaseSuccess"));
      } else {
        toast.error(t("notifications.purchaseError"));
      }
    } catch (error) {
      toast.error(t("notifications.purchaseError"));
      console.error("购买课程时出错:", error);
    }
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  // 获取类别对应的颜色
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "yoga":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/60";
      case "fitness":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/60";
      case "nutrition":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800/60";
      case "meditation":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60";
      case "mental_health":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 border-pink-200 dark:border-pink-800/60";
      case "sleep":
        return "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border-sky-200 dark:border-sky-800/60";
      case "traditional_medicine":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300 border-gray-200 dark:border-gray-700/60";
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* 背景装饰元素 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-300/10 rounded-full blur-3xl dark:from-purple-900/20 dark:to-indigo-900/10 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-300/20 to-blue-300/10 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-blue-900/10 -z-10"></div>
      
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-400/20 rounded-full blur-xl dark:bg-purple-600/20 -z-10"></div>
          <Badge className="mb-2 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-indigo-700 border-0 dark:from-purple-500/40 dark:to-indigo-500/40 dark:text-indigo-300 shadow-sm">
            {t("featured")}
          </Badge>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
            {t("featuredCourses")}
          </h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-900/30 group rounded-full px-4"
        >
          {t("viewAll")} 
          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.slice(0, 2).map((course: Course, index: number) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ y: -5 }}
            className="relative"
          >
            {/* 卡片装饰元素 */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${course.category === "yoga" ? "purple" : course.category === "fitness" ? "blue" : course.category === "nutrition" ? "green" : "indigo"}-400/5 to-transparent rounded-xl blur-sm -z-10 dark:from-${course.category === "yoga" ? "purple" : course.category === "fitness" ? "blue" : course.category === "nutrition" ? "green" : "indigo"}-900/10 dark:to-transparent`}></div>
            
            <Card className="overflow-hidden border-[1.5px] border-indigo-100 hover:border-indigo-300 dark:border-indigo-900/60 dark:hover:border-indigo-700/60 bg-white dark:bg-gray-900/95 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative h-56 md:h-auto md:w-2/5">
                  <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-br-xl font-medium shadow-md">
                    <div className="flex items-center space-x-1">
                      <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-300" />
                      {t("featured")}
                    </div>
                  </div>
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/60 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-white">
                        <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm shadow-sm">
                          {t(`levels.${course.level}`)}
                        </Badge>
                      </div>
                      {course.popular && (
                        <Badge className="bg-amber-500/90 text-white border-0 shadow-sm flex items-center space-x-1">
                          <Star className="h-3 w-3 mr-0.5 text-yellow-200 fill-yellow-200" />
                          <span>{t("popular")}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 md:w-3/5 flex flex-col bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/10 rounded-b-xl md:rounded-r-xl md:rounded-bl-none">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold line-clamp-2 text-gray-900 dark:text-gray-100">{course.title}</h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 mb-3">
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{course.instructor}</span>
                    <span className="mx-2 text-indigo-300 dark:text-indigo-700">•</span>
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {course.tags.slice(0, 3).map((tag: string, index: number) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 text-xs rounded-full px-3 shadow-sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700/60 rounded-full px-3 shadow-sm"
                      >
                        +{course.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/40 dark:to-amber-800/20 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-full shadow-sm border border-amber-200/50 dark:border-amber-800/30">
                      <Award className="h-4 w-4 mr-1.5 text-amber-600 dark:text-amber-400" />
                      <span className="font-bold">{course.points}</span>
                      <span className="ml-1 text-sm">{t("points")}</span>
                    </div>
                    <Badge 
                      className={`capitalize rounded-full px-3 shadow-sm border ${getCategoryColor(course.category)}`}
                    >
                      {t(`categories.${course.category}`)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-[1.5px] border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:border-indigo-800/60 dark:text-indigo-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 rounded-full shadow-sm" 
                      onClick={() => handleViewDetails(course)}
                    >
                      {t("viewDetails")}
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-500 dark:hover:to-indigo-500 rounded-full shadow-md hover:shadow-lg transition-shadow" 
                      onClick={() => handlePurchase(course)}
                      disabled={userPoints.total < course.points}
                    >
                      {t("purchase")}
                    </Button>
                  </div>
                  
                  {userPoints.total < course.points && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-500 mt-3 flex items-center bg-red-50 dark:bg-red-950/30 p-2 rounded-md border border-red-100 dark:border-red-900/50"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></span>
                      {t("youNeedMorePoints", {
                        current: userPoints.total,
                        required: course.points,
                        needed: course.points - userPoints.total
                      })}
                    </motion.p>
                  )}
                  
                  {userPoints.total >= course.points && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-600 dark:text-green-400 mt-3 flex items-center bg-green-50 dark:bg-green-950/30 p-2 rounded-md border border-green-100 dark:border-green-900/50"
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                      {t("youHaveEnoughPoints", {
                        current: userPoints.total,
                        required: course.points
                      })}
                    </motion.p>
                  )}
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedCourse && (
        <CourseDetailDialog
          course={selectedCourse}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onPurchase={handlePurchase}
        />
      )}
    </div>
  );
}
