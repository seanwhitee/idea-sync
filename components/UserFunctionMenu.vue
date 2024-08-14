<script setup>
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
</script>
<template>
  <div class="flex flex-col w-full">
    <UBadge
      class="w-fit hidden md:hidden lg:flex"
      color="primary"
      variant="subtle"
      size="xs"
      >{{ authStore.roleName }}</UBadge
    >
    <button
      tabindex="0"
      role="button"
      class="my-1 flex gap-2 items-center md:justify-start justify-center bg-black 
      text-white hover:bg-zinc-800 w-full rounded-lg py-3 lg:py-2 px-4 md:px-4 lg:ps-4"
    >
      <div class="bg-black rounded-full">
        <NuxtImg
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-8 h-8 rounded-full"
        />
      </div>
      <div class="hidden md:hidden lg:flex flex-col items-start justify-center">
        <span class="flex text-sm font-bold w-[131px] overflow-hidden">
          {{ authStore.userInfo.nickName }}
        </span>
        <span class="flex text-[10px] font-light w-[131px] overflow-hidden">
          {{ authStore.userInfo.email }}
        </span>
      </div>
    </button>
  </div>
</template>
