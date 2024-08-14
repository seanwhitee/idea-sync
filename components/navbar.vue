<script setup></script>
<template>
  <div
    class="hidden md:flex relative animate-slidein z-10 w-full justify-center"
  >
    <div
      class="box-border w-10/12 top-3 shadow-lg border border-zinc-500/50 rounded-full flex items-center justify-between px-6 py-1 fixed"
    >
      <div class="flex items-center font-bold my-2">
        <NuxtLink to="/" external class="flex items-center justify-center"
          ><img
            src="/public/favicon.png"
            class="me-3 w-8 rounded-lg"
          />Idea<span class="text-violet-500">Sync</span>
        </NuxtLink>
      </div>
      <div class="flex items-center">
        <NuxtLink
          to="/signin"
          class="flex items-center justify-center py-2 px-4 cursor-pointer"
          >登入</NuxtLink
        >
        <NuxtLink to="/signup"
          ><button
            class="flex bg-gradient-to-tr from-indigo-500 via-purple-500 to-purple-600 text-white/90 items-center rounded-full px-4 ring-1 py-2 text-xs font-bold cursor-pointer"
          >
            立即註冊
          </button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<style scoped></style>
