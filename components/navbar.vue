<script setup></script>
<template>
  <div class="bg-black box-border w-full border-b border-gray-500/50 flex items-center justify-between px-4 py-2">

    <div class="flex items-center font-bold my-2">
      <NuxtLink to="/" external class="text-white flex items-center justify-center"><img src="/public/favicon.png" class="me-3 w-8 rounded-lg" />Idea<span class="text-violet-500" style="z-index: 1">Sync</span>
      </NuxtLink>
    </div>
    <div class="flex items-center">
      <NuxtLink to="/signin" class=" flex items-center justify-center text-white py-2 px-4 cursor-pointer">登入</NuxtLink>
      <NuxtLink to="/signup"><button
          class="flex bg-gradient-to-tr from-indigo-500 via-purple-500 to-black/50 text-white/90 items-center rounded-s-lg rounded-e-lg px-3 ring-1 py-2 text-xs font-bold cursor-pointer">
          立即註冊
        </button></NuxtLink>
    </div>
  </div>

</template>


<style scoped></style>
