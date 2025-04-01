import { Skeleton } from "@/components/ui/skeleton";

export function CommunitySidebarSkeleton() {
  return (
    <div className="space-y-6">
      {/* 用户信息卡片骨架屏 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <Skeleton className="h-12 w-12 rounded-full mr-3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <Skeleton className="h-6 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-2 text-center">
            <Skeleton className="h-6 w-8 mx-auto mb-1" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        </div>

        <Skeleton className="h-9 w-full" />
      </div>

      {/* 搜索框骨架屏 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* 分类列表骨架屏 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="space-y-2">
          {Array(5).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      </div>

      {/* 热门标签骨架屏 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array(12).fill(0).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16" />
          ))}
        </div>
      </div>
    </div>
  );
}
