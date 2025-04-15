"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useStoreStore } from "@/stores/store.store";
import { PointsCard } from "./PointsCard";
import { FeaturedCourses } from "./FeaturedCourses";
import { CourseGrid } from "./CourseGrid";
import { MotivationalBanner } from "./MotivationalBanner";
import { CategoryFilter } from "./CategoryFilter";
import { CourseCategory } from "@/types/store";
import { Loader2 } from "lucide-react";

interface StorePageProps {
  locale: string;
}

export function StorePage({ locale }: StorePageProps) {
  const t = useTranslations("Store");
  const {
    fetchCourses,
    fetchUserPoints,
    fetchPurchasedCourses,
    courses,
    userPoints,
    isLoading,
  } = useStoreStore();

  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | "all"
  >("all");
  const [isPageLoading, setIsPageLoading] = useState(true);

  // 初始化数据
  useEffect(() => {
    const initData = async () => {
      setIsPageLoading(true);
      await Promise.all([
        fetchCourses(),
        fetchUserPoints(),
        fetchPurchasedCourses(),
      ]);
      setIsPageLoading(false);
    };

    initData();
  }, [fetchCourses, fetchUserPoints, fetchPurchasedCourses]);

  // 筛选课程
  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  // 获取精选课程
  const featuredCourses = courses.filter((course) => course.featured);

  if (isPageLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 左侧边栏 */}
        <div className="w-full md:w-1/4 space-y-6">
          <PointsCard points={userPoints.total} isLoading={isLoading} />

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* 主内容区 */}
        <div className="w-full md:w-3/4 space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {t("storeTitle")}
          </h1>

          <MotivationalBanner />

          {/* 精选课程 */}
          {featuredCourses.length > 0 && (
            <section>
              <FeaturedCourses courses={featuredCourses} />
            </section>
          )}

          {/* 所有课程 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {selectedCategory === "all"
                ? t("allCourses")
                : t(`categories.${selectedCategory}`)}
            </h2>
            <CourseGrid
              courses={filteredCourses}
              isLoading={isLoading}
              locale={locale}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
