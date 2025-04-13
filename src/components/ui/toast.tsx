"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  X 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Toast类型
type ToastType = "success" | "error" | "info";

// Toast数据结构
interface ToastData {
  id: string;
  message: string;
  type: ToastType;
}

// Toast上下文接口
interface ToastContextType {
  toasts: ToastData[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

// 创建Toast上下文
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast提供者组件
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // 添加Toast
  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  // 移除Toast
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast容器组件
function ToastContainer() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  const { toasts, removeToast } = context;

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// 单个Toast组件
function Toast({ id, message, type, onClose }: ToastData & { onClose: () => void }) {
  useEffect(() => {
    // 自动关闭Toast
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  // 根据类型获取图标和样式
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          className: "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300",
          iconClassName: "text-green-500 dark:text-green-400"
        };
      case "error":
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          className: "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
          iconClassName: "text-red-500 dark:text-red-400"
        };
      case "info":
        return {
          icon: <Info className="h-5 w-5" />,
          className: "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
          iconClassName: "text-blue-500 dark:text-blue-400"
        };
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          className: "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
          iconClassName: "text-gray-400 dark:text-gray-500"
        };
    }
  };

  const { icon, className, iconClassName } = getToastStyles();

  return (
    <div
      className={cn(
        "flex items-center p-4 rounded-lg shadow-md border transition-all transform animate-slide-up",
        className
      )}
      role="alert"
    >
      <div className={cn("mr-3", iconClassName)}>{icon}</div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button
        type="button"
        className="ml-3 inline-flex h-5 w-5 items-center justify-center rounded-full text-gray-400 hover:text-gray-500 focus:outline-none"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// 使用Toast的Hook
export function useToast() {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return {
    toast: {
      success: (message: string) => context.addToast(message, "success"),
      error: (message: string) => context.addToast(message, "error"),
      info: (message: string) => context.addToast(message, "info")
    }
  };
}

// 导出toast API
export const toast = {
  success: (message: string) => {
    // 如果在客户端环境，尝试直接调用DOM API
    if (typeof window !== "undefined") {
      const event = new CustomEvent("toast", {
        detail: { message, type: "success" }
      });
      window.dispatchEvent(event);
    }
  },
  error: (message: string) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("toast", {
        detail: { message, type: "error" }
      });
      window.dispatchEvent(event);
    }
  },
  info: (message: string) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("toast", {
        detail: { message, type: "info" }
      });
      window.dispatchEvent(event);
    }
  }
};
