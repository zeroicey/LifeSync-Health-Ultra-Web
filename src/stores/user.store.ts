// stores/userStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "../types/user";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // 存储名称，必须唯一
      storage: createJSONStorage(() => localStorage), // 使用 localStorage 进行存储
    }
  )
);

export default useUserStore;
