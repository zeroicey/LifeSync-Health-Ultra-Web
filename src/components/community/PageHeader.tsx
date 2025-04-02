import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
