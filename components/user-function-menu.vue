<script setup>
import { useAuthStore } from "~/store/auth";
const router = useRouter();
const authStore = useAuthStore();
const isAccountSwitchModalOpen = ref(false);
const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<template>
  <div>
    <UModal v-model="isAccountSwitchModalOpen">
      <div class="p-10">
        <h3 class="font-bold text-2xl mb-2">切換帳號</h3>
        <p class="text-zinc-500 text-sm mb-6">輸入您的帳號密碼以切換帳號</p>
        <LoginForm />
      </div>
    </UModal>
  </div>
  <div class="dropdown dropdown-top w-full">
    <button
      tabindex="0"
      role="button"
      class="my-1 flex gap-2 items-center justify-start bg-black text-white hover:bg-zinc-800 w-full rounded-lg py-1 px-1"
    >
      <div class="bg-black rounded-full">
        <NuxtImg
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-8 rounded-full"
        />
      </div>
      <div class="flex flex-col items-start justify-center">
        <span class="flex text-sm font-bold w-[131px] overflow-hidden">
          {{ authStore.userInfo.nickName }}
        </span>
        <span class="flex text-[10px] font-light w-[131px] overflow-hidden">
          {{ authStore.userInfo.email }}
        </span>
      </div>
    </button>
    <ul
      tabindex="0"
      class="dropdown-content absolute z-[2] menu px-2 py-3 shadow rounded-lg w-full bg-zinc-800"
    >
      <li
        @click="isAccountSwitchModalOpen = true"
        class="hover:bg-zinc-800/50 rounded-lg"
      >
        <p class="py-4">切換帳號</p>
      </li>
      <li @click="logout" class="hover:bg-zinc-800/50 rounded-lg">
        <p class="py-4">登出</p>
      </li>
    </ul>
  </div>
</template>
