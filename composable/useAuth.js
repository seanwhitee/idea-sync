import { useAuthStore } from "~/store/auth";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const login = (user) => {
    authStore.isLogin = true;
    authStore.userInfo = user.userResponse;
    authStore.token.accessToken = user.token.accessToken;
    router.push("/");
  };

  return { login };
};
