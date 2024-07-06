import { defineStore } from "pinia";
import { useProjectPoolStore } from "./projectPool";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const projectPoolStore = useProjectPoolStore();


    const isLogin = ref(false);
    const userInfo = ref({});
    const login = (user) => {
      isLogin.value = true;
      userInfo.value = user;
    };
    const logout = () => {
      isLogin.value = false;
      userInfo.value = {};
    };
    return { isLogin, userInfo, login, logout };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["isLogin", "userInfo"],
    },
  }
);
