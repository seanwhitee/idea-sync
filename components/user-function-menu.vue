<script setup>
import { useAuthStore } from "~/store/auth";
const router = useRouter();
const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<template>
  <div class="dropdown dropdown-top w-full">
    <div
      tabindex="0"
      role="button"
      class="btn my-1 flex gap-3 items-center justify-start bg-black text-white hover:bg-zinc-800 border-none"
    >
      <div class="p-1 bg-black rounded-full border border-white">
        <NuxtImg
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-4"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="flex text-md font-bold w-[131px] overflow-hidden">
          {{ authStore.userInfo.nickName }}
        </span>
        <span class="flex text-xs font-light w-[131px] overflow-hidden">
          {{ authStore.userInfo.email + authStore.userInfo.email }}
          
          
        </span>
      </div>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content absolute z-[2] menu px-2 py-3 shadow rounded-lg w-full bg-zinc-800"
    >
      <li @click="" class="hover:bg-zinc-800/50 rounded-lg">
        <p class="py-4">切換帳號</p>
      </li>
      <li @click="logout" class="hover:bg-zinc-800/50 rounded-lg">
        <p class="py-4">登出</p>
      </li>
    </ul>
  </div>
</template>
