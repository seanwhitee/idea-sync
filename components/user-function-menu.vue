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
      class="btn m-1 flex gap-3 items-center justify-start bg-black text-white hover:bg-gray-800 border-none"
    >
      <div class="p-1 bg-black rounded-full border border-white">
        <NuxtImg
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-4"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="flex text-md font-bold w-[131px] overflow-auto">
          {{ authStore.userInfo.nickName }}
        </span>
        <span class="flex text-xs font-light w-[131px] overflow-auto">
          {{ authStore.userInfo.email }}
          
        </span>
      </div>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[2] menu p-2 shadow rounded-lg w-52 left-1 bg-gray-800"
    >
      <li @click="logout" class="hover:bg-gray-800/50 rounded-lg">
        <p>登出</p>
      </li>
    </ul>
  </div>
</template>
