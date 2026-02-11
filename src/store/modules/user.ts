// 关于用户信息的小仓库
import { defineStore } from "pinia";
// 引入登录的接口
import { reqLogin, reqUserInfo } from "@/api/user/index";
import { ref, computed } from "vue";
import type { UserInfo } from "@/api/user/type";

export const useUserStore = defineStore("user", () => {
  // 1. 响应式状态（组件直接用）
  const token = ref("");
  const userInfo = ref<UserInfo>({}); // 存昵称、头像、权限等
  const avatar = computed(() => userInfo.value.avatar || ""); // 头像
  const name = computed(() => userInfo.value.name || ""); // 昵称

  // 2. 存数据（登录成功后调用）
  const setUser = (newToken: string, newUser: UserInfo) => {
    token.value = newToken;
    userInfo.value = newUser;
    // 同步存本地，持久化
    localStorage.setItem("token", newToken);
    localStorage.setItem("userInfo", JSON.stringify(newUser));
  };

  // 3. 清数据（退出登录用）
  const clearUser = () => {
    token.value = "";
    userInfo.value = {};
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  };

  // 4. 初始化（页面刷新时，从本地取数据塞pinia）
  const initUser = () => {
    token.value = localStorage.getItem("token") || "";
    userInfo.value = JSON.parse(localStorage.getItem("userInfo") || "{}") || {};
  };

  //5. 登录接口
  const userLogin = async (data: any) => {
    const result = await reqLogin(data);
    console.log("store 的 user登录接口返回结果:", result);
    if (result.code === 200) {
      console.log(result);
      // 直接修改 token ref
      token.value = result.data || "";
      // 本地存储持久化
      localStorage.setItem("token", result.data || "");
      console.log("登录成功后:", result || "");
      return "ok";
    } else {
      return Promise.reject(new Error(result.data || "登录失败"));
    }
  };
  // 6. 获取用户信息接口
  const getUserInfo = async () => {
    const result = await reqUserInfo();
    console.log("store 的 user获取用户信息接口返回结果:", result);
    if (result.code === 200) {
      // 直接修改 userInfo ref
      userInfo.value = result.data || {};

      // 本地存储持久化
      localStorage.setItem("userInfo", JSON.stringify(result.data || {}));
      return "ok";
    } else {
      return Promise.reject(new Error(result.message || "获取用户信息失败"));
    }
  };

  return {
    token,
    userInfo,
    avatar,
    name,
    setUser,
    clearUser,
    initUser,
    userLogin,
    getUserInfo,
  };
});
