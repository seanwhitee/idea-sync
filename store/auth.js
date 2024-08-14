import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const isLogin = ref(false);
    const userInfo = ref({});

    const roleName = computed(() => {
      switch (userInfo.value.roleName) {
        case "creator":
          return "提案/申請人";
        case "mentor":
          return "指導者";
        case "admin":
          return "系統管理者";
      }
    });
    return { isLogin, userInfo, roleName };
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ["isLogin", "userInfo"],
    },
  }
);
