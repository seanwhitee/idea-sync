import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isLogin = ref(false);
    const userInfo = ref({});

    return { isLogin, userInfo };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["isLogin", "userInfo"],
    },
  }
);
