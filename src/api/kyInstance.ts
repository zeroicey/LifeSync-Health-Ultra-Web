// src/api/kyInstance.ts
import ky from "ky";

const getAuthToken = () => {
  //   // 例如：从 zustand 中读取用户 token
  //   const { user } = useUserStore.getState();
  //   // 假设 token 存储在 user.publicMetadata.token 中
  //   return (user?.publicMetadata as any)?.token || '';
};

export const api = ky.create({
  prefixUrl: process.env.BACKEND_API_URL || "http://localhost:5000/api", // 根据实际情况配置
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // const token = getAuthToken();
        // if (token) {
        //   request.headers.set("Authorization", `Bearer ${token}`);
        // }
      },
    ],
  },
});
