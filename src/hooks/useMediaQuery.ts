"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // 服务器端或者window对象不存在时直接返回
    if (typeof window === "undefined") {
      return;
    }
    
    const media = window.matchMedia(query);
    
    // 初始化匹配状态
    setMatches(media.matches);
    
    // 监听媒体查询变化
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // 添加事件监听
    media.addEventListener("change", listener);
    
    // 清理函数
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);
  
  return matches;
}
