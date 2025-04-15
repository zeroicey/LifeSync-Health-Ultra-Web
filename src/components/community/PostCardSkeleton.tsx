import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/90 rounded-xl shadow-md p-5 mb-4 border border-indigo-100/50 dark:border-indigo-900/30">
      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl dark:from-indigo-900/20 dark:to-purple-900/10 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl dark:from-blue-900/20 dark:to-indigo-900/10 -z-10"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full mr-3 shadow-sm" />
          <div>
            <Skeleton className="h-4 w-24 mb-2 bg-indigo-200/50 dark:bg-indigo-700/30" />
            <Skeleton className="h-3 w-16 bg-indigo-100/50 dark:bg-indigo-800/30" />
          </div>
        </div>
      </div>

      <Skeleton className="h-5 w-3/4 mb-3 bg-indigo-200/50 dark:bg-indigo-700/30" />
      <Skeleton className="h-4 w-full mb-2 bg-indigo-100/50 dark:bg-indigo-800/30" />
      <Skeleton className="h-4 w-full mb-2 bg-indigo-100/50 dark:bg-indigo-800/30" />
      <Skeleton className="h-4 w-2/3 mb-4 bg-indigo-100/50 dark:bg-indigo-800/30" />

      {/* 图片占位 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Skeleton className="h-40 w-full rounded-lg bg-gradient-to-br from-indigo-100/60 to-purple-100/60 dark:from-indigo-800/30 dark:to-purple-800/30 shadow-sm" />
        <Skeleton className="h-40 w-full rounded-lg bg-gradient-to-br from-purple-100/60 to-indigo-100/60 dark:from-purple-800/30 dark:to-indigo-800/30 shadow-sm" />
      </div>

      {/* 标签占位 */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full bg-indigo-100/70 dark:bg-indigo-800/40 shadow-sm" />
        <Skeleton className="h-6 w-20 rounded-full bg-purple-100/70 dark:bg-purple-800/40 shadow-sm" />
        <Skeleton className="h-6 w-14 rounded-full bg-blue-100/70 dark:bg-blue-800/40 shadow-sm" />
      </div>

      {/* 操作按钮占位 */}
      <div className="flex items-center justify-between pt-4 border-t border-indigo-100 dark:border-indigo-800/30">
        <Skeleton className="h-8 w-16 rounded-lg bg-indigo-100/70 dark:bg-indigo-800/40" />
        <Skeleton className="h-8 w-16 rounded-lg bg-indigo-100/70 dark:bg-indigo-800/40" />
        <Skeleton className="h-8 w-16 rounded-lg bg-indigo-100/70 dark:bg-indigo-800/40" />
      </div>
    </div>
  );
}
