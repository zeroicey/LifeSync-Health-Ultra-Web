"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Course } from "@/types/store";
import { useStoreStore } from "@/stores/store.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Clock, Award, Calendar, User, CheckCircle, Sparkles, Star, Tag } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";

interface CourseDetailDialogProps {
  course: Course;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (course: Course) => void;
}

export function CourseDetailDialog({ 
  course, 
  open, 
  onOpenChange, 
  onPurchase 
}: CourseDetailDialogProps) {
  const t = useTranslations("Store");
  const { userPoints, purchasedCourses } = useStoreStore();
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  const isAlreadyPurchased = purchasedCourses.includes(course.id);
  const hasEnoughPoints = userPoints.total >= course.points;
  
  const handlePurchase = async () => {
    if (isAlreadyPurchased) {
      // 如果已购买，直接打开课程
      // 这里可以添加导航到课程内容的逻辑
      toast.success(t("notifications.alreadyPurchased")); 
      return;
    }
    
    if (!hasEnoughPoints) {
      toast.error(t("notifications.insufficientPoints")); 
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      onPurchase(course);
      onOpenChange(false);
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error(t("notifications.purchaseError")); 
    } finally {
      setIsPurchasing(false);
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900/95 border-[1.5px] border-indigo-100 dark:border-indigo-900/60 rounded-xl shadow-xl">
        <div className="relative">
          {/* 背景装饰元素 */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-indigo-300/10 rounded-full blur-3xl dark:from-purple-900/20 dark:to-indigo-900/10 -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-indigo-300/20 to-blue-300/10 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-blue-900/10 -z-10"></div>
        
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
              {course.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="relative h-72 w-full mt-4 rounded-xl overflow-hidden shadow-md">
            <div className="absolute top-0 left-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-br-xl font-medium shadow-md">
              <div className="flex items-center space-x-1">
                <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-300" />
                {t("featured")}
              </div>
            </div>
            {course.popular && (
              <div className="absolute top-0 right-0 z-10 bg-amber-500 text-white px-4 py-1.5 rounded-bl-xl font-medium shadow-md">
                <div className="flex items-center space-x-1">
                  <Star className="h-3.5 w-3.5 mr-1 text-yellow-300 fill-yellow-300" />
                  {t("popular")}
                </div>
              </div>
            )}
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/60 to-transparent p-4">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm shadow-sm">
                {t(`levels.${course.level}`)}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-indigo-800 dark:text-indigo-300">{t("courseDescription")}</h3>
                <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/40 shadow-sm">
                <div className="flex items-center mb-2">
                  <Award className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                    {course.points} {t("points")}
                  </span>
                </div>
                
                {hasEnoughPoints ? (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 p-2 rounded-md border border-green-100 dark:border-green-900/50">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                    {t("youHaveEnoughPoints", { current: userPoints.total, required: course.points })}
                  </div>
                ) : (
                  <div className="flex items-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded-md border border-red-100 dark:border-red-900/50">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></span>
                    {t("youNeedMorePoints", { current: userPoints.total, required: course.points, needed: course.points - userPoints.total })}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 shadow-sm">
                <h3 className="font-semibold text-lg mb-3 text-blue-800 dark:text-blue-300">{t("whatYouWillLearn")}</h3>
                <ul className="space-y-3">
                  {course.learningPoints.map((point: string, index: number) => (
                    <motion.li 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800/40 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t("minutes")}</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{course.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t("releaseDate")}</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {new Date(course.releaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t("instructor")}</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">{course.instructor}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t("category")}</div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {t(`categories.${course.category}`)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            <Badge 
              className={`capitalize rounded-full px-3 shadow-sm border ${getCategoryColor(course.category)}`}
            >
              {t(`categories.${course.category}`)}
            </Badge>
            {course.tags.map((tag: string) => (
              <Badge 
                key={tag} 
                variant="outline"
                className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60 text-xs rounded-full px-3 shadow-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          <Separator className="my-6 bg-indigo-100 dark:bg-indigo-900/40" />
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-[1.5px] border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 dark:border-indigo-800/60 dark:text-indigo-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 rounded-full shadow-sm"
            >
              {t("close")}
            </Button>
            <Button 
              onClick={handlePurchase}
              disabled={(!hasEnoughPoints && !isAlreadyPurchased) || isPurchasing}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-500 dark:hover:to-indigo-500 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              {isAlreadyPurchased 
                ? t("viewCourse") 
                : isPurchasing 
                  ? t("purchasing") 
                  : t("purchase")}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
