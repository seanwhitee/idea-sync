<script setup>
import LoginForm from "~/components/LoginForm.vue";
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
const router = useRouter();
if (authStore.isLogin && authStore.userInfo.roleVerified) {
  if (authStore.userInfo.roleName === "admin") {
    router.push("/Admin/admin-dashboard");
  } else {
    router.push("/Platform/projects");
  }
}
definePageMeta({
  colorMode: "dark",
});
</script>
<template>
  <GradientFog />
  <div class="py-20 md:py-32 lg:py-32 text-black dark:text-white">
    <div
      class="flex flex-col items-start mx-auto px-10 w-10/12 md:w-1/2 lg:w-1/2 max-w-lg bg-white dark:bg-zinc-950 rounded-2xl py-5 md:py-20 lg:py-10"
    >
      <img
        src="/public/favicon.png"
        alt="favicon"
        class="translate-x-4 w-20 rounded-3xl mb-6 shadow-xl"
      />
      <div
        class="flex items-center w-full justify-start font-semibold text-lg md:text-2xl lg:text-2xl px-4 mb-8"
      >
        <h1>登入</h1>
        <NuxtLink to="/" external
          >Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
        </NuxtLink>
      </div>
      <div class="w-full p-4">
        <LoginForm />
      </div>
      <div
        class="w-full flex justify-start pe-2 mt-4 text-whit font-extralight text-xs"
      >
        <div class="flex items-center justify-center gap-4 w-full">
          <NuxtLink to="/signup" class="hover:underline">註冊</NuxtLink
          ><span>|</span
          ><NuxtLink to="/forgot-password" class="hover:underline"
            >忘記密碼</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
