import { useAuthStore } from "~/store/auth";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const login = (user) => {
    authStore.isLogin = true;
    authStore.userInfo = user;
    router.go();
  };

  return { login };
};
