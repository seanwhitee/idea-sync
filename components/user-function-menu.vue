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
          class="w-3"
        />
      </div>
      <span class="text-md font-light">{{
        authStore.userInfo.nickName
      }}</span>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[2] menu p-2 shadow rounded-lg w-52 left-1 bg-gray-800"
    >
      <li @click="logout" class="hover:bg-gray-800/50 rounded-lg"><p>Logout</p></li>
    </ul>
  </div>
</template>
