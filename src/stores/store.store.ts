import { create } from 'zustand';
import { mockCourses } from '@/mock/storeData';
import { Course, UserPoints } from '@/types/store';

interface StoreState {
  // 状态
  courses: Course[];
  userPoints: UserPoints;
  purchasedCourses: string[];
  isLoading: boolean;
  
  // 操作
  fetchCourses: () => Promise<void>;
  fetchUserPoints: () => Promise<void>;
  purchaseCourse: (courseId: string) => Promise<boolean>;
  fetchPurchasedCourses: () => Promise<void>;
}

// 创建商店状态管理
export const useStoreStore = create<StoreState>((set, get) => ({
  // 初始状态
  courses: [],
  userPoints: {
    total: 0,
    history: []
  },
  purchasedCourses: [],
  isLoading: false,
  
  // 获取所有课程
  fetchCourses: async () => {
    set({ isLoading: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 使用模拟数据
      set({ 
        courses: mockCourses,
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      set({ isLoading: false });
    }
  },
  
  // 获取用户积分
  fetchUserPoints: async () => {
    set({ isLoading: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // 模拟用户积分数据
      set({ 
        userPoints: {
          total: 1250,
          history: [
            { id: '1', amount: 100, reason: 'post_creation', date: new Date().toISOString() },
            { id: '2', amount: 50, reason: 'comment', date: new Date().toISOString() },
            { id: '3', amount: 200, reason: 'daily_check_in', date: new Date().toISOString() },
            { id: '4', amount: 300, reason: 'health_data_sync', date: new Date().toISOString() },
            { id: '5', amount: 600, reason: 'challenge_completion', date: new Date().toISOString() }
          ]
        },
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch user points:', error);
      set({ isLoading: false });
    }
  },
  
  // 购买课程
  purchaseCourse: async (courseId: string) => {
    set({ isLoading: true });
    
    try {
      // 获取当前状态
      const { courses, userPoints, purchasedCourses } = get();
      
      // 查找要购买的课程
      const course = courses.find(c => c.id === courseId);
      
      // 如果课程不存在或已购买，返回失败
      if (!course || purchasedCourses.includes(courseId)) {
        set({ isLoading: false });
        return false;
      }
      
      // 检查用户积分是否足够
      if (userPoints.total < course.points) {
        set({ isLoading: false });
        return false;
      }
      
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 更新用户积分和已购买课程
      set({ 
        userPoints: {
          ...userPoints,
          total: userPoints.total - course.points,
          history: [
            ...userPoints.history,
            {
              id: Date.now().toString(),
              amount: -course.points,
              reason: 'course_purchase',
              date: new Date().toISOString()
            }
          ]
        },
        purchasedCourses: [...purchasedCourses, courseId],
        isLoading: false 
      });
      
      return true;
    } catch (error) {
      console.error('Failed to purchase course:', error);
      set({ isLoading: false });
      return false;
    }
  },
  
  // 获取已购买的课程
  fetchPurchasedCourses: async () => {
    set({ isLoading: true });
    
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // 模拟已购买课程数据
      set({ 
        purchasedCourses: ['course-3', 'course-5'],
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch purchased courses:', error);
      set({ isLoading: false });
    }
  }
}));
