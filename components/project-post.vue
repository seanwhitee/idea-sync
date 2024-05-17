<script setup>
import { ref } from "vue";
const hoverEffect = ref(false);
</script>
<template>
  <div
    class="flex items-center justify-between h-40 px-4 py-4 w-full bg-zinc-900 cursor-pointer"
    @mouseover="hoverEffect = true"
    @mouseleave="hoverEffect = false"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col">
        <p class="text-white text-2xl font-bold hover:bg-violet-500 ease-linear duration-200 cursor-pointer w-fit"
        :class="hoverEffect ? 'border-b-4 border-violet-500 ease-linear duration-200' : 'border-0 ease-linear duration-300'"
        >
          專題題目
        </p>
        <p class="text-white text-sm mt-1"
        >
          專題的部分描述,大約抓20 ~ 50字顯示
        </p>
      </div>
      <div class="flex">
        <p
          class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2"
        >
          畢業專題
        </p>
        <p
          class="text-black text-xs bg-white rounded-2xl px-2 py-1 font-bold mr-2"
        >
          畢業專題資工系
        </p>
      </div>
    </div>

    <div
      class="h-28 w-28"
      style="background-color: rgba(217, 217, 217, 0.2)"
    ></div>
  </div>
</template>
