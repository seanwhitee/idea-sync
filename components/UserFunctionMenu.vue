<script setup>
import { useAuthStore } from "~/store/auth";
const authStore = useAuthStore();
</script>
<template>
  <div class="flex flex-col w-full">
    <UBadge
      class="hidden w-fit md:hidden lg:flex"
      color="primary"
      variant="subtle"
      size="xs"
      >{{ authStore.roleName }}</UBadge
    >
    <button
      tabindex="0"
      role="button"
      class="flex items-center justify-center w-full gap-2 py-3 my-1 text-white bg-black rounded-lg lg:justify-start lg:py-2 lg:ps-4"
    >
      <div class="bg-black rounded-full">
        <NuxtImg
          :src="authStore.userInfo.avatarUrl"
          alt="user-avatar"
          class="w-0 rounded-full md:w-10 md:h-10 lg:w-8 lg:h-8"
        />
      </div>
      <div class="flex-col items-start justify-center hidden md:hidden lg:flex">
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
