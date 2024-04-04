<script setup></script>
<template>
  <div class="bg-black box-border w-full border-b border-gray-500/50 flex items-center justify-between px-4 py-2">
    
    <div class="flex items-center font-bold my-2">
      <NuxtLink to="/hello" external class="text-white">Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
      </NuxtLink>
    </div>
    <div class="flex items-center">
      <NuxtLink to="/login" class=" flex items-center justify-center text-white py-2 px-4 cursor-pointer">登入</NuxtLink>
      <NuxtLink to="/signup"><button
          class="flex items-center rounded-md bg-gray-50 px-2 py-2 text-xs font-bold text-violet-900 ring-1 ring-inset ring-gray-500/10 cursor-pointer">
          立即註冊
        </button></NuxtLink>
    </div>
  </div>

</template>

<style scoped></style>
