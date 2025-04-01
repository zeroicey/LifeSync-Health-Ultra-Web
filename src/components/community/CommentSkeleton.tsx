import { Skeleton } from "@/components/ui/skeleton";

export function CommentSkeleton() {
  return (
    <div className="mb-4 last:mb-0 w-full">
      <div className="flex w-full">
        <Skeleton className="h-10 w-10 rounded-full mr-3 flex-shrink-0" />
        <div className="flex-1 w-full">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <div className="flex justify-between items-start mb-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          <div className="flex items-center mt-1 space-x-4 pl-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReplyCommentSkeleton() {
  return (
    <div className="flex mt-3 pl-6">
      <Skeleton className="h-8 w-8 rounded-full mr-2 flex-shrink-0" />
      <div className="flex-1">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
          <div className="flex justify-between items-start mb-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-12" />
          </div>
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-2/3" />
        </div>
        
        <div className="flex items-center mt-1 space-x-4 pl-2">
          <Skeleton className="h-6 w-12" />
        </div>
      </div>
    </div>
  );
}

export function CommentFormSkeleton() {
  return (
    <div className="mb-6 w-full">
      <div className="flex items-start space-x-3 w-full">
        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
        <div className="flex-1 w-full">
          <Skeleton className="h-[100px] w-full mb-2" />
          <div className="flex justify-end">
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
