<script setup></script>
<template>
  <div
    class="bg-black box-border w-full border-b border-gray-500/50 flex items-center justify-between px-4 py-2 fixed z-[1]"
  >
    <div class="flex items-center font-bold my-2 ps-10">
      <NuxtLink
        to="/projects"
        external
        class="text-white flex items-center justify-center"
        ><img src="/public/favicon.png" class="me-3 w-8 rounded-lg" />Idea<span
          class="text-violet-500"
          >Sync</span
        >
      </NuxtLink>
    </div>
  </div>
</template>
