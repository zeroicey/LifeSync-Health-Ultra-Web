import { Skeleton } from "@/components/ui/skeleton";

export function PostDetailSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 返回按钮骨架 */}
      <Skeleton className="h-9 w-32 mb-4" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        {/* 帖子头部骨架 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* 帖子标题骨架 */}
        <Skeleton className="h-8 w-3/4 mb-4" />

        {/* 帖子内容骨架 */}
        <div className="mb-6 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 帖子图片骨架 */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>

        {/* 帖子标签骨架 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* 帖子交互按钮骨架 */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* 评论表单骨架 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <Skeleton className="h-32 w-full mb-3" />
        <Skeleton className="h-10 w-24 ml-auto" />
      </div>

      {/* 评论列表骨架 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-6">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <div className="flex items-start mb-3">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex gap-4 ml-13 mt-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
